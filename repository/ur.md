# UR16e机械臂数采

## UR物理机示教器配置

1. 启动按钮后，解除红色紧急按钮；
2. 右下角机器人状态切换为绿色工作状态；
3. 通过urcap插件拷入示教器；
4. 示教器(192.168.56.2)和pc端(192.168.56.1)配置网络，并ping通；
5. 新建程序到机器人程序里面；

## ros2启动命令

### 真机：


```zsh
#第一次启动先标定
ros2 launch ur_calibration calibration_correction.launch.py robot_ip:=192.168.56.2 target_filename:=~/ur16e_calibration.yaml
#启动ros驱动
source install/setup.zsh && ros2 launch ur_robot_driver ur_control.launch.py ur_type:=ur16e robot_ip:=192.168.56.2 kinematics_params_file:=/home/std/ur16e_calibration.yaml
#查看控制器状态
ros2 control list_controllers
#根据需要切换控制器（注意不能共存，会有冲突！！！！！）
ros2 control switch_controllers --deactivate scaled_joint_trajectory_controller
# 激活 forward_position_controller
ros2 control switch_controllers --activate forward_position_controller

source /home/std/workspace/ur_ws/install/setup.zsh && ros2 launch ur_moveit_config ur_moveit.launch.py ur_type:=ur16e robot_ip:=192.168.56.2 kinematics_params_file:=/home/std/ur16e_calibration.yaml
```

### 仿真：

```
ros2 launch ur_simulation_gazebo ur_sim_moveit.launch.py ur_type:=ur16e use_sim_time:=true
```

### 规划扫描点：

```shell
step1：开机启动的默认位姿到黄金位姿
python3 /home/std/workspace/ur_ws/tools/reach_scanning_point.py
step2：沿直线走点扫描
python3 /home/std/workspace/ur_ws/tools/step_move_x.py
step3：监控末端位姿
./tools/monitor_tcp_pose.py
```



## 控制器类型






## 开发计划

- [x] 熟悉示教器界面及简单操作机械臂；
- [x] 控制箱和电脑通信；
- [x] urcap安装及新建程序打通底层控制器；
- [x] gazebo仿真下规划田字扫描
- [x] 真机和仿真跑通笛卡尔直线扫规划描拍摄点；
- [ ] 手眼标定；
- [ ] 控制每个拍摄点不同姿态拍摄；
- [ ] 奥比相机DCW2和334L相机触发采集及感知标准数据采集格式；



## Q&&A

- 实体机械臂移动某些位姿，示教器恢复到机器人正常状态后马上又变红？ ---保护机制卡死，末端负载改为0后继续；



## 总结

- 



## 手眼标定

```
ros2 run tf2_ros static_transform_publisher 0 0 0 0 0 0 base_link tool0 &
ros2 run tf2_ros static_transform_publisher 0 0 0.05 0 0 0 camera_color_optical_frame aruco_marker_frame &
ros2 launch easy_handeye2 calibrate.launch.py name:=ur16e_test calibration_type:=eye_in_hand tracking_base_frame:=camera_color_optical_frame tracking_marker_frame:=aruco_marker_frame robot_base_frame:=base_link robot_effector_frame:=tool0


gnome-terminal --tab --title="ArUco System" -- zsh -c "cd /home/std/workspace/ur_ws && source activate_ur_env.sh && ros2 launch launch/handeye_calibration/dabai_dcw2_aruco_complete.launch.py use_rviz:=false; exec zsh"


ros-humble-aruco-markers 


gnome-terminal --tab --title="DCW2 + ArUco Markers" -- zsh -c "cd /home/std/workspace/ur_ws && source activate_ur_env.sh && ros2 launch launch/handeye_calibration/dabai_dcw2_aruco_complete.launch.py use_rviz:=true; exec zsh"

gnome-terminal --tab --title="UR16e Robot Driver" -- zsh -c "cd /home/std/workspace/ur_ws && source install/setup.zsh && ros2 launch ur_robot_driver ur_control.launch.py ur_type:=ur16e robot_ip:=192.168.56.2 kinematics_params_file:=/home/std/ur16e_calibration.yaml; exec zsh"

gnome-terminal --tab --title="Hand-Eye Calibration GUI" -- zsh -c "cd /home/std/workspace/ur_ws && source install/setup.zsh && ros2 launch easy_handeye2 calibrate.launch.py name:=ur16e_eye_in_hand calibration_type:=eye_in_hand tracking_base_frame:=camera_color_optical_frame tracking_marker_frame:=aruco_marker_0 robot_base_frame:=base_link robot_effector_frame:=tool0; exec zsh"

//发布节点
gnome-terminal --tab --title="Hand-Eye Publisher" -- zsh -c "cd /home/std/workspace/ur_ws && source install/setup.zsh && ros2 launch easy_handeye2 publish.launch.py name:=ur16e_eye_in_hand; exec zsh" &

timeout 5s ros2 topic echo /aruco/markers --once
```

