环` `境配置：

- 系统 ：Ubuntu 22.04.2 LTS

- ros2版本：Humble   

- gezebo版本：Garden、Fortress

- ![image-20241226214634540](ROS2.assets/image-20241226214634540.png)

  ![image-20241227101928472](ROS2.assets/image-20241227101928472.png)

```
1.更新源
sudo gedit /etc/apt/sources.list

deb https://mirrors.ustc.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.ustc.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
deb http://packages.ros.org/ros/ubuntu focal main     //这步是错的！！！！卡了很久  用jammy版本的源

2.ros2一键安装：
wget http://fishros.com/install -O fishros && . fishros

3.gazebo安装
sudo apt install gazebo11
sudo apt install ros-humble-gazebo-ros\*  #ros2桥接 

4.卸载 Gazebo 和依赖
sudo apt-get remove --purge gazebo\* libgazebo\* ros-humble-gazebo\* libignition-\*
sudo apt-get autoremove --purgesudo apt-get clean
sudo rm -rf /var/lib/apt/lists/*
sudo apt-get update
sudo rm -rf /usr/share/gazebo*
sudo rm -rf /usr/lib/x86_64-linux-gnu/libgazebo*
sudo rm -rf ~/.gazebo
sudo apt --fix-broken install
sudo apt-get remove --purge libgazebo11 libgazebo-dev gazebo
sudo apt-get autoremove --purge
sudo apt-get clean


```







```text
sudo apt-get install ros-${ROS_DISTRO}-ros-gz

sudo apt-get update
sudo apt-get install lsb-release wget gnupg 
sudo wget https://packages.osrfoundation.org/gazebo.gpg -O /usr/share/keyrings/pkgs-osrf-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/pkgs-osrf-archive-keyring.gpg] http://packages.osrfoundation.org/gazebo/ubuntu-stable $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/gazebo-stable.list > /dev/null
sudo apt-get update
sudo apt-get install ignition-fortress
```

- 高精度巡航对接: gazebo仿真构建工厂对接场景,模拟深度相机及雷达数据；

- 高精度巡航对接:ros2环境下基于虚拟数据cartographer局部地图及导航；

  

#### 基础命令：

```shell
常规检索方式  
1.查看包和节点|运行节点
ros2 pkg executables   ros2 run turtlesim turtlesim_node 
2.查看运行node的话题和查看所有的话题
ros2 node list  ros2 topic list  -t -v
3.查看具体哪个节点的信息|查看具体话题收发情况
ros2 node info /turtlesim  ros2 topic info /turtle1/pose
5查看具体哪个话题的定义
ros2 interface show turtlesim/msg/Pose
6.构造发送数据
ros2 topic pub  /turtle1/cmd_vel  geometry_msgs/msg/Twist "{linear:{x: 0.5, y: 0.0},angular: {z: 0.0}}"

```

#### Fishbot_Course:

```shell
 ros2 launch  slam_toolbox  online_async_launch.py  use_sim_time:=True
 ros2 run nav2_map_server map_saver_cli -f room
 ros2 service call /write_state cartographer_ros_msgs/srv/WriteState "{filename: '/home/std/workspace/carto_ws/src/fishbot_cartographer/map/map.pbstream'}" 
```





#### 仿真：



tugbot_depot



### 对比总结

| 特性               | URDF                       | SDF                             | Xacro                      |
| ------------------ | -------------------------- | ------------------------------- | -------------------------- |
| 文件格式           | 基于 XML                   | 基于 XML                        | 基于 XML                   |
| 主要用途           | 机器人模型描述             | 仿真场景和机器人模型描述        | 动态生成 URDF 文件         |
| 支持的功能         | 机器人关节和链接描述       | 机器人模型 + 仿真参数           | 参数化、代码复用           |
| 灵活性             | 中等                       | 高                              | 高                         |
| 与 Gazebo 的兼容性 | 需要转换为 SDF             | 原生支持                        | 需先转换为 URDF            |
| 适用场景           | ROS 系统中的机器人模型描述 | Gazebo 仿真中的机器人和环境描述 | 创建动态、复杂的 URDF 文件 |



**优秀项目参考：**

[1]: https://github.com/huangyqs123/ME5413_Final_Project?tab=readme-ov-file	"Autonomous Vehicle SLAM, Perception, and Navigation"

yesterday onece  more



https://app.theconstruct.ai/courses

**[模型库](https://app.gazebosim.org/dashboard)**

[**模型资源库2**](https://github.com/gazebosim/sdformat)

**[SDF](http://sdformat.org/spec?ver=1.11&elem=scene)**

台湾纬创

```
ros2 interface show nav_msgs/msg/Odometry
ros2 topic echo /odom  查看实时


```

