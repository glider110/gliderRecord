#include "time_manage.h"

namespace NS_TIME_MANAGE {

void TimeManage::reset()
{
    struct timespec time_temp;
    clock_gettime(CLOCK_MONOTONIC, &time_temp);
    size_t current_timestamp = time_temp.tv_sec * (size_t)1000000000 + time_temp.tv_nsec;
    begin_timestamp_us = current_timestamp / (size_t)1000;
}

size_t TimeManage::duration_us()
{
    struct timespec time_temp;
    clock_gettime(CLOCK_MONOTONIC, &time_temp);
    size_t end_timestamp = time_temp.tv_sec * (size_t)1000000000 + time_temp.tv_nsec;
    duration = end_timestamp / (size_t)1000 - begin_timestamp_us;
    return duration;
}

size_t TimeManage::reset_us()
{
    size_t duration_temp;
    duration_temp = duration_us();
    reset();
    return duration_temp;
}

}