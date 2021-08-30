#ifndef THREAD_POOL_H__
#define THREAD_POOL_H__

#include <vector>
#include <list>
#include <functional>
#include <mutex>
#include <thread>
#include <condition_variable>
#include <atomic>
#include <iostream>

#define MAX_NUM_THREADS (6)         // 默认最大线程数
#define MAX_NUM_TASKS   (10)        // 默认最大缓存任务数

namespace NS_THREAD_POOL {

typedef std::function<void()> task_func;
/**
 * 最好用于处理非循环的一次性任务
*/
class ThreadPool
{
public:
    void init(int thread_size = 5);
    ~ThreadPool();
    bool add_task(const task_func&);        // 添加任务到队列中，当任务队列中已满返回false
    void stop();                            // 终止所有任务，用于退出时释放资源
    bool is_working();

private:
    std::vector<std::thread*> threads_vector;
    std::atomic<unsigned char> unfinished_task_num;   // 当前工作的线程数量

    std::list<task_func> tasks_cache;      // task缓存列表
    std::atomic<bool> is_stop;             // 终止线程池，释放资源
    std::mutex mutex_add_task;          
    std::condition_variable condition_add_task;

    void thread_task_handle();
    task_func get_task();

};

}

#endif
