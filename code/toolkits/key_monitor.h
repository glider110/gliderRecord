#ifndef KEY_DETECT_H_
#define KEY_DETECT_H_

#ifdef __cplusplus
extern "C" {
#endif

#include <termios.h>
#include <unistd.h>

#ifdef __cplusplus
}
#endif

#include <functional>
#include <thread>
#include <mutex>
#include <atomic>
#include <iostream>
namespace NS_KEY_MONITOR {

#define ESC_ASCII   (27)

class KeyMonitor
{
public:
    // 初始化，并后台启动监测
    void init();
    
    // 用于获取当前是否有对应字符按键触发
    bool get_monitor(char letter);

    ~KeyMonitor() {
        tcsetattr(0, TCSANOW, &initial_settings);
    }

private:
    struct termios initial_settings, new_settings;
    std::thread thread_key_detect;
    std::mutex mutex_letter;

    // 存放检测器检测到的字符
    char letter_detected;

    void key_detect_handle();
};

}


#endif