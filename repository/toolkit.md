##                                                                       ffmpeg 

ffmpeg -i 华为o车.webm -r 1 image-%3d.jpeg 

**封面裁剪**

ffmpeg -i jia.mp4 -r 1 image-%3d.jpeg 

**视频裁剪**

ffmpeg -i output.mp4 -f segment -segment_time 10 -c copy -reset_timestamps 1 output%03d.mp4#ffmpeg
#视频语音提取
ffmpeg -i 20240603_165541.mp4 -vn -acodec libmp3lame -ab 128k output_audio.mp3
#封面裁剪
ffmpeg -i jia.mp4 -r 1 image-%3d.jpeg 
#视频裁剪
ffmpeg -i output.mp4 -f segment -segment_time 10 -c copy -reset_timestamps 1 output%03d.mp4





##                                                                         Docker

### 1.常规运行

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



### 2.保存和迁移Docker容器环境

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

#### 3. 注意事项

#### 保存的内容包括
- 所有安装的软件包
- 环境变量设置
- 用户配置
- 工作空间中的代码
- 其他修改

#### 不包含的内容
- 挂载的卷（如exercises_ws/src）中的内容
- 容器运行时的临时文件

#### 最佳实践
1. 定期保存镜像以备份重要更改
2. 给镜像添加有意义的标签
3. 记录镜像的版本和主要更改
4. 在新环境中测试镜像的完整性

#### 4. 镜像优化（可选）

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



