# 算力平台

> 嵌入式/边缘计算平台汇总，涵盖 Rockchip、NVIDIA、地瓜机器人等主流方案。

---

## 1. Rockchip（瑞芯微）

### 1.1 RK3399

| 项目 | 参数 |
| --- | --- |
| **CPU** | 双核 Cortex-A72 (最高 1.8GHz) + 四核 Cortex-A53 (最高 1.4GHz) |
| **GPU** | Mali-T864 |
| **NPU** | 无（无内置 NPU） |
| **内存** | 支持 DDR3 / LPDDR3 / LPDDR4，最大 4GB |
| **接口** | USB 3.0、HDMI 2.0、MIPI-CSI/DSI、PCIe 2.1、GbE |
| **AI 推理** | 需外挂加速棒（如 USB NPU），无原生 AI 加速 |
| **典型应用** | 教育开发板、轻量级边缘网关、多媒体终端 |
| **代表产品** | Firefly-RK3399、NanoPC-T4、Orange Pi RK3399 |

**备注：** RK3399 是较早期的高性能 SoC，适合通用计算场景，但 AI 推理能力有限。

---

### 1.2 RK3576

| 项目 | 参数 |
| --- | --- |
| **CPU** | 四核 Cortex-A72 (最高 2.2GHz) + 四核 Cortex-A53 (最高 1.8GHz) |
| **GPU** | Mali-G52 MC3 |
| **NPU** | 6 TOPS（INT8） |
| **内存** | 支持 LPDDR4/LPDDR4X/LPDDR5，最大 16GB |
| **接口** | USB 3.0、HDMI、MIPI-CSI/DSI、PCIe 2.1、GbE、CAN |
| **AI 推理** | RKNN 推理框架，支持 TensorFlow / PyTorch / ONNX 模型转换 |
| **典型应用** | 中端机器人、智能摄像头、边缘 AI 终端 |
| **代表产品** | Firefly ROC-RK3576-PC、ArmSoM Sige5 |

**备注：** RK3576 定位中端，6 TOPS NPU 可满足轻量级视觉检测、分类任务。

---

### 1.3 RK3588

| 项目 | 参数 |
| --- | --- |
| **CPU** | 四核 Cortex-A76 (最高 2.4GHz) + 四核 Cortex-A55 (最高 1.8GHz) |
| **GPU** | Mali-G610 MC4 |
| **NPU** | 6 TOPS（INT8），支持 INT4 / INT8 / INT16 / FP16 |
| **内存** | 支持 LPDDR4X / LPDDR5，最大 32GB |
| **视频** | 8K@60fps H.265 解码，8K@30fps H.265 编码 |
| **接口** | 双 GbE、USB 3.1、HDMI 2.1、PCIe 3.0 x4、MIPI-CSI（最多 6 路摄像头） |
| **AI 推理** | RKNN 2.0 推理框架，支持多模型并行 |
| **典型应用** | 高端机器人、自动驾驶开发、多路视频分析、边缘服务器 |
| **代表产品** | Firefly ITX-3588J、Orange Pi 5 Plus、Rock 5B |

**备注：** RK3588 是 Rockchip 当前旗舰 SoC，综合性能强劲，支持多路摄像头输入，适合复杂感知场景。

---

### 1.4 RV1126

| 项目 | 参数 |
| --- | --- |
| **CPU** | 四核 Cortex-A7 (最高 1.5GHz) |
| **GPU** | 无独立 GPU |
| **NPU** | 2.0 TOPS（INT8） |
| **ISP** | 内置高性能 ISP，支持 14M 像素 |
| **内存** | 支持 DDR3 / DDR4 / LPDDR3 / LPDDR4，最大 2GB |
| **视频** | 4K H.265/H.264 编解码 |
| **接口** | USB 2.0、MIPI-CSI、Ethernet、SPI、I2C、UART |
| **AI 推理** | RKNN 推理框架，低功耗 AI 处理 |
| **典型应用** | IPC 摄像头、人脸识别门禁、低功耗 AI 终端 |
| **代表产品** | Luckfox Pico 系列、Firefly Core-RV1126-JD4 |

**备注：** RV1126 主打低功耗智能视觉，内置 ISP + NPU 的组合非常适合摄像头类产品。

---

## 2. NVIDIA

### 2.1 Jetson Orin 系列

| 型号 | CPU | GPU (CUDA 核心) | AI 算力 | 内存 | 功耗 | 典型应用 |
| --- | --- | --- | --- | --- | --- | --- |
| **Orin Nano** | 6 核 Arm Cortex-A78AE | 512 CUDA + 16 Tensor | 40 TOPS | 4/8 GB LPDDR5 | 7-15W | 入门级机器人、轻量 AI |
| **Orin NX** | 8 核 Arm Cortex-A78AE | 1024 CUDA + 32 Tensor | 100 TOPS | 8/16 GB LPDDR5 | 10-25W | 中端机器人、自主导航 |
| **AGX Orin** | 12 核 Arm Cortex-A78AE | 2048 CUDA + 64 Tensor | 275 TOPS | 32/64 GB LPDDR5 | 15-60W | 自动驾驶、工业 AGV |

**开发生态：**
- **JetPack SDK**：包含 CUDA、cuDNN、TensorRT、VPI 等
- **Isaac ROS**：NVIDIA 官方机器人 ROS2 加速包
- **DeepStream**：多路视频流 AI 分析框架
- **Isaac Sim**：仿真环境，支持数字孪生

**备注：** Jetson Orin 系列是目前嵌入式 AI 最强平台，CUDA + Tensor Core 生态成熟，适合需要高算力的机器人和自动驾驶应用。

---

## 3. 地瓜机器人（D-Robotics / 原地平线）

### 3.1 旭日 X5（Sunrise 5）

| 项目 | 参数 |
| --- | --- |
| **CPU** | 八核 Cortex-A55 (最高 1.8GHz) |
| **BPU** | 双核 BPU（Bayesian Processing Unit），10 TOPS（INT8） |
| **内存** | 支持 LPDDR4/LPDDR4X，最大 4GB |
| **视频** | H.265/H.264 编解码 |
| **接口** | MIPI-CSI、USB、Ethernet、SPI、I2C |
| **AI 推理** | 地平线天工开物（OpenExplorer）工具链 |
| **典型应用** | 扫地机器人、低速自动驾驶、智能摄像头 |
| **代表产品** | 地瓜 RDK X5 |

### 3.2 旭日 X3（Sunrise 3）

| 项目 | 参数 |
| --- | --- |
| **CPU** | 四核 Cortex-A53 (最高 1.2GHz) |
| **BPU** | 双核 BPU，5 TOPS（INT8） |
| **内存** | 支持 LPDDR4，最大 2GB |
| **典型应用** | 入门级机器人开发、AI 教育 |
| **代表产品** | 地瓜 RDK X3、RDK X3 Module |

**开发生态：**
- **OpenExplorer（天工开物）**：模型量化、编译、部署一体化工具链
- **TogetheROS**：基于 ROS2 的机器人中间件，集成 BPU 加速节点
- **D-Robotics Model Zoo**：预训练模型库，支持 YOLO、ResNet、MobileNet 等

**备注：** 地瓜（原地平线）的 BPU 架构针对视觉感知任务优化，在同等功耗下效率较高，生态围绕 ROS2 构建，对机器人开发友好。

---

## 4. 平台对比总结

| 平台 | AI 算力 (TOPS) | 功耗 | 生态成熟度 | 价格区间 | 推荐场景 |
| --- | --- | --- | --- | --- | --- |
| RK3399 | 无原生 NPU | 低 | ★★★ | ￥200-400 | 通用计算、多媒体 |
| RV1126 | 2 | 极低 | ★★★ | ￥100-200 | IPC、人脸识别 |
| RK3576 | 6 | 低 | ★★☆ | ￥300-500 | 中端 AI 终端 |
| RK3588 | 6 | 中 | ★★★★ | ￥500-1200 | 多路视觉、机器人 |
| 地瓜 X3 | 5 | 低 | ★★★ | ￥200-400 | 入门机器人 |
| 地瓜 X5 | 10 | 低 | ★★★☆ | ￥400-800 | 扫地机、低速自驾 |
| Orin Nano | 40 | 7-15W | ★★★★★ | ￥1500-2500 | 机器人、边缘 AI |
| Orin NX | 100 | 10-25W | ★★★★★ | ￥3000-5000 | 自主导航、工业 |
| AGX Orin | 275 | 15-60W | ★★★★★ | ￥8000-15000 | 自动驾驶、工业 AGV |

---

## 5. 选型建议

- **低成本 + 低功耗视觉**：RV1126（摄像头方案）、地瓜 X3（入门机器人）
- **中端机器人感知**：RK3588（多路摄像头）、地瓜 X5（BPU 高效推理）
- **高算力 + 成熟生态**：Jetson Orin 系列（CUDA 生态、Isaac ROS）
- **通用计算 / 非 AI 场景**：RK3399（成熟稳定、资料丰富）

---

## 6. 参考链接

- [Rockchip 官网](https://www.rock-chips.com/)
- [RKNN-Toolkit2 GitHub](https://github.com/rockchip-linux/rknn-toolkit2)
- [NVIDIA Jetson 官网](https://developer.nvidia.com/embedded-computing)
- [JetPack SDK](https://developer.nvidia.com/embedded/jetpack)
- [地瓜机器人开发者中心](https://developer.d-robotics.cc/)
- [TogetheROS](https://developer.d-robotics.cc/togetheros)
