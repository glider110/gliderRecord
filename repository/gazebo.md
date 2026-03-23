# Gazebo

### 标准路径配置

```shell
#Gazebo：
export GAZEBO_MODEL_PATH=$GAZEBO_MODEL_PATH:$HOME/turtlebot3_ws/install/turtlebot3_gazebo/share/turtlebot3_gazebo/models
export GAZEBO_MODEL_PATH=$GAZEBO_MODEL_PATH:model_editor_models
#Ignition Gazebo：
```

也可以在package.xml

```xml
  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>
  
  <export>
    <build_type>ament_cmake</build_type>
    <!-- <gazebo_ros gazebo_model_path="${prefix}/.." /> -->
    <gazebo_ros gazebo_model_path="${prefix}/models" />
    <gazebo_ros gazebo_model_path="${prefix}/worlds" />
    <gazebo_ros gazebo_model_path="${prefix}/components" />
    <!-- <gazebo_ros gazebo_model_path="${prefix}/robots" /> -->
  </export>
```



### 清理顽固进程

rm ~/.ignition/gazebo/6/gui.config

pkill -9 -f "gz sim\|ign gazebo\|ruby.*ign\|gzserver\|gzclient\|ign\|gz" 2>/dev/null; sleep 1; echo "All Gazebo/Ignition processes killed"

rm -rf ~/.ignition/ ~/.gz/ ~/.cache/gz/ ~/.cache/ignition/ /tmp/gz-* /tmp/ign-* /tmp/gazebo-* 2>/dev/null; echo "All caches cleaned"

kill -9 1314626 2>/dev/null; sleep 1; ps aux | grep "ign gazebo" | grep -v grep || echo "All ign gazebo processes cleaned"



#!/bin/bash

pkill -f nav2
pkill -f slam_toolbox
pkill -f gz
pkill -f gazebo

pkill -f robot_state_publisher

ros2 daemon stop
ros2 daemon start

pkill -f rsp/camera





### 仿真模型组件：

https://github.com/aws-robotics/aws-robomaker-small-warehouse-world

https://github.com/jrosellog2000/agv_project/tree/main/models







