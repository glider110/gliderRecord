# 光流：

### 1.前置问题：

​	1.卡死,悬空;                                                                                     ==视觉丢失的场景下，前撞没触发，导致地图外延出错；== 

​	2.延墙频繁碰撞,地图走斜;                                                              ==延边频繁碰撞,视觉丢失,纯依靠imu走歪;==

问题：地图不准 1.地图外延 2.地图倾斜（纯惯导下碰撞导yaw角误差变大，延墙）

<img src="OPT_FLOW.assets/webwxgetmsgimg.jpeg" alt="webwxgetmsgimg" style="zoom: 33%;" />

**光流计模块:**

![image-20220119141413764](OPT_FLOW (copy).assets/image-20220119141413764.png)

![image-20220119141155191](OPT_FLOW (copy).assets/image-20220119141155191.png)1.

![img](OPT_FLOW.assets/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA5oKf5b2x55Sf,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center.jpeg)