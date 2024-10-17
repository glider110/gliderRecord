## 避障3.0（新方案调研）



#### 避障方案调研

1. 竞品公司的避障方案
2. 自动驾驶（蔚小理）方案



#### 参考资料：

- **[VoxelNet: End-to-End Learning for Point Cloud Based 3D Object Detection](https://arxiv.org/abs/1711.06396)   [端到端的检测](https://github.com/qianguih/voxelnet?tab=readme-ov-file)**
- **[快速3D点云分割论文代码（带注解）：Fast segmentation of 3d point clouds for ground vehicles](https://github.com/HuangCongQing/linefit_ground_segmentation_details/tree/main)**
- Patchwork++
  1. [**SOTA fast and robust ground segmentation using 3D point cloud (accepted in RA-L'21 w/ IROS'21)**](https://github.com/LimHyungTae/patchwork)
  2. **[Patchwork++: Fast and robust ground segmentation method for 3D LiDAR](https://github.com/url-kaist/patchwork-plusplus/tree/master)**

**参考：**https://github.com/aditya-167/Lidar-Obstacle-Detection-PCL

![img](refacter.assets/data2.gif)
**参考：**https://github.com/kostaskonkk/datmo

![Example experiment](refacter.assets/experiment.gif)

![Example experiment](refacter.assets/output.gif)



> 在机器人的应用场景避障检测过程中，对地面进行检测或分割（ground segmentation）是最核心的一个步骤，以便提取出可行驶区域用于规控，或者对地面以外的障碍物点进行检测以用于避障；
>
> 地面分割的准确性直接影响误避障触发频率，也影响障碍物的检测精度，本文将对主流的一些地面提取的方案进行总结；




#### **1. 平面栅格法**

​        栅格法通常是根据设定好的尺寸建立平面网格（也可以做多层网格或者三维体素），然后将原始点云投影到对应的网格中，对每个网格中的点集提取特征，比如：平均高度、最大高度、高度差、密度等等。

**具体方法：**

设置网格尺寸生成栅格图；根据点的x,y坐标投影到对应的栅格中；统计每个栅格中的点集高度特征；用统计量与设定的阈值比较进行分类。
**存在问题：**

当激光雷达线束比较少的时候会漏检或误检，比如用16线激光雷达采集的道路数据，车辆前方20米以外的地面上，能够打到的激光点已经比较少了，而且打到障碍物上的激光线束一般也只有一条，如果在栅格中采用高度特征进行地面过滤，遇到低矮的障碍物很容易会被当成地面点过滤掉。

#### 2. **点云法向量法**

  点的法线估计是需要其邻域点的做支持，邻域的大小一般由邻域半径值或临近点个数来表示。过大的邻域会抹平三维结构细节使得法向量过于粗糙，而过小的邻域由于包含了太少的点受噪声干扰较大。

用法向量进行地面分割是考虑到地面点的法向量一般为竖直方向，通过设置角度阈值，求每个点的法向量与地面法向量的夹角，与阈值对比进行分类。
    考虑到人行道，车顶等道路上很多物体都存在法向量为（0,0,1）或（0,0,-1）的区域，所以通常会把点云法向量作为特征与其他方法结合过滤地面点集。

#### 3. 模型拟合法

​        常用的模型拟合方法包括以下几种：平面拟合-RANSAC、高斯过程-GP-INSAC、平面参数拟合（特征值）

**具体方法：**

以RANSAC平面拟合的方法为例，具体流程如下：

在设置的迭代次数内，每次随机选取3个点确定一个平面方程（Ax+By+Cz+D=0）；

将所有点依次带入该平面方程中，根据设定的距离阈值做判定，若在阈值范围内，则认为属于该平面的内点，否则为外点，遍历所有点后统计内点个数；

在迭代次数内内点数量最多的平面方程即为地面方程，该地面方程下的内点就是地面点云集，外点就是障碍物点云集；

**存在问题：**

1. 交通道路从排水考虑通常是中间凸起，两边低洼，类似于拱桥形状，虽然曲率不大，但是通过随机采样一致性算法计算地平面，可能会得到倾斜于一侧的平面作为地面方程；

2. 在上下坡的时候同样因为地面非绝对平面，计算出的地面方程，会出现把前方地面点集作为障碍物点的情况；

3. 由于RANSAC是在点云空间随机的取三个点构建平面，如果场景中存在大块墙面时，会出现将墙面作为地面方程的情况；

#### 4. 面元网格法

​        基于面元的分割可以分为局部类型或者表面类型，常采用区域增长的方式进行地面分割。其核心是基于点法线之间角度的比较，将满足平滑约束的相邻点合并在一起，以一簇点集的形式输出，每簇点集被认为是属于相同平面。

**存在问题：**

采用面元区域增长的方法在一定程序上能够较好的应对地面存在曲率的情况。对于比较平缓的曲面或者平面能够达到较好的分割效果，但是实际道路中的噪声点太多，直接使用区域增长分割地面，会出现较多零星的地面点被当成障碍物点集。



#### 一些开源的地面分割算法

1. **[linefit_ground_segmentation](https://github.com/lorenwel/linefit_ground_segmentation)**
1. **[plane_fit_ground_filter](https://github.com/HuangCongQing/plane_fit_ground_filter)**
1. **[depth_clustering](https://github.com/PRBonn/depth_clustering)**
1. **[Patchwork](https://github.com/LimHyungTae/patchwork)**
1. [**Patchwork++**](https://github.com/url-kaist/patchwork-plusplus)













**避障调研资料:**

[**1.机器人避障相关知识**](https://blog.csdn.net/xiaoma_bk/article/details/80093972?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogOpenSearchComplete%7ERate-3-80093972-blog-131505505.235%5Ev43%5Epc_blog_bottom_relevance_base2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogOpenSearchComplete%7ERate-3-80093972-blog-131505505.235%5Ev43%5Epc_blog_bottom_relevance_base2&utm_relevant_index=4)





