# ICP：

### 1.前置问题：

​	1.解决什么问题？视觉丢失的场景 数据不准的问题

​	2.有必要做吗？（可行性分析）有没有必要做or有没有能力做

​	3.执行力模型：总分 内容模块    数据  算法  测试验证   打包接口融合



### 2.进度安排：

- [x] 接口框架开发；
- [x] 离线数据流测试；
- [x] 配准可视化（动态+静态）;
- [x] log调试分析工具；
- [ ] 多种匹配算法对比开发测试(调参数)
  - [x] 加滤波去噪
  - [ ] 分割大区域或孤立物体来作匹配
- [ ] 精度测试
  - [ ] 物理度量
  - [ ] IMU
  - [ ] vslam
- [ ] 耗时测试
- [x] 定位轨迹生成



### 3.可能遇到的问题：

- 盲区看到；
- 朝前看地话 平坦地面基本没有特征数据；
- 有尺度信息 密度 ；
- 避障针对500mm   定位适合500-1000mm
- 怎样评价这个算法的精度和时间  精度和imu 和 vslam作比较



### 4.测试遇到的问题：

- 不向vslam朝天  tof考虑到视野和精度 一个转身就丢失共有区域
- ofstream指针保存txt失败



### 5.锻炼能力

- 独立开发标准功能接口
- 小项目主动思考 分析 执行 交互 测试



### 6.杂记

- 参数调整：两帧点云的采样间隔 下采样间隔 重合度？

[**[3]知乎话题：该如何学习三维点云配准的相关知识？**](https://www.zhihu.com/question/34170804)

[**[3]点云匹配和ICP算法概述**](https://www.cnblogs.com/yhlx125/p/4955337.html)

  

总结：测试的时候应该秉持由检到繁的思想到里面，大局观思想后一层一层的剥离开来；

           exp：连续数据流→只要两帧→单一方向→选匹配算法→调参   这样的研究思路，不然自己把自己绕晕
