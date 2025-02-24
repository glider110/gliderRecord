## ROS2



## 1. 安装 `foxglove_bridge`

### 方法 1：使用 `apt` 安装（推荐）
```bash
sudo apt update
sudo apt install ros-humble-foxglove-bridge  # 适用于 ROS 2 Humble
```
如果使用的是其他 ROS 2 版本，如 Iron，使用：
```bash
sudo apt install ros-iron-foxglove-bridge
```

### 方法 2：从源码安装
```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src
git clone https://github.com/foxglove/foxglove_bridge.git
cd ~/ros2_ws
colcon build
source install/setup.bash
```

---

## 2. 启动 `foxglove_bridge`
```bash
ros2 run foxglove_bridge foxglove_bridge
```
默认监听端口 `8765`，日志应显示：
```
[INFO] [foxglove_bridge]: Listening on 0.0.0.0:8765
```

如需更换端口：
```bash
ros2 run foxglove_bridge foxglove_bridge --port 8888
```

---

## 3. 连接 Foxglove Studio

1. 打开 [Foxglove Studio](https://studio.foxglove.dev/)（Web 或桌面版）。
2. 点击 **"Add Connection"**。
3. 选择 **"WebSocket"**。
4. 在 URL 输入框中填写：
   - 本机连接：`ws://localhost:8765`
   - 远程连接：`ws://<ROS2设备IP>:8765`
5. 点击 **"Connect"**。

---

## 4. 测试 ROS 2 话题
发布测试数据，检查是否能在 Foxglove Studio 中接收：
```bash
ros2 topic pub /test_topic std_msgs/msg/String "{data: 'Hello Foxglove'}"
```

查看当前所有 ROS 2 话题：
```bash
ros2 topic list
```

---

## 5. 远程连接（不同设备）
如果 `foxglove_bridge` 运行在另一台设备，需要允许外部访问：
```bash
ros2 run foxglove_bridge foxglove_bridge --address 0.0.0.0
```
然后在 Foxglove Studio 里填写：
```
ws://<ROS2设备IP>:8765
```

若仍无法连接，检查防火墙设置：
```bash
sudo ufw allow 8765/tcp
```

---

## 6. Debugging
### 检查 WebSocket 端口是否开启
```bash
netstat -tulnp | grep 8765
```

### 启动 `foxglove_bridge` 调试模式
```bash
RUST_LOG=debug ros2 run foxglove_bridge foxglove_bridge
```

### 停止 `rosbridge_server`（如有冲突）
如果错误地启动了 `rosbridge_server`，可以停掉：
```bash
ros2 lifecycle set /rosbridge_websocket shutdown
```
或直接 `Ctrl + C` 终止。

---

完成以上步骤后，Foxglove Studio 应该能够正常显示 ROS 2 话题数据 🎉。