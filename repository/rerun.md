# RERUN

> 目的：
>
> 1.算法显微镜，可以多传感器逐帧分析
>
> 2.功能完善：规范消息定义、可视化组件完善、通信调试(真正的 live streaming)

**sros集成：**

**ebox集成：**

跨平台

export LD_LIBRARY_PATH=/sros/rerun_demo/lib:$LD_LIBRARY_PATH
&/sros/rerun_demo/rerun_spiral_demo --connect 10.10.70.2:9876

```shell
export LD_LIBRARY_PATH=/sros/rerun_demo/lib:$LD_LIBRARY_PATH
/sros/rerun_demo/rerun_spiral_demo --connect rerun+http://10.10.70.2:9876/proxy
```

