# 通用相机自动标定系统

面向不同车型相机安装位置和接口差异，建设从图像采集、位姿求解、精度评估到结果应用的自动标定闭环，支持 EasyGo、JN 等车型交付。

## 主要工作

- 设计统一的两阶段标定方案，建立车体二维码、参考二维码、相机 Link 和底盘坐标之间的几何关系。
- 完成采集姿态、观测约束、求解流程和平移/旋转/闭环误差评估。
- 建设前端、后端、算法 Worker、任务管理、报告生成和 RK3588 标定盒子运行环境。

## 标定素材

![标定采集界面](../assets/projects/calibration/2026-08-06_09-42.png)

![标定结果界面](../assets/projects/calibration/2026-08-06_09-42_1.png)

![标定参数界面](../assets/projects/calibration/2026-08-06_09-44.png)

![标定流程记录](../assets/projects/calibration/image.png)

![二维码采集记录](../assets/projects/calibration/img_v3_0214a_39ef7fe2-470f-44b9-aa03-dd34d8985bdg.jpg)

![标定现场记录](../assets/projects/calibration/img_v3_0214i_289aa9d7-0356-4719-b622-31d2f26e1c5g.jpg)

![标定结果示例](../assets/projects/calibration/img_v3_02153_06e35e72-5da1-42aa-85c0-104933a2840g.jpg)

![标定设备界面](../assets/projects/calibration/img_v3_0215h_78031dfd-dc9f-421e-b30d-21c5f4f3214g.png)

![标定现场图片](../assets/projects/calibration/img_v3_0215h_85cc7041-dcd1-4bd9-86c3-70cf7b7d1d4g.jpg)
