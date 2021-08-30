#include "thread_pool.h"

namespace NS_THREAD_POOL {

void ThreadPool::init(int thread_size)
{
    // 不超过最大线程数
    int thread_size_temp;
    if (thread_size > MAX_NUM_THREADS) {
        thread_size_temp = MAX_NUM_THREADS;
    } else {
        thread_size_temp = thread_size;
    }

    is_stop = false;
    unfinished_task_num = 0;

    // 根据初始化数值创建线程
    for (int i(0); i < thread_size_temp; i++) {
        threads_vector.push_back(new std::thread(std::bind(&NS_THREAD_POOL::ThreadPool::thread_task_handle, this)));
    }
    
}

ThreadPool::~ThreadPool()
{
    // 若析构前已stop，则无需任务操作
    if (!is_stop) {     
        stop();
    }
}

bool ThreadPool::is_working()
{
    if (unfinished_task_num > 0) {
        return true;
    }
    return false;
}

void ThreadPool::stop()
{
    {
        std::unique_lock<std::mutex> lock(mutex_add_task);
        is_stop = true;
        condition_add_task.notify_all();
    }

    for (auto it = threads_vector.begin(); it != threads_vector.end(); ++it) {
        // TODO:若有任务死循环，则无法正常终止该线程池
        (*it)->join();
        delete *it;
    }
    threads_vector.clear();
}

bool ThreadPool::add_task(const task_func& task)
{
    std::unique_lock<std::mutex> lock(mutex_add_task);
    // 若低于最大任务数量，则添加到任务缓存列表中
    if (tasks_cache.size() <= MAX_NUM_TASKS) {
        tasks_cache.push_back(task);
        unfinished_task_num++;
        condition_add_task.notify_one();
        return true;
    }
    return false;
}

task_func ThreadPool::get_task()
{
    task_func temp;
    std::unique_lock<std::mutex> lock(mutex_add_task);

    // 等待任务
    while (tasks_cache.empty()) {
        condition_add_task.wait(lock);
        if (!is_stop) {     // 若是stop信号，则直接退出
            return temp;
        }
    }

    // 取任务
    temp = tasks_cache.front();
    tasks_cache.pop_front();

    return temp;
}

void ThreadPool::thread_task_handle()
{
    while (!is_stop) {
        task_func task_handle;
        task_handle = get_task();  // 若任务缓存中存在任务，则取出并执行，否则阻塞等待新任务
        if (task_handle != nullptr) {
            task_handle();
            unfinished_task_num--;
        }
    }

}

}
