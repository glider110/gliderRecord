### 避障策略模块代码解读



#### 1.避障粒子点生成

根据导航路径下发的类型和路径的第一和最后一个点来按step抽样为粒子点

```c++
struct ParticleInfo {
    ParticleInfo() {}
    ParticleInfo(const Eigen::Vector3d& curr_pose, ParticleMoveState& state)
        : pose(curr_pose), move_state(state) {}
    Eigen::Vector3d pose;          // 每个采样粒子的中心位姿
    ParticleMoveState move_state;  // 采样粒子状态
    double start_angle;            // 主要服务于旋转粒子
    double end_angle;              // 主要服务于旋转粒子
};
```



#### 2.障碍物管理(ObstaclePointsManager)

定义新的数据类型来接收点云模块下发的数据

```c++
struct ObstaclePoints {
    enum ObaState {
        STATE_OBA_STOP_0 = 0,
        STATE_OBA_STOP_1,
        STATE_OBA_STOP_2,
        STATE_OBA_STOP_3,
        STATE_OBA_STOP_4,
        STATE_OBA_SLOW,
        STATE_OBA_FREE,
    };
    std::string obstacle_name;
    int64_t time;
    std::vector<Eigen::Vector3d> points;
    slam::tf::Transform3D sensor_tf;
    bool is_region_oba = false;
    ObaState oba_state;
};

```



#### 3.粒子点碰撞(CollideRegionManager)

