#ifndef TIME_MANAGE_H_
#define TIME_MANAGE_H_

#ifdef __cplusplus
extern "C" {
#endif

#include <time.h>

#ifdef __cplusplus
}
#endif

namespace NS_TIME_MANAGE {
class TimeManage
{
public:
    TimeManage() : begin_timestamp_us(0), duration(0) {
        reset();
    }
    // 复位计时器
    void reset();
    // 获取计时时间，单位us，不复位
    size_t duration_us();
    // 获取计时时间，单位us，并且复位
    size_t reset_us();

private:
    size_t begin_timestamp_us;
    size_t duration;
};

}

#endif
