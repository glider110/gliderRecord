#include "key_monitor.h"

namespace NS_KEY_MONITOR {

void KeyMonitor::init()
{
    // 终端配置
    tcgetattr( 0, &initial_settings );

    new_settings = initial_settings;

    new_settings.c_lflag &= ~ICANON;

    new_settings.c_lflag &= ~ECHO;

    new_settings.c_lflag &= ~ISIG;

    new_settings.c_cc[VMIN] = 1;

    new_settings.c_cc[VTIME] = 0;

    tcsetattr( 0, TCSANOW, &new_settings );

    // 后台启动
    thread_key_detect = std::thread(std::bind(&NS_KEY_MONITOR::KeyMonitor::key_detect_handle,this));
    thread_key_detect.detach();
}


bool KeyMonitor::get_monitor(char letter)
{
    std::lock_guard<std::mutex> lock(mutex_letter);
    if (letter_detected == letter) {
        letter_detected = 0;
        return true;
    }
    return false;
}

void KeyMonitor::key_detect_handle()
{
    char temp_letter;
    int nread;

    while (temp_letter != ESC_ASCII) {
        new_settings.c_cc[VMIN] = 0;
        tcsetattr(0, TCSANOW, &new_settings );

        nread = read(0, &temp_letter, 1);

        new_settings.c_cc[VMIN] = 1;

        tcsetattr(0, TCSANOW, &new_settings);

        // 检测到按键
        if (nread == 1) {
            std::lock_guard<std::mutex> lock(mutex_letter);
            letter_detected = temp_letter;
        }

    }

}

}