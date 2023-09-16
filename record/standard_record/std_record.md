### 项目工程理解

**环境配置&&编译记录：**

- [ ] ros    小鱼脚本一键安装

- [ ] pcl1.10 和eigen

- [ ] glog    配置环境变量不起效（bashrc、ldconfig）

- [ ] [opencv3.4./](https://blog.csdn.net/qq_58174923/article/details/120653723)    pkg-config opencv --modversion

  与ubuntu20版本不匹配

  

**项目架构:**





**开发流程&&规范：**





**question？：**

- [ ] sros-nxp && sros

- [ ] docker远程仓库地址不对

  



### TODO LIST:

- [ ] 调试：
  - [ ] 1.sros脚本推送
  - [ ] 2.创建新module测试pcl功能；
- [ ] 开发:
  - [ ] 协议对接：



#### 微重构对接协议

| **输入** | **消息名称**                               | 消息类型                                |
| -------- | ------------------------------------------ | --------------------------------------- |
|          | 点云（主激光雷达、避障激光雷达、避障相机） | `sros::core::base_msg_ptr`              |
|          | 检测框（多个BOX）                          | `SpaceRange3DS`                         |
|          | 传感器外参                                 |                                         |
|          | 机器的位姿                                 | `std::shared_ptr<slam::tf::TFOperator>` |
| **输出** | 障碍点信息（基于车体）                     | `std::shared_ptr<ObstacleMsg>`          |
|          | 障碍点信息（基于地图）                     | `std::shared_ptr<ObstacleMsg>`          |











- **【perception】**

- [x] 运行编译
- [x] 功能模块组织cmakelists
- [ ] 单独模块的离线调试(细看)



- **【sros】**

- [x] sros组织架构，cmakelists粗略，

- [x] 感知模块集成编译（消息发布订阅，嵌套）

  *1.远程仓库拉去image问题。  Json文件里面配置问题*

  *2.sros下子仓库submodle  sros-resources位置不对；*

- [ ] 运行编译

- [ ] 感知集成，机器控制



- **【避障模块】**

- [ ] 导航方式：路网导航,自由导航，手动导航
- [ ] 产品分类：O车和叉车、避障模型、传感器类别



- 产品→业务→机器人平台→感知需求

- Matrix理解及使用

  

- **【开发调试】**



![2023-09-07 17-47-59 的屏幕截图](std_record.assets/2023-09-07 17-47-59 的屏幕截图.png)
