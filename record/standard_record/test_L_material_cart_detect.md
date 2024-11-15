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

