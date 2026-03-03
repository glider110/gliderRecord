# 多相机语义地图构建系统
**AMR 机器人感知架构设计文档**

---

## 1. 系统概述

本系统基于 AMR 机器人上布局的多个相机，构建实时语义地图。系统设计目标是：感知模块与定位建图模块解耦，定位团队提供机器人位姿，感知模块专注识别语义物体并将其绑定到地图坐标系中。

### 1.1 传感器布局

| 位置 | 类型 | 检测来源 | 深度来源 |
|------|------|----------|----------|
| 上方 | RGB-D 深度相机 | 自身 RGB 图像 | 自身深度图（直接反投影） |
| 中间 | 纯 RGB 相机 | 自身 RGB 图像 | 借用上下合并点云 |
| 下方 | RGB-D 深度相机 | 自身 RGB 图像 | 自身深度图（直接反投影） |

### 1.2 核心设计原则

- 所有相机（含 RGB-D 的 RGB 通道）均参与目标检测，各自独立运行检测流水线
- **所有相机的检测结果统一输出 `base_link` 坐标系下的 `Detection3D`**，下游融合节点不感知相机类型差异
- RGB-D 相机用自身深度图直接反投影得到 3D 位置；纯 RGB 相机从合并点云中借深度
- 深度相机和 RGB 相机数量、位置均可通过配置文件灵活增删，无需修改核心代码
- 物体语义最终通过 TF 变换绑定到地图坐标系（`map` frame）

---

## 2. 整体数据流架构

```
┌───────────────────────────────────────────────────────────────────────┐
│                        传感器输入层（可灵活配置）                        │
│                                                                       │
│  camera_top (RGB-D) ── RGB→检测 ── 深度图→反投影 ── Detection3D(base) │
│                     └─ 深度点云 ─┐                                    │
│                                  ├→ 合并点云(base) ─┐                 │
│  camera_bot (RGB-D) ── RGB→检测 ── 深度图→反投影 ── Detection3D(base) │
│                     └─ 深度点云 ─┘                  │                 │
│                                                     │                 │
│  camera_mid (RGB)   ── RGB→检测 ── 借用合并点云 ────┘Detection3D(base)│
└──────────────────────────────────┬────────────────────────────────────┘
                                   │  所有相机统一输出 /detections_3d_base
                                   ▼
                    ┌──────────────────────────────┐
                    │     语义融合与地图绑定节点      │
                    │  3D NMS → 贝叶斯更新 → 存储   │
                    │  + 机器人位姿（定位团队 TF）   │
                    └──────────────┬───────────────┘
                                   ▼
                    ┌──────────────────────────────┐
                    │         语义地图输出           │
                    │  /semantic_objects (可订阅)   │
                    └──────────────────────────────┘
```

---

## 3. 核心模块详细设计

### 3.1 模块一：相机统一配置

所有相机在一个配置文件中声明，`type` 字段决定使用哪种深度获取策略，新增相机只需追加一条配置。

```yaml
# config/cameras.yaml
cameras:
  - name: camera_top
    type: rgbd                           # 有深度图，直接反投影
    rgb_topic:   /camera_top/color/image_raw
    depth_topic: /camera_top/depth/image_raw
    cloud_topic: /camera_top/depth/color/points
    frame_id:    camera_top_link
    intrinsics:  [fx, fy, cx, cy]
    model:       yolov8m

  - name: camera_mid
    type: rgb                            # 无深度，借用合并点云
    rgb_topic:   /camera_mid/rgb/image_raw
    frame_id:    camera_mid_link
    intrinsics:  [fx, fy, cx, cy]
    model:       yolov8m

  - name: camera_bot
    type: rgbd
    rgb_topic:   /camera_bot/color/image_raw
    depth_topic: /camera_bot/depth/image_raw
    cloud_topic: /camera_bot/depth/color/points
    frame_id:    camera_bot_link
    intrinsics:  [fx, fy, cx, cy]
    model:       yolov8m
```

---

### 3.2 模块二：点云聚合节点（PointCloud Aggregator）

将所有 RGB-D 相机的深度点云统一变换到 `base_link`，合并为全局点云池，供纯 RGB 相机借用深度。

```python
class PointCloudAggregator:
    def __init__(self, camera_configs):
        # 只订阅 type=rgbd 的相机点云
        for cam in camera_configs:
            if cam.type == 'rgbd':
                subscribe(cam.cloud_topic, callback=self.on_cloud)

    def on_cloud(self, msg, camera_name):
        T = tf_buffer.lookup_transform('base_link', msg.header.frame_id)
        cloud_base = transform_pointcloud(msg, T)
        self.cloud_pool[camera_name] = cloud_base

    def get_merged_cloud(self):
        return np.vstack(list(self.cloud_pool.values()))
```

---

### 3.3 模块三：检测节点（Semantic Detector）

每个相机运行独立检测节点，输出 2D 检测结果。所有相机共用相同的检测接口，差异仅在于后续的深度获取路径。

```python
class SemanticDetector:
    def __init__(self, cam_config):
        self.model = load_model(cam_config.model)
        self.cam_name = cam_config.name

    def detect(self, rgb_image) -> List[Detection2D]:
        results = self.model(rgb_image)
        return [Detection2D(bbox, class_name, confidence) for r in results]
```

---

### 3.4 模块四：3D 定位节点（3D Localizer）

**核心模块**。根据相机类型选择不同的深度策略，将 2D 检测结果转换为 `base_link` 下统一的 `Detection3D`，下游无需关心来源。

#### 统一输出数据结构

```yaml
Detection3D:
  class_name:    string
  confidence:    float
  source_camera: string          # 来源相机，融合时可用于置信度加权
  position_base: [x, y, z]      # base_link 下质心坐标
  bbox_3d:                       # base_link 下3D框（可选）
    center: [x, y, z]
    size:   [dx, dy, dz]
  timestamp: time
```

#### 策略一：RGB-D 相机（直接用自身深度图反投影）

```python
def rgbd_bbox_to_base(bbox_2d, depth_image, K, T_cam_to_base):
    x1, y1, x2, y2 = bbox_2d

    # 取 bbox 区域深度，过滤无效值
    roi_depth = depth_image[y1:y2, x1:x2]
    valid_z = roi_depth[(roi_depth > 0.1) & (roi_depth < 10.0)]

    if len(valid_z) < 10:
        return None

    # 中位数深度 + bbox 中心像素 → 相机坐标系 3D 点
    z = np.median(valid_z)
    u, v = (x1 + x2) / 2.0, (y1 + y2) / 2.0
    x_cam = (u - K[0,2]) * z / K[0,0]
    y_cam = (v - K[1,2]) * z / K[1,1]
    point_cam = np.array([x_cam, y_cam, z])

    # 变换到 base_link
    return transform_point(point_cam, T_cam_to_base)
```

#### 策略二：纯 RGB 相机（从合并点云借深度）

```python
def rgb_bbox_to_base(bbox_2d, merged_cloud_base, K, T_base_to_cam):
    # 将 base 点云投影回该相机图像平面
    pts_cam = transform_points(merged_cloud_base, T_base_to_cam)
    valid = pts_cam[:, 2] > 0.1
    pts_cam = pts_cam[valid]

    # 投影到图像坐标
    u = (K[0,0] * pts_cam[:,0] / pts_cam[:,2]) + K[0,2]
    v = (K[1,1] * pts_cam[:,1] / pts_cam[:,2]) + K[1,2]

    # 筛选落在 bbox 内的点
    x1, y1, x2, y2 = bbox_2d
    mask = (u>=x1) & (u<=x2) & (v>=y1) & (v<=y2)
    pts_in_bbox = merged_cloud_base[valid][mask]

    if len(pts_in_bbox) < 10:
        return None  # 降级处理见第6节

    return np.median(pts_in_bbox, axis=0)
```

#### 相机适配器（统一封装，工厂模式）

```python
class RGBDCameraAdapter:
    def get_detections_3d(self, rgb, depth, detections_2d) -> List[Detection3D]:
        results = []
        for det in detections_2d:
            pos = rgbd_bbox_to_base(det.bbox, depth, self.K, self.T_cam_to_base)
            if pos is not None:
                results.append(Detection3D(det.class_name, det.confidence,
                                           self.name, pos))
        return results

class RGBCameraAdapter:
    def get_detections_3d(self, rgb, detections_2d,
                          merged_cloud_base) -> List[Detection3D]:
        results = []
        for det in detections_2d:
            pos = rgb_bbox_to_base(det.bbox, merged_cloud_base,
                                   self.K, self.T_base_to_cam)
            if pos is not None:
                results.append(Detection3D(det.class_name, det.confidence,
                                           self.name, pos))
        return results

# 工厂函数：根据配置自动选择适配器
def create_adapter(cam_config):
    if cam_config.type == 'rgbd':
        return RGBDCameraAdapter(cam_config)
    elif cam_config.type == 'rgb':
        return RGBCameraAdapter(cam_config)
```

#### 鲁棒性处理

- 提取点云做统计离群点滤波（Statistical Outlier Removal）去除深度噪声
- 用中位数而非均值计算质心，防止离群点拉偏位置
- 点云数量 < 10 时标记为低可信度，不写入语义地图

```python
def compute_centroid(pts):
    if len(pts) < 10:
        return None
    pts_filtered = statistical_outlier_removal(pts, k=20, std_ratio=2.0)
    return np.median(pts_filtered, axis=0)
```

---

### 3.5 模块五：语义融合与地图绑定节点（Semantic Map Manager）

订阅所有相机统一发布的 `/detections_3d_base`，在 `base_link` 坐标系下做融合，再绑定到地图坐标系。

#### 3D 空间 NMS（去跨相机重复检测）

同一物体被多个相机同时看到时，在 `base_link` 下按距离阈值合并，无需任何图像级对应：

```python
def spatial_nms_3d(detections, dist_threshold=0.5):
    merged = []
    for det in detections:
        matched = find_nearby(merged, det['class'], det['position'], dist_threshold)
        if matched:
            # 置信度加权更新位置
            w1, w2 = matched['confidence'], det['confidence']
            matched['position'] = (matched['position']*w1 + det['position']*w2) / (w1+w2)
            matched['confidence'] = max(w1, w2)
            matched['observe_count'] += 1
        else:
            merged.append(det.copy())
    return merged
```

#### 贝叶斯类别更新（抗误检）

```
# 多帧观测累积，单帧误检不污染地图
P(class | 观测) ∝ P(观测 | class) × P_prior(class)

# 实例写入语义地图的条件：
#   1. 最高概率类别置信度 > 0.7
#   2. 被观测次数 > 3 帧
```

#### 地图绑定

```python
def bind_to_map(position_base, label, confidence, timestamp):
    # base_link → map（定位团队的 TF，用帧时间戳查询）
    T = tf_buffer.lookup_transform('map', 'base_link', timestamp)
    position_map = transform_point(position_base, T)

    semantic_map.upsert({
        'id':           generate_or_match_id(position_map, label),
        'class':        label,
        'position_map': position_map,
        'confidence':   confidence,
        'last_seen':    timestamp
    })
```

---

## 4. 时间同步策略

时间同步是整个系统最容易出问题的环节。车在运动时若各路数据时间戳不对齐，物体位置会出现漂移。

### 4.1 同步方案

```python
from message_filters import ApproximateTimeSynchronizer, Subscriber

# 根据配置动态创建订阅者（含所有相机的 RGB 和深度）
subs = []
for cam in cameras:
    subs.append(Subscriber(cam.rgb_topic, Image))
    if cam.type == 'rgbd':
        subs.append(Subscriber(cam.depth_topic, Image))

sync = ApproximateTimeSynchronizer(
    subs,
    queue_size=10,
    slop=0.05      # 50ms 容差，根据实际帧率调整
)
sync.registerCallback(on_synchronized_frame)
```

### 4.2 位姿查询

TF 查询必须使用检测帧的时间戳，而非 `rospy.Time(0)`（最新时刻）：

```python
# ✅ 正确：用帧时间戳查询位姿
T = tf_buffer.lookup_transform('map', 'base_link', frame_timestamp)

# ❌ 错误：用当前时刻查询，运动中产生偏差
T = tf_buffer.lookup_transform('map', 'base_link', rospy.Time(0))
```

---

## 5. 相机标定要求

所有相机的外参必须精确标定，外参误差直接导致点云投影偏差，影响语义物体 3D 定位精度。

| 标定项 | 工具 | 精度要求 |
|--------|------|----------|
| 相机内参 | ROS camera_calibration | 重投影误差 < 0.5 px |
| RGB-D 相机外参（相对 base_link） | kalibr | 平移误差 < 5mm |
| RGB 相机外参（相对 base_link） | kalibr | 平移误差 < 5mm |
| 多相机联合标定 | kalibr 多相机模式 | 推荐所有相机同时标定 |

标定结果写入 URDF 的 `<joint>` 定义，由 `robot_state_publisher` 自动维护完整 TF 树：

```
map → odom → base_link → camera_top_link
                       → camera_mid_link
                       → camera_bot_link
```

---

## 6. 中间 RGB 相机深度盲区降级方案

当上下点云无法覆盖中间相机的检测目标时（点云数量不足），启用降级策略：

| 优先级 | 方案 | 适用条件 | 计算成本 |
|--------|------|----------|----------|
| 1（优先） | 从上下 RGB-D 点云借深度 | 目标在上下相机覆盖范围内 | 低 |
| 2（降级） | Depth Anything V2 单目估深 | 上下相机点云稀疏 / 盲区 | 中 |
| 3（备用） | 仅输出 2D 语义标签（无3D位置） | 深度完全不可用 | 无 |

> 💡 建议先统计实际场景中中间相机视野内的点云覆盖率，若超过 80% 的情况都有足够点云覆盖，方案1即可满足需求，无需引入深度估计模型。

---

## 7. 语义地图输出接口

| 话题名 | 消息类型 | 说明 |
|--------|----------|------|
| `/detections_3d_base` | 自定义 Detection3DArray | 各相机检测结果统一在 base_link 下发布 |
| `/semantic_objects` | 自定义 SemanticObjectArray | 融合后的语义物体列表（map 坐标系） |
| `/semantic_map/markers` | visualization_msgs/MarkerArray | RViz2 可视化，含标签和边界框 |
| `/semantic_map/events` | 自定义 SemanticEvent | 新物体发现 / 消失 / 类别更新事件 |

### SemanticObject 消息结构

```yaml
SemanticObject:
  string   id                        # 唯一实例ID（UUID）
  string   class_name                # 语义类别
  float32  confidence                # 当前置信度
  geometry_msgs/Point    position    # map 坐标系下的位置
  geometry_msgs/Vector3  size        # 物体估计尺寸
  int32    observe_count             # 累计被观测次数
  string   source_camera             # 最后观测到的相机
  time     last_seen                 # 最后观测时间戳
```

---

## 8. 推荐技术栈

| 模块 | 推荐方案 | 备注 |
|------|----------|------|
| 2D 目标检测 | YOLOv8 | 速度快，支持多类别，边缘设备友好 |
| 点云处理 | PCL + Open3D | 统计滤波、下采样、变换 |
| 坐标变换 | ROS2 tf2 | 动态 TF 树管理 |
| 时间同步 | message_filters | ApproximateTimeSynchronizer |
| 单目深度（降级） | Depth Anything V2 Small | 轻量，Jetson Orin 可实时 |
| 可视化调试 | RViz2 MarkerArray | 支持实时查看语义标签 |
| 中间件 | ROS2 Humble | 推荐生产版本 |

---

## 9. 落地阶段规划

| 阶段 | 内容 | 里程碑 |
|------|------|--------|
| 第1周 | 完成三相机联合外参标定，验证 TF 树正确性 | RViz 中三路点云对齐无偏差 |
| 第2周 | 跑通上下 RGB-D → 点云聚合 → base_link 合并 | 合并点云发布正常 |
| 第3周 | 上下 RGB-D 的 RGB 检测接入，验证 Detection3D 输出 | 两路 rgbd 检测结果在 base 下位置正确 |
| 第4周 | 接入中间 RGB 相机，借点云完成 Detection3D | 所有相机统一输出到 `/detections_3d_base` |
| 第5周 | 接入地图绑定，3D NMS，贝叶斯更新 | 语义物体稳定出现在地图中 |
| 第6-7周 | 压测、调参、处理边缘情况（遮挡、动态物体） | 误检率 < 5%，漏检率 < 10% |

> ⚠️ 最大工程风险：时间同步问题会导致运动中语义位置漂移，建议第2周末专项验证静止和运动两种场景下的定位精度。