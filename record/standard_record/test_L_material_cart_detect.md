## L型超低矮

gxf/feat_material_cart_detect_main

 sudo chown -R gxf:gxf .   

​    auto dev_setter = sros::core::SettingDevice::getInstance();

​    sros::core::DeviceItem dev_item = s.getDeviceItemByKey("function.basic.perception.sensor.camera_1");

​    auto item = dev_setter->getDeviceItem(img->sensor_name);

root@rk3399-yocto:~# tail -f /sros/log/sros.INFO | grep "pallet in global pose" I0414 12:56:08.840185 479604 action_167.cpp:74] pallet in global pose : Pose(-1.30999, 0.34204, 0, 0, 0, 3.15419)

![image-20241104160444762](test_L_material_cart_detect.assets/image-20241104160444762.png)



I0414 13:14:20.655741 686914 tf3d.cpp:50] tf3d_rpy:  -0.11817  -6.82481 -0.594441

I0414 13:14:20.655768 686914 tf3d.cpp:52] T_hole_in_agv tf3d_t: -1.68311   0.00696611 0.347446  



I0414 13:09:31.500041 686914 material_cart_detection.cpp:212] Average T_hole_in_agv (euler): -179.666

I0414 13:09:31.500059 686914 material_cart_detection.cpp:213] Average T_hole_in_agv (t):  -1.70721 0.0485123         0



实测调试，依赖轮子找中心点不准

91ddc461db9f236a809c4c0a56e14aadecc94dbc

![image-20241105170816315](test_L_material_cart_detect.assets/image-20241105170816315.png)





L型车长1500 车宽700

手推车：下沿杠高180mm 宽1100mm

料架车：下沿杠高180mm 宽1300mm



  tail -f /sros/log/sros.INFO | grep "cluster\|the pose in sensor" | tee -a a.txt

cd /sros/log/data/ && tail -f /sros/log/sros.INFO | grep "cluster\|the pose in sensor" | tee  a.txt![image-20241107142855562](test_L_material_cart_detect.assets/image-20241107142855562.png)

action 顶升 192-8-19







## 后牵引

**载具情况：**

![_sros_log_data_QRcode_detection](test_L_material_cart_detect.assets/_sros_log_data_QRcode_detection.png)



密封箱体车：下沿杠高120mm 宽700m
开发分支sros分支：perry_merge_rear_tractor_on_5.33.x

开发分支感知仓库分支：gxf/material_cart_detect_v3.11.x 

感知传感器大黑funkey：function.basic.perception.sensor.camera_1
135-1-x  x代表识别站点151-1-x 挂钩操作：脱钩0，挂钩1
151-2-x 旋转机构使能： 使能1，去使能0
151-4-0 旋转部分校准/回中，开机首次执行才会校准，后面执行只回中
151-5-x 行走轮使能： 使能1，去使能0
感知调试：二维码 189 1 11081111    纯点云 189 1 11201111

T_hole_in_agvtf3d_rpy

tail -f /sros/log/sros.INFO  | grep "T_hole_in_agv"

tail -f /sros/log/sros.INFO  | grep "the pose in sensor: x:\|对接中心点:\|料车\|is_extract_ok"

bolt -476     476代表agv中心到对接钩的距离 值越大车会停止在钩之前即调整的距离越小



#### **对接精度分析**

感知：

- [ ] 工作距离     二维码和深度相机测出来不一样
- [ ] 直线拟合

运控：

- [ ] 对接点
- [ ] 贝塞尔调整点
- [ ] 是否运动到目标点





#### BUG排查

- [x] 边界点云累加没清除导致提取直线角度上帧残留另一侧的

- [ ]  过曝导致孔洞

- [x] 异常情况没有赋值为0保留上次角度

- [ ] 下采样之后，先编译直线拟合欠佳

- [ ] 直线拟合后，用得轮子数据X方向应该加个3cm的offset

- [ ] 如果只有一个交点，可预设车宽推测出另外一个交点

- [x] 边界不干净，需要半径过滤后再提取边界（倾斜大和金属材质会导致拍到另一侧的点云）

  ![glider_2024-12-23_1033](test_L_material_cart_detect.assets/glider_2024-12-23_1033.png)





#### 新优化思路

- 下沿杠数据可以用由下生长的点云区域来拟合 边缘的点少且不够稳定
