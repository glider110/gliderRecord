sros_core架构及代码问题：

- [ ] point_processing模块是否弃用？

- [ ] 交叉编译是否包含pcl库？

- [ ] 只用一种传感器，3D激光雷达？

- [ ] avoid_oba先不看不影响日本叉车这个项目？

- [ ] 和sros交互的参数要怎么写入？

- [ ] 取货避障理解？卸货传感器被遮挡

- [ ] 传感器是怎么配置的？

  ```c++
  enum SensorType{
      TYPE_LASER_SENSOR = 1,
      TYPE_R2100_SENSOR = 2,
      TYPE_SH100_SENSOR = 3,
      TYPE_EU100_TIM320_SENSOR = 4,
      TYPE_STEREO_CAMERA = 5,
      TYPE_UST05LA_SENSOR = 6,
      TYPE_SH200_SENSOR = 7,
      TYPE_KELI_SENSOR = 8,
      TYPE_IFM_SENSOR = 9       3D激光雷达
  };
  ```

- [ ] 编译sr_library？

  ```cmake
  sr_library(module-obstacle
          SRCS
              obstacle_module.cpp
              sensor_manager/sensor_process_alg.cpp
              rack_oba_filter_singleton.cpp
              sensor_manager/base_sensor_manager.cpp
          HDRS
              obstacle_module.h
              sensor_manager/sensor_process_alg.h
              rack_oba_filter_singleton.h
          DEPENDS
          )
  ```

- [ ] update到matrix里面？编译过慢
- [ ] 日本设备开发叉车申请？
- [ ] log获取？