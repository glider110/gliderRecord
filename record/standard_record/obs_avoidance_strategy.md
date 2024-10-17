### 避障策略模块代码解读

前置概念理解：





**算法思路:** 

**navigation_module避障(核心)**

```c++
subscribeTopic("OBSTACLES", CALLBACK(&NavigationModule::onObaPoints));  //避障有效点
subscribeTopic("OBSTACLE_AVOID_MODEL", CALLBACK(&NavigationModule::onAvoidModelMsg));   //模型
subscribeTopic("TIMER_50MS", CALLBACK(&NavigationModule::avoidObaLoop));   //避障逻辑
resetAvoidObaPara();  //读取停止/减速距离/offset  传入子类      内部嵌套updatePara()
avoidoba_processor->updatePara();
 updateAvdPara(avoidoba_processor, carbody_size, curr_syn_rotate_state);  //支持在线修改offset    内部嵌套processor->updateOffsetPara(slow_width_offset, 
avoidoba_processor->updateCheckPoint(g_state.checkpoint_no);  // 为了配合调度系统开发基于checkpoint的避障系统
avdoba_value = avoidoba_processor->getAvdObaValue(cur_path_idx, curr_car_pose,carbody_size, avdoba_pose_info);  //避障碰撞检测
 auto info = avoidoba_processor->outputObstacleInfo(Eigen::Vector3d(curr_pose.x(), curr_pose.y(), curr_pose.yaw()), carbody_size,avdoba_pose_info); //发出状态?
```





#### 1.避障粒子点生成

1. navigation下发的路径给到四类的粒子sampler里面构造粒子点

   ```c++
   typedef std::vector<NavigationPath<double>> NavigationPath_vector;
   template <typename T>
   class NavigationPath {
       enum PathType {
       PATH_LINE = 0x01,
       PATH_ARC = 0x02,
       PATH_BEZIER = 0x03,
       PATH_ROTATE = 0x04,
   };
       PathType type_;   
       T sx_, sy_;  // 起点
       T ex_, ey_;  // 终点
       T cx_, cy_;  // 圆心/控制点1
       T dx_, dy_;  // 控制点2
       double radius_;  // 圆弧路径中的半径大小/曲率半径大小
       int direction_;  // 运动方向
       int id_;  //路径编号
       double rotate_angle_;
       // 插入旋转时直接用facing很方便
       double s_facing_;  // 起点朝向
       double e_facing_;  // 终点朝向
       double limit_v_;  // 限制线速度
       double limit_w_;  // 限制角速度
       double limit_rotate_angle_;  // 旋转精度阈值
       double omni_aim_angle_;  //全向车型，开启全向模式目标角度，负数关闭，0~2pi有效
       ObstacleAvoidPolicy avoid_policy_ = OBSTACLE_AVOID_WAIT;  // 避障策略
   }
   ```

根据导航路径下发的类型和路径的第一和最后一个点来按step抽样为粒子点

```c++
struct ParticleInfo {
    ParticleInfo() {}
    ParticleInfo(const Eigen::Vector3d& curr_pose, ParticleMoveState& state)
        : pose(curr_pose), move_state(state) {}
    Eigen::Vector3d pose;          // 每个采样粒子的中心位姿
    ParticleMoveState move_state;  // 采样粒子状态
    double start_angle;            // 主要服务于旋转粒子
    double end_angle;              // 主要服务于旋转粒子
};
```



#### 2.避障模型生成

备注: 1.叉车避障模型发出去是包含了车体和叉臂的

```c++

```





#### 3.障碍点管理(ObstaclePointsManager)

定义新的数据类型来接收点云模块下发的数据

```c++
struct ObstaclePoints {
    enum ObaState {
        STATE_OBA_STOP_0 = 0,
        STATE_OBA_STOP_1,
        STATE_OBA_STOP_2,
        STATE_OBA_STOP_3,
        STATE_OBA_STOP_4,
        STATE_OBA_SLOW,
        STATE_OBA_FREE,
    };
    std::string obstacle_name;
    int64_t time;
    std::vector<Eigen::Vector3d> points;
    slam::tf::Transform3D sensor_tf;
    bool is_region_oba = false;
    ObaState oba_state;
};

```



#### 4.粒子点碰撞(CollideRegionManager)















#### 5.避障策略下发逻辑

```c++
//下发的:
sendObs(avdoba_pose_info.result_info);     // 逻辑信息
auto info = avoidoba_processor->outputObstacleInfo(Eigen::Vector3d(curr_pose.x(), curr_pose.y(), curr_pose.yaw()), carbody_size,avdoba_pose_info);     //log信息
// 结构体:
class ObstacleMsg : public BaseMsg {
 public:
    enum ObaState {
        STATE_OBA_STOP_0 = 0,
        STATE_OBA_STOP_1,
        STATE_OBA_STOP_2,
        STATE_OBA_STOP_3,
        STATE_OBA_STOP_4,
        STATE_OBA_SLOW,
        STATE_OBA_FREE,
    };

    explicit ObstacleMsg(topic_t topic)
        : BaseMsg(topic, TYPE_OBSTACLE_DATA, false) {  // 禁止将is_real_time = true!!!!!
        oba_state = STATE_OBA_FREE;
        is_region_oba = false;
    };
    ~ObstacleMsg() override = default;

    std::string oba_name;
    Location_Vector point_cloud;
    ObaFeature oba_feature;
    ObaState oba_state;
    bool is_region_oba = false;
    Pose car_pose;
    slam::tf::Transform3D sensor_to_base;
};
```





参数解析:

- 减速距离有一个速度自适应的offset ` updateStopDistByVel(current_vel_, stop_dist_offset,slow_dist_offset)`
- 增量只有前后只有停止增量
- 后退减速距离不会读取参数表 `nav.backward_slow_distance`
- 避障框数据流:
  1. 导航模块避障区域生成发出
  2.  network模块订阅"TOPIC_COMMON_POSES_INFO" 通过proto格式发送到客户端(SessionManager)





==**疑问点:**==

- [ ] 前端避障区域生成的变化是从哪里发出的?
- [ ] 策略下发的消息怎么给到控制的?
- [ ] 货架的模型和车体和货架的外接



==**备注:**==

- [ ] 注意排查日志时 雷达的相机坐标系和机器坐标系xy来排查问题比较难 以为有角度旋转,后续需要优化不要yaw参与变换;
- [ ] 路径下发有规划和调度
- [ ] oba_avoid模块发出的是导航的小状态,由main模块订阅,结合大状态来下发运动控制
- [ ] 同步旋转时候是家加了前侧offset的
- [ ] 避障1.0的避障模型显示matrix画出来显示不对





|          | 模型      | 前后offset | 左右offset |      |
| -------- | --------- | ---------- | ---------- | ---- |
| 前后     | 车体/货架 | ×          | √          |      |
| 旋转     | 车体/货架 | √          | √          |      |
| 同步旋转 | 强制车体  | √          | √          |      |

