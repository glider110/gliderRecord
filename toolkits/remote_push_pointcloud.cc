#include "remote_push_pointcloud.h"
#include <iostream>

namespace NS_REMOTE_PUSH_POINTS {

bool RemotePushPointCloud::remote_push(std::string ip, const AKTOF::point_array& points, cv::Mat& obstacle)
{
    if (!is_init_ok) {

        socket_fd = socket(AF_INET, SOCK_STREAM, 0);
        struct sockaddr_in server_addr;
        memset(&server_addr, 0, sizeof(server_addr));
        server_addr.sin_family = AF_INET;
        server_addr.sin_port = htons(MYPORT);
        server_addr.sin_addr.s_addr = inet_addr(ip.c_str());

        if (connect(socket_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) < 0) {
            return false;
        }

        is_init_ok = true;
    }

    if (is_init_ok) {
        buf_bytes.clear();
        pointcloud_to_buffer(points, obstacle);
        int ret = send(socket_fd, &buf_bytes[0], buf_bytes.size()*sizeof(uint8_t), 0);
        if (errno == EAGAIN) {
            // 缓冲区已满
        }

        if(errno == EPIPE) {    // 服务器断开，需重新连接
            is_init_ok = false;
            return false;
        }
        
    }

    return true;
    
}

void RemotePushPointCloud::pointcloud_to_buffer(const AKTOF::point_array& points, cv::Mat& obstacle)
{
    int16_t temp = 0;
    // 用于暂存int16的变量的第一和第二个字节
    uint8_t first_byte,second_byte;

    // 增加帧开始标志
    buf_bytes.push_back(MACRO_HEAD_ONE);
    buf_bytes.push_back(MACRO_HEAD_TWO);

    // 推送点云
    for (int i = 0; i < MACRO_POINTS_SIZE; ++i) {
        
        temp = static_cast<int16_t>(points.point_coord[i].x * 1000);
        first_byte = temp & 0xff;
        buf_bytes.push_back(first_byte);
        second_byte = (temp >> 8) & 0xff;
        buf_bytes.push_back(second_byte);

        temp = static_cast<int16_t>(points.point_coord[i].y * 1000);
        first_byte = temp & 0xff;
        buf_bytes.push_back(first_byte);
        second_byte = (temp >> 8) & 0xff;
        buf_bytes.push_back(second_byte);

        temp = static_cast<int16_t>(points.point_coord[i].z * 1000);
        first_byte = temp & 0xff;
        buf_bytes.push_back(first_byte);
        second_byte = (temp >> 8) & 0xff;
        buf_bytes.push_back(second_byte);

    }

    // 推送障碍物矩阵
    obstacle_map_to_buffer(obstacle);

    // 添加帧结束标志
    buf_bytes.push_back(MACRO_END_ONE);
    buf_bytes.push_back(MACRO_END_TWO);
    // std::cout<<"CHW:buf转换完毕 buf_bytes.size "<<buf_bytes.size()<<std::endl;
    
}

void RemotePushPointCloud::obstacle_map_to_buffer(cv::Mat& obstacle)
{
    cv::Vec3b low_obstacle_color(0x00, 0x00, 0xFF);     // 红色
    cv::Vec3b trap_obstacle_color(0xCC, 0x33, 0xFF);    // 粉色
    cv::Vec3b high_obstacle_color(0xFF, 0x00, 0x00);    // 蓝色
    cv::Vec3b very_low_obstacle_color(0xFF, 0xFF, 0xCC);  // 浅青色
    cv::Vec3b blanket_obstacle_color(0x00, 0xFF, 0x00); // 绿色
    
    for (uint8_t row = 0; row < 100; row++) {
        for (uint8_t col = 0; col < 100; col++) {
            uint8_t color_type = 0;
            if (obstacle.at<cv::Vec3b>(row, col) == low_obstacle_color) {
                color_type = LOW_OBSTACLE;
            }
            if (obstacle.at<cv::Vec3b>(row, col) == trap_obstacle_color) {
                color_type = TRAP_OBSTACLE;
            }
            if (obstacle.at<cv::Vec3b>(row, col) == high_obstacle_color) {
                color_type = HIGH_OBSTACLE;
            }
            if (obstacle.at<cv::Vec3b>(row, col) == very_low_obstacle_color) {
                color_type = VERY_LOW_OBSTACLE;
            }
            if (obstacle.at<cv::Vec3b>(row, col) == blanket_obstacle_color) {
                color_type = BLANKET_OBSTACLE;
            }
            buf_bytes.push_back(color_type);
        }
    }

}

}
