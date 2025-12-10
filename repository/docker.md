# Docker

## 1.常规运行

List of all the used Docker commands during the exercises.

**Note:** "docker compose" -commands need to be run in the same location where the `docker-compose.yaml` file is:

    cd robotics_essentials_ros2/docker/

#### Re-build a container
    docker compose up --build

#### Run a container
    docker compose up

#### Run a container in detached mode
    docker compose up -d

#### Open a new terminal inside the Docker container 
    docker exec -it robotics_essentials_ros2 bash

#### List all the running Docker containers
    docker ps

#### Stop a running container
    docker stop robotics_essentials_ros2

#### Remove a running container
    docker rm robotics_essentials_ros2

```
docker commit 7333e9e91190 perception-desktop:v2

```



## 2.保存和迁移Docker容器环境

#### 1. 保存当前容器状态

#### 方法一：使用 docker commit
```bash
# 查看当前运行的容器
docker ps

# 将容器保存为新的镜像
docker commit robotics_essentials_ros2 my_ros2_image:latest
```

#### 方法二：导出镜像为文件
```bash
# 将镜像保存为tar文件
docker save my_ros2_image:latest > my_ros2_image.tar
docker save perception-desktop:v2 -o perception-desktop-v2.tar
```

#### 2. 在新环境中使用

#### 准备工作
```bash
# 创建必要的工作目录
mkdir -p ~/exercises_ws/src

# 设置X11权限
xhost +local:docker
```

加载镜像

```bash
# 在新环境中加载镜像
docker load < my_ros2_image.tar
```

#### 使用保存的镜像
```bash
# 使用docker-compose启动容器
docker compose -f docker-compose-saved.yaml up -d
```

#### 减小镜像体积
```bash
# 导出容器为tar文件
docker export robotics_essentials_ros2 > container.tar

# 导入为新的镜像
cat container.tar | docker import - my_ros2_image:latest
```

#### 压缩保存
```bash
# 使用gzip压缩
docker save my_ros2_image:latest | gzip > my_ros2_image.tar.gz
```

#### 5. 验证迁移

#### 检查容器状态
```bash
# 查看容器是否正常运行
docker ps
# 进入容器
docker exec -it robotics_essentials_ros2 bash
```

---

## 3. 清理悬空镜像（dangling images）

悬空镜像通常是 `<none>:<none>`，使用以下方式清理：

### 查看悬空镜像
```bash
docker images -f "dangling=true"
docker image prune -f
docker image prune -a
```

## 3.网络问题

```
配置代理（如果你有科学上网环境）
sudo gedit /etc/systemd/system/docker.service.d/proxy.conf

[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
Environment="NO_PROXY=localhost, 127.0.0.0/8, ::1"

镜像源加速
sudo gedit  /etc/docker/daemon.json

sudo systemctl daemon-reload     # 重新加载 systemd 配置（如果修改了 systemd 相关配置）
sudo systemctl restart docker    # 重启 Docker 服务
```

## 感知开发桌面

> 集成感知所需的开发环境：Ubunru22.04+Humble+VNC+ZSH+VNC+拼音+跨平台复制粘贴

```
docker run -d \
  --name perception-desktop-base_test1 \
  --network=host \
  --privileged \
  -v /dev:/dev \
  -v /tmp/.X11-unix:/tmp/.X11-unix \
  -v ~/docker_ws:/home/ubuntu/workspace \
  -v ~/docker_persist/home_ubuntu:/home/ubuntu \
  -e VNC_RESOLUTION=1920x1080 \
  -e VNC_PASSWORD=1 \
  -e http_proxy=http://127.0.0.1:7890 \
  -e https_proxy=http://127.0.0.1:7890 \
  -e all_proxy=socks5://127.0.0.1:7890 \
  perception-desktop:v1

http://10.10.70.2:6080/
http://localhost:6080/
http://127.0.0.1:6080/
```

