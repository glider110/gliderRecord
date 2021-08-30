#ifndef REMOTE_PUSH_POINTCLOUD_H_
#define REMOTE_PUSH_POINTCLOUD_H_

#ifdef __cplusplus
extern "C" {
#endif

#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>
#include <fcntl.h>
#include <sys/shm.h>

#ifdef __cplusplus
}
#endif

#include <string>
#include <vector>
#include "aktof.h"

#define MACRO_HEAD_ONE    (0xff)
#define MACRO_HEAD_TWO    (0xea)
#define MACRO_END_ONE     (0xea)
#define MACRO_END_TWO     (0xfa)
#define MACRO_POINTS_SIZE (224 * 172)

#define MYPORT  8887

namespace NS_REMOTE_PUSH_POINTS {

class RemotePushPointCloud 
{
  
public:
    RemotePushPointCloud() {
        is_init_ok = false;
    }
    // IP:为PC端ip地址 points：点云数据,obstacle：检测结果
    bool remote_push(std::string ip, const AKTOF::point_array& points, cv::Mat& obstacle);
    
private:

    typedef enum
    {
        NONE_OBSTACLE = 0,
        FLYING_OBSTACLE,
        LOW_OBSTACLE,
        BLANKET_OBSTACLE,
        TRAP_OBSTACLE,
        NEARBY_OBSTACLE,
        HIGH_OBSTACLE,
        FRONT_OBSTACLE,
        LEGS_OBSTACLE,
        THRESH_OBSTACLE,
        TOF_BUMPER,
        VERY_LOW_OBSTACLE
    } OBSTACLE_TYPE;            // 障碍物类型，用于障碍物检测结果传输

    typedef enum 
    {
        ONLY_POINTS = 0,        // 只传输点云
        POINTS_OBSTACLE_MAP     // 传输点云和障碍物地图

    } DATA_TYPE;

    // 初始化成功与否标记，服务器断开标记
    bool is_init_ok;

    // socket文件描述符
    int socket_fd;

    // 存放数据：HEAD + DATA + END
    std::vector<uint8_t> buf_bytes;

    // 把障碍物检测结果和实时点云推送到buf
    void obstacle_map_to_buffer(cv::Mat& obstacle);
    void pointcloud_to_buffer(const AKTOF::point_array& points, cv::Mat& obstacle);

};

}

#endif
