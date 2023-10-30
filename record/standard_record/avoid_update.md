
| obstacle.sh100_tof1_coord_x                   | SH100 TOF1 安装X方向偏移                                     | 350                    | 350                                 | mm   |
| --------------------------------------------- | ------------------------------------------------------------ | ---------------------- | ----------------------------------- | ---- |
| obstacle.sh100_tof1_coord_y                   | SH100 TOF1 安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.sh100_tof1_coord_yaw                 | SH100 TOF1 安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.sh100_tof2_coord_x                   | SH100 TOF2 安装X方向偏移                                     | 350                    | 350                                 | mm   |
| obstacle.sh100_tof2_coord_y                   | SH100 TOF2 安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.sh100_tof2_coord_yaw                 | SH100 TOF2 安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.sh100_tof3_coord_x                   | SH100 TOF3 安装X方向偏移                                     | 350                    | 350                                 | mm   |
| obstacle.sh100_tof3_coord_y                   | SH100 TOF3 安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.sh100_tof3_coord_yaw                 | SH100 TOF3 安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.sh100_tof4_coord_x                   | SH100 TOF4 安装X方向偏移                                     | 350                    | 350                                 | m    |
| obstacle.sh100_tof4_coord_y                   | SH100 TOF4 安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.sh100_tof4_coord_yaw                 | SH100 TOF4 安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.oba_laser_range_min                  | 用于避障的雷达测距最近距离                                   | 0                      | 0                                   | m    |
| obstacle.oba_laser_range_max                  | 用于避障的雷达测距最远距离                                   | 5                      | 5                                   | m    |
| obstacle.enable_sh100_tof1                    | 是否启用SH100 TOF1                                           | False                  | False                               |      |
| obstacle.enable_sh100_tof2                    | 是否启用SH100 TOF2                                           | False                  | False                               |      |
| obstacle.enable_sh100_tof3                    | 是否启用SH100 TOF3                                           | False                  | False                               |      |
| obstacle.enable_sh100_tof4                    | 是否启用SH100 TOF4                                           | False                  | False                               |      |
| obstacle.eu100_tim320_stop_state              | TIM320检测到障碍后停车级别                                   | 0                      | 0                                   |      |
| obstacle.min_continous_scan_size              | 最小允许成为障碍的连续雷达点数                               | 3                      | 3                                   |      |
| obstacle.stereo_camera_coord_x                | 低矮物体检测设备D435的安装X方向偏移                          | 0.35                   | 0.35                                | m    |
| obstacle.stereo_camera_coord_y                | 低矮物体检测设备D435的安装Y方向偏移                          | 0.35                   | 0.35                                | m    |
| obstacle.stereo_camera_coord_yaw              | 低矮物体检测设备D435的安装yaw角                              | 0                      | 0                                   | °    |
| obstacle.stereo_camera_coord_height           | 低矮物体检测设备D435的安装高度方向偏移                       | 0.35                   | 0.35                                | m    |
| obstacle.rack_wheel_rotate_radius             | 背负货架轮子的旋转半径                                       | 0.1                    | 0.1                                 | m    |
| obstacle.stereo_camera_calibration_matrix     | 低矮物体检测设备D435的安装标定矩阵                           | 1                      | 0                                   | 0    |
| obstacle.calibrate_camera_install_err         | 开启摄像头安装误差标定 成功后自动关闭                        | False                  | False                               |      |
| obstacle.use_stereo_points                    | 是否使用D435点云数据做避障                                   | True                   | True                                |      |
| obstacle.stereo_points_min_height             | 能够被D435检测到的障碍最小高度                               | 30                     | 30                                  | mm   |
| obstacle.enable_remove_rack_leg               | 启用货架腿滤除                                               | True                   | True                                |      |
| obstacle.rack_enable_filter_only_load_full    | 是否仅当LOAD_FULL时才执行货架障碍滤除                        | True                   | True                                |      |
| obstacle.rack_enable_region_filter            | 启用基于区域的货架障碍滤除                                   | True                   | True                                |      |
| obstacle.rack_tailing_noise_angle_thresh      | 货架腿拖尾点角度范围阈值                                     | 1.5                    | 1.5                                 | °    |
| obstacle.rack_region_radius_offset            | 货架上最远位置调节阈值                                       | 50                     | 50                                  | mm   |
| obstacle.enable_stereo_points_when_load_full  | 是否当LOAD_FULL时开启低矮物体避障                            | True                   | True                                |      |
| obstacle.enable_r2100_points_when_load_full   | 是否当LOAD_FULL时开启R2100后退避障                           | True                   | True                                |      |
| obstacle.enable_switch_region_avoid_obstacle  | 是否启用TIM320避障区域切换模式                               | False                  | False                               |      |
| obstacle.oba_laser_angle_narrow_offset        | 将前侧主雷达避障视野缩小的角度值                             | 0                      | 0                                   | °    |
| obstacle.enable_ust_back_online               | 是否在线开启关闭后退UST雷达                                  | True                   | True                                |      |
| obstacle.enable_ust_left_online               | 是否在线开启关闭左侧UST雷达                                  | True                   | True                                |      |
| obstacle.enable_ust_right_online              | 是否在线开启关闭右侧UST雷达                                  | True                   | True                                |      |
| obstacle.ust_back_coord_x                     | 后退UST雷达安装X方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_back_coord_y                     | 后退UST雷达安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_back_coord_yaw                   | 后退UST雷达安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.ust_left_coord_x                     | 左侧UST雷达安装X方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_left_coord_y                     | 左侧UST雷达安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_left_coord_yaw                   | 左侧UST雷达安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.ust_right_coord_x                    | 右侧UST雷达安装X方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_right_coord_y                    | 右侧UST雷达安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_right_coord_yaw                  | 右侧UST雷达安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.ust_back_angle_max                   | 后侧UST雷达扫描角最大值                                      | 135                    | 135                                 | °    |
| obstacle.ust_back_angle_min                   | 后侧UST雷达扫描角最小值                                      | -135                   | -135                                | °    |
| obstacle.ust_left_angle_max                   | 左侧UST雷达扫描角最大值                                      | 135                    | 135                                 | °    |
| obstacle.ust_left_angle_min                   | 左侧UST雷达扫描角最小值                                      | -135                   | -135                                | °    |
| obstacle.ust_right_angle_max                  | 右侧UST雷达扫描角最大值                                      | 135                    | 135                                 | °    |
| obstacle.ust_right_angle_min                  | 右侧UST雷达扫描角最小值                                      | -135                   | -135                                | °    |
| obstacle.ust_back_install_direction           | 后侧UST雷达安装方向是否为正向安装                            | False                  | False                               |      |
| obstacle.ust_left_install_direction           | 左侧UST雷达安装方向是否为正向安装                            | False                  | False                               |      |
| obstacle.ust_right_install_direction          | 右侧UST雷达安装方向是否为正向安装                            | False                  | False                               |      |
| obstacle.enable_photoelectric_switch_obstacle | 开启光电开关避障                                             | True                   | True                                |      |
| obstacle.photoelectric_detect_target_state    | 光电开关检测到障碍状态                                       | True                   | True                                |      |
| obstacle.enable_r2000_obs_online              | 是否在线开启关闭R2000雷达避障                                | True                   | True                                |      |
| obstacle.enable_ust_forward_online            | 是否在线开启关闭前侧UST雷达                                  | True                   | True                                |      |
| obstacle.ust_forward_coord_x                  | 前侧UST雷达安装X方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_forward_coord_y                  | 前侧UST雷达安装Y方向偏移                                     | 0                      | 0                                   | mm   |
| obstacle.ust_forward_coord_yaw                | 前侧UST雷达安装朝向                                          | 0                      | 0                                   | °    |
| obstacle.ust_forward_angle_max                | 前侧UST雷达扫描角最大值                                      | 135                    | 135                                 | °    |
| obstacle.ust_forward_angle_min                | 前侧UST雷达扫描角最小值                                      | -135                   | -135                                | °    |
| obstacle.ust_forward_install_direction        | 前侧UST雷达安装方向是否为正向安装                            | False                  | False                               |      |
| obstacle.ust_forward_coord_info               | 前侧UST雷达安装坐标信息,mm °为单位 x;y;z;roll;pitch;yaw;该值需设置6维信息,否则无效 | 0;                     | x;y;z;roll;pitch;yaw;               |      |
| obstacle.ust_back_coord_info                  | 后侧UST雷达安装坐标信息,mm °为单位 x;y;z;roll;pitch;yaw;该值需设置6维信息,否则无效 | 0;                     | x;y;z;roll;pitch;yaw;               |      |
| obstacle.ust_left_coord_info                  | 左侧UST雷达安装坐标信息,mm °为单位 x;y;z;roll;pitch;yaw;该值需设置6维信息,否则无效 | 0;                     | x;y;z;roll;pitch;yaw;               |      |
| obstacle.ust_right_coord_info                 | 右侧UST雷达安装坐标信息,mm °为单位 x;y;z;roll;pitch;yaw;该值需设置6维信息,否则无效 | 0;                     | x;y;z;roll;pitch;yaw;               |      |
| obstacle.ust_forward_laser_region_info        | 前侧雷达设定检测障碍区域,mm 该值需设置大于等于3个点的多边形,否则无效 | 0;                     | p1x,p1y;p2x,p2y;p3x,p3y;...         |      |
| obstacle.ust_back_laser_region_info           | 后侧雷达设定检测障碍区域,mm 该值需设置大于等于3个点的多边形,否则无效 | 0;                     | p1x,p1y;p2x,p2y;p3x,p3y;...         |      |
| obstacle.ust_left_laser_region_info           | 左侧雷达设定检测障碍区域,mm 该值需设置大于等于3个点的多边形,否则无效 | 0;                     | p1x,p1y;p2x,p2y;p3x,p3y;...         |      |
| obstacle.ust_right_laser_region_info          | 右侧雷达设定检测障碍区域,mm 该值需设置大于等于3个点的多边形,否则无效 | 0;                     | p1x,p1y;p2x,p2y;p3x,p3y;...         |      |
| obstacle.ust_detect_min_height                | 使用UST雷达避障检测最小高度，雷达安装z为0或缺省时该值不启用  | 40                     | 40                                  | mm   |
| obstacle.ust_detect_max_height                | 使用UST雷达避障检测最大高度，雷达安装z为0或缺省时该值不启用  | 40                     | 40                                  | mm   |
| obstacle.enable_keli                          | 是否使用Keli雷达                                             | False                  | False                               |      |
| obstacle.enable_forktip_collision             | 开启叉尖碰撞检测                                             | True                   | True                                |      |
| obstacle.use_ifm_points                       | 是否使用ifm点云数据做避障                                    | True                   | True                                |      |
| obstacle.obstacle_range3d                     | 3D避障空间范围                                               | 0.3;3;-0.8;0.8;-0.4;4; | min_x;max_x;min_y;max_y;min_z;max_z | m    |
| obstacle.qrcode_first_info                    | 二维码1的物料信息                                            | 0;1.2;0.11;            | code_id;good_length;good_width;     |      |
| obstacle.enable_fetch_release_goods_avd       | 开启取放货避障功能                                           | False                  | False                               |      |
| obstacle.enable_change_avd_model              | 开启载货模型变更功能                                         | False                  | False                               |      |
| obstacle.car_body_filter_region               | 需要过滤掉障碍的车体区域（主要针对叉臂）,mm 该值需设置大于等于3个点的多边形,否则无效 | 0;                     | p1x,p1y;p2x,p2y;p3x,p3y;...         |      |
| obstacle.enable_fixedarea_filtration          | 启动固定区域滤波                                             | False                  | False                               |      |
| obstacle.fixedarea_filtration_range           | 固定区域滤波范围,m为单位,中心位置加区域大小,x;y;z;long;width;height;该值需设置6个值,否则无效 | 0;                     | x;y;z;long;width;height;            |      |



- [ ] 参数确认：

  1.一次性参数

  2.业务/matrix运行中下发的变化参数

  3.那些被弃用



