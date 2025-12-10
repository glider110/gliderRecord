# EasyGo

> 需求：
>
> 1. 满足esay_go项目自由导航为主情况下对感知能力的高要求；
> 2. 搭建完整的感知平台语义感知能力；

## 感知方案

**检测类别：**

- 常规障碍
- 行人检测
- 黑色栈板
- 减速带
- 警示带
- 警示牌
- 插齿



**传感器选型：**

- DCW2
- 安思江
-  [DaBai+Max+Pro产品规格书（标品）V1.0-对外版20240323(1).pdf](../../../../桌面/std/传感器/easy-go/DaBai+Max+Pro产品规格书（标品）V1.0-对外版20240323(1).pdf) 
- 图漾
- [速腾AC1](https://www.robosense.ai/IncrementalComponents/AC1)

**传感器布局:**



**边缘盒子：**



**传感器融合：**





传统local costmap

BEV：

**下游导航理解：**

1. 感知地图给控制什么？
自由导航的控制核心不是“地图漂亮”，而是控制器能否稳定预测未来 1–3 秒的安全空间。
换句话说，控制器最需要的是：

一张局部、以车体为中心、无死角的占用状态图（cost map / occupancy map）+ 障碍物运动趋势。

你给我的感知地图只要满足三件事，我的控制就能自由：

1. 车体四周 360° 的障碍状态（静态/动态）

2. 障碍物几何形状或至少膨胀后的占用区

3. 更新频率 ≥10Hz，延迟低


再花哨的 BEV、点云语义、检测分类都只是锦上添花。

## 参考项目





## 自由导航架构





## 风险点

1. 移动状态下轨迹预测
1. 多传感器融合（观察视角），中间层？
1. 时间同步，驱动层？





## 参考

**公司一：locus**

1. [locus-origin](https://locusrobotics.com/locusone/fleet/locus-origin-collaborative-robot)
2. https://www.youtube.com/watch?v=3xlm4nSHVx0&list=PLR-JSs-stynyEIpEHhy7LBJ9posHD3hEx&index=2
3.  [Origin-Product-Sheet.pdf](../../../../下载/Origin-Product-Sheet.pdf) 

**公司二：mir**

1. https://www.youtube.com/shorts/HwLAqPAYMUg、
2. https://mobile-industrial-robots.com/zh/products/mir-go/nord-modules-qm220-quick-mover

**公司三：otto**

1. https://www.youtube.com/watch?v=zshAly6fUhY



[llm_easy_go](https://chatgpt.com/c/692d0100-8100-8321-a821-d07f3e14ce59)