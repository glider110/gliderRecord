##  避障升级版本问题：





- [ ] 同一系列的sensor归一化统一？
  - [ ] 数据形式不一样导致不能适配一套处理piping
  - [ ] 内部参数怎么做适配？



- 叉臂动态去除(感知相机是否和叉臂相对固定)
- 货架腿目前是按照什么策略来fliter？（其实避障里面也涉及到点云识别））     -----可以在process模块中添加基本识别功能
- 提前标记解决部分盲区问题
- 避障策略等级划分









scp -P 2222 sros root@10.10.91.4:/sros/bin/

sshpass -p SRpasswd@2017 ssh  -p 2222 root@10.10.91.4





git checkout 399c6190c6315df6bfbcb8aaed52d006e096f2f9 modules/obstacle/sensor_manager/sensor_process_alg.cpp

git checkout  -- modules/obstacle/sensor_manager/sensor_process_alg.cpp
