### TigerVNC 服务器安装与基本运行步骤

> isaac-sim服务器安装，远程显示用流模式，Isaac Sim WebRTC Streaming Client显示图像画质太差，故选用远程桌面解决

**一、安装 TigerVNC 服务器包**

1.  **更新软件包列表：**
    
    ```bash
    sudo apt update
    ```
2.  **安装 TigerVNC 服务器及其 Xorg 扩展：**
    ```bash
    sudo apt install tigervnc-standalone-server tigervnc-xorg-extension -y
    ```
    *注意：如果 `tigervnc-standalone-server` 包不存在，请尝试使用 `tigervnc-server`。*

3.  **安装 VNC 会话所需的桌面环境和基本组件** (如果尚未安装，我们之前已确认您拥有这些):
    * **GNOME (您正在使用的桌面环境):**
        ```bash
        sudo apt install ubuntu-desktop -y # 如果没有安装过的话
        ```
    * **基本 X 工具 (用于调试，我们之前也已确认安装):**
        ```bash
        sudo apt install xterm twm -y
        ```

**二、配置 TigerVNC 服务器**

1.  **设置 VNC 密码：**
    以您的用户身份运行 `vncserver` 命令，它会提示您设置 VNC 连接密码。
    
    ```bash
    vncserver
    ```
    *设置密码后，它会尝试启动一个会话，请继续下一步将其终止。*
    
2.  **终止刚刚启动的 VNC 会话：**
    ```bash
    vncserver -kill :1
    ```

3.  **配置 `~/.vnc/xstartup` 文件：**
    这个脚本决定了 VNC 会话启动时会运行什么桌面环境。
    ```bash
    nano ~/.vnc/xstartup
    ```
    将文件内容替换为以下启动 GNOME 的脚本：
    ```bash
    #!/bin/sh
    unset SESSION_MANAGER
    unset DBUS_SESSION_BUS_ADDRESS
    export XDG_CURRENT_DESKTOP="GNOME"
    export DESKTOP_SESSION="gnome"
    exec /etc/X11/Xsession # 推荐使用这个来启动 GNOME
    # 如果上面这行失败，可以尝试下面这行（注释掉上面那行）
    # exec /usr/bin/gnome-session
    
    
    gnome桌面系统挺好的 发现锁屏时候键盘不能输入解锁 我也是醉了 换个轻量化的小老鼠
    #!/bin/sh
    unset SESSION_MANAGER
    unset DBUS_SESSION_BUS_ADDRESS
    exec startxfce4
    
    startxfce4画质问题需要安装字体
    sudo apt update # 再次更新包列表，确保最新状态
    sudo apt install ttf-mscorefonts-installer -y
    sudo fc-cache -f -v # 刷新字体缓存
    
    ```
    
4.  **赋予 `xstartup` 脚本可执行权限：**
    ```bash
    chmod +x ~/.vnc/xstartup
    ```

**三、运行 TigerVNC 服务器**

1.  **启动 VNC 服务器：**
    使用以下命令启动 VNC 服务器，并指定分辨率、颜色深度，以及最重要的允许非本地连接 (`-localhost no`)。
    ```bash
    vncserver -geometry 1920x1080 -depth 24 -localhost no
    ```
    *您可以根据需要调整 `-geometry` 参数来设置不同的分辨率，例如 `1024x768` 或您显示器支持的更高分辨率。*

2.  **确认 VNC 服务器正在监听：**
    ```bash
    ps aux | grep vnc
    ```
    您应该能看到类似 `Xtigervnc` 进程在运行。

**四、从 VNC 客户端连接**

1. **在您的本地计算机上安装 VNC 客户端** (如 RealVNC Viewer 或 TigerVNC Viewer)。

2. **使用您的服务器公网 IP 地址和 VNC 端口 `5901` 进行连接。**

3.   TigerVNC Viewer  sudo snap install tigervnc

     [ RealVNC Viewer](https://www.realvnc.com/en/connect/download/vnc/?lai_vid=0XwD3wWaDilV&lai_sr=15-19&lai_sl=l)

4. 例如：`your_server_ip:5901`

3.  **输入您在步骤二.1 中设置的 VNC 密码。**

您现在应该能看到一个运行着 GNOME 桌面的 VNC 会话了。



 **五、参考：**

 **[ubuntu server 20.04安装vnc远程桌面xfce4](https://blog.csdn.net/lxyoucan/article/details/121672487?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522f1832f78e42faf8900e0b6676144247c%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fblog.%2522%257D&request_id=f1832f78e42faf8900e0b6676144247c&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~first_rank_ecpm_v1~rank_v31_ecpm-3-121672487-null-null.nonecase&utm_term=vnc&spm=1018.2226.3001.4450)**

