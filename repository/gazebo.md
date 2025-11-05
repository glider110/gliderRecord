# Gazebo

标准路径配置

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



网络模型资源：

