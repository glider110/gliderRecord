### 图形系统使用 NVIDIA OpenGL 而不是 Mesa

| 变量                               | 功能                                                       |
| ---------------------------------- | ---------------------------------------------------------- |
| `__NV_PRIME_RENDER_OFFLOAD=1`      | 启用 NVIDIA 渲染 + PRIME 显示回传（远程桌面/虚拟显示常用） |
| `__GLX_VENDOR_LIBRARY_NAME=nvidia` | 指定使用 NVIDIA 的 OpenGL 实现（而不是 Mesa）              |

```
1.查看
glxinfo | grep "OpenGL"

export __NV_PRIME_RENDER_OFFLOAD=1
export __GLX_VENDOR_LIBRARY_NAME=nvidia


__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia vglrun -d :1.0 ./isaac-sim.selector.sh
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia vglrun -d :1.0 ./isaac-sim.sh
```

```text
#!/bin/sh
xrdb $HOME/.Xresources
export XDG_SESSION_TYPE=x11
export DESKTOP_SESSION=ubuntu
export XDG_CURRENT_DESKTOP=ubuntu:GNOME
gnome-session &



http://10.10.19.40:8211/streaming/webrtc-client?server=10.10.19.40

echo "127.0.1.1 glider" >> /etc/hosts
export USER=root


docker rm $(docker ps -a -q)

docker exec -u root -it robotics_essentials_ros2 bash


vncserver -kill :1
vncserver :1 -geometry 1920x1080 -depth 24 -localhost no

杀掉所有 VNC 服务（保险起见）
pkill Xtightvnc
rm -rf /tmp/.X11-unix/X1
rm -rf /tmp/.X11-unix/X2
rm -f /root/.vnc/glider:1.pid
rm -f /root/.vnc/glider:2.pid
rm -f /root/.vnc/glider:3.pid
vncserver -kill :1

```