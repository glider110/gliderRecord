## 高精度巡航对接（研发专项）

前置内容：

- 栈板识别的没有使用深度相机的原因： 

​		1.工作距离太远 2.usb连接线移动伸缩不可靠

- 没有用图样的工业级结构光相机

  reson：还是因为在2m的精度达不到









货架对接：

不是依靠局部地图信息，而是依靠当下某次的检测的目标点和位姿调整点







#### 前期验证（cartographer+fast_gicp）：

envirment： ros2+ dcw2+fast_gicp

envirment： ros2+ oradar+cartographer

后牵引录数据：









调研参考方案：

（NDT + Cartographer） 使用 `ndt_mapping` 增强 Cartographer 定位





**RTAB-Map**

ros2 http://wiki.ros.org/rtabmap_ros/Tutorials



https://www.ncnynl.com/archives/202407/6389.html

深度相机仿真 turtle3 https://github.com/mlherd/ros2_turtlebot3_waffle_intel_realsense

https://www.ncnynl.com/archives/202204/5179.html



https://github.com/agilexrobotics/limo_ros2_doc/blob/master/LIMO-ROS2-humble.md



算法思路：

https://x.com/i/grok/share/Xh32LW6wfxSv9KdwyF8xU6Qsa



个人理解：‘

- [ ] 直接纯点云运行rtabmap不会成功，它需要初始化odom-base的tf 这个tf需要icp_odom来发出，即为前端，后端只回环和优化map-odom的tf，不会用局部地图再匹配点云计算位姿，这个区别于cartographer的scan到submap，后端的位姿一直只用icp_odom。



**静止状态前端累加**

<video src="medium/icp里程计静止累加.webm"></video>
**rtab后端更新及位姿优化**

 <video src="medium/rtab后端更新及位姿优化.webm"></video>
