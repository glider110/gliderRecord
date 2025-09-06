# 常用代码段

> ***代码复用,避免重复造轮子;***

#### 1.int 和 string互换

```c++
std::string perfect = std::to_string(1+2+4+7+14) + " is a perfect number";  
std::string str = "123";
int n = atoi(str.c_str());
```

#### 2.初始化形式

```c++
void AKBMSDetector::initialize(const string &bms_config_file, ofstream &log)
{ 
     tofLog = &log;
	 load_config(bms_config_file);
     AKWIRE::load_wireDetector_config(wireParams, bms_config_file);
     AKBGModel::load_config(bms_config_file, calibParam);
    detector = AKWIRE::WireDetector(wireParams, log);
   *tofLog << LOGPREFIX << " wire detector initialization completed " << endl;
    calibrator = shared_ptr<AKBGModel::BgCalibrator>(new AKBGModel::BgCalibrator(calibParam, log));
	thread_pool.init(5);
  	key_monitor.init();
    blanket_detect.init("/usr/akb/config/aktof.yaml");
}
```

#### 3.**读取config文件**



#### 4.保存log文件

```c++
if (m_config.saveRobotPose)
{
    ofstream poseLog;
    poseLog.open(m_config.saveRobotPosePath, ios::app);
    string data;
    data += to_string(pose_data.timestamp) + ",";
    data += to_string(pose_data.x) + ",";
    data += to_string(pose_data.y) + ",";
    data += to_string(pose_data.theta);
    poseLog << data << endl;
    poseLog.close();
}
```

#### 5.初始化方式

```c++
// 初始化pcl相关变量
original_points.reset(new pcl::PointCloud<pcl::PointXYZ>());
```

#### 6.调试分析

```c++
static int count = 0;
static uint64_t time_total = 0;
if (count < 30) {
    count++;
    time_total += time_diff;
} 
else
{
    cout << "####################### bms time = " << current_timestamp << "  time_diff = "<< time_total/count << " ######################" << endl;
	time_total = 0;
	count = 0;
    
ount++;
if((count % 40 ) == 1)
// if(count== 100)
{
    cv::imwrite("/tmp/lenna_gray====" + std::to_string(mEnqueueSMSBuf.timestamp)  + ".jpg", mRawGrayImg);
}
```

#### 7.析构方式

```c++
void AKBmsService::destroy()
{
    delete this;
}
```

#### 8.耗时统计

```c
uint64_t current_timestamp = getCurrentTime1970msec();
uint64_t time_diff = current_timestamp - timestamp;
timestamp = current_timestamp;

auto t11 = std::chrono::steady_clock::now();
calcOpticalFlowFarneback(Imgahead_downsample, Imgback_downsample, m_flow, 0.5, 3, 15, 3, 5, 1.2, 0);    //1280*720 耗时接近5s
auto t22 = std::chrono::steady_clock::now();
cout << "<======= opticalflow3 time "<< std::chrono::duration_cast<std::chrono::microseconds>(t22 - t11).count()/1000<< " ms" << endl;

std::this_thread::sleep_for(std::chrono::milliseconds(100));
```

#### 9.只获取第一次数据


```c++

for (size_t i = 0; i < imagePathList.size(); i++)
        {
            std::cout << imagePathList[i] << "DDDDD\n";
            if(isFrist == true)
            {
                std::cout  << "DDDDDDDDDDDDDDDDD\n";
                auto last_image = cv::imread(imagePathList[i], CV_LOAD_IMAGE_COLOR);
                isFrist = false;
            }
```

#### 10.数据交互


```c++
1.读取csv文件
getline("/home/admins/opticl/12.24.2/pose_fusion/fusionpose_file.csv",line); 
while (getline(fp,line)){
    vector<float> data_line;
    string number;
    istringstream readstr(line); //string数据流化
    for(int j = 0;j < 11;j++){ 
        getline(readstr,number,','); //循环读取数据
        data_line.push_back(atof(number.c_str())); 
    }
}
```

#### 11.文件名获取数字

```c++
void NS_SKIDDETECTION::SkidDetecsteady_clocktion::load_img()
{
    Mat img;
    cv::glob(m_folder, filenames); 
    for (size_t i = 0; i < filenames.size(); ++i)
    {
        vector<string> v1,v;
        STR_IMG tmp;
        // cout << filenames[i] << endl;
        img = imread(filenames[i]);
        Rect roi(0, 0, 640,360); 
        tmp.imag.create(img(roi).rows, img(roi).cols, CV_8UC1);
        cvtColor(img(roi), tmp.imag, CV_RGB2GRAY); 
        SplitString(filenames[i], v1, ".jpg");
        // cout << v1[0]<< endl;
        SplitString(v1[0],  v,  "/");
        tmp.timestamp= atof(v[v.size() - 1].c_str());
        m_origin_img.push_back(tmp);
        // cout << tmp.timestamp<< endl;
    }
}   
```

#### 12.同步线程类设计模式

```c++
    public:
        void init(queue<AK::PoseData> &pose_data, queue<FrameBufQueue> &frame_bufqueue)
        {
            this->pose_data_ = pose_data;
            this->frame_bufqueue_ =  frame_bufqueue;
            // 初始化变量
            is_start = false;
            // 单独启动线程
            thread_detect_handle = std::thread(&SlipDetectionInterface::thread_detect, this);
            thread_detect_handle.detach();
        }
        
        void start()
        {
            is_start = true;
        }
        void stop()
        {
            is_start = false;
        }
        void get_flag(SkidData& output)
        {
            std::lock_guard<std::mutex> lock(mutex_data);
            output = result;
        }
    private:
        std::thread thread_detect_handle;
        std::atomic<bool> is_start;
        std::mutex mutex_data;
        SkidData result;
        void thread_detect()
        {
            bool is_frist = true;
            FrameBufQueue imgbuffer_ahead, imgbuffer_back;
            AK::PoseData pose_ahead, pose_back;

           while (true)
            {       
                SkidData temp;
                if(is_start)
                {
                    // 核心算法
                }
                else
                {
                      usleep(50*1000);
                }
```

#### **13.数组本质指针常量,不能赋值**

```c++
if (mCamRawDataSmsQueue.dequeue(&mEnqueueSMSBuf))
{

    if (mEnqueueSMSBuf.timestamp > lastTimeStamp2)
    {
        {
            std::unique_lock<std::mutex> lock(mMutexPMSdata_camera);
            if (frameQueue.size() >= mMaxCamDataQueueSize)
                frameQueue.pop();
            frameQueue.push(mEnqueueSMSBuf);
            lastTimeStamp2 = mEnqueueSMSBuf.timestamp;
        }
        {
            std::unique_lock<std::mutex> lock(mcamDataMutex);
            cam_data->timestamp = mEnqueueSMSBuf.timestamp;
            memcpy(cam_data->buffer, mEnqueueSMSBuf.buffer, sizeof(mEnqueueSMSBuf.buffer));          //通过拷贝地址内存来实现
            cam_data->length = mEnqueueSMSBuf.length;

        }
    }
}
```

#### 14.获取文件名含有的时间戳

```c
SplitString(filenames[i], v1, ".jpg");
SplitString(v1[0],  v,  "/");
tmp.timestamp= atof(v[v.size() - 1].c_str());
```

#### 15.数组转mat取巧

```c
cv::Mat disp8 = cv::Mat(height, width, CV_8UC1);
for (sint32 i = 0; i < height; i++)
{
for (sint32 j = 0; j < width; j++)
{
// disp8.data[i * width + j]= disparity[i * width + j];
disp8.at<uint8_t>(i,j)= disparity[i * width + j];
}
}
```

#### **16.关于sleep**

```c
sleep() 秒  对应的头文件 #include <unistd.h>
usleep() 微秒
Sleep() window写法
 代表开始堵塞,代码挂起
```

#### 17.强枚举

```c
enum class DestructorAction {join, detach};
```

#### 18.保存mat→csv

```c++
ofstream myfile;
string filename = "/tmp/hmat.csv";
myfile.open(filename.c_str());
myfile << cv::format(ptMat, cv::Formatter::FMT_CSV) << std::endl;
 myfile.close();
```

#### 19.关键词修饰函数

```c++
  virtual bool Run(void) = 0;
  bool Run(void) override;
  bool Run(void) final;
  bool Run(void) const;
```

#### **20.vecter转mat**

```c++
cv::Mat slam_map_gray(cv::Size(mCarMap.map_param.width, mCarMap.map_param.height), CV_8UC1, &mCarMap.map[0]);
```

21.







#### 其他:

- inline 内联 。内联函数，顾名思义就是将编译代码和其它代码 “内联” 起来了。使用相应的函数代码替换函数调用。
- **[static](https://www.runoob.com/cplusplus/cpp-storage-classes.html)** 存储类指示编译器在程序的生命周期内保持局部变量的存在，而不需要在每次它进入和离开作用域时进行创建和销毁。
- **[extern](https://www.runoob.com/cplusplus/cpp-storage-classes.html)** 存储类用于提供一个全局变量的引用，全局变量对所有的程序文件都是可见的
- [**const**](https://www.cnblogs.com/narjaja/p/9300525.html)   修饰常量 修饰函数参数 修饰返回值 修饰函数
- c++ 对象: 右值(纯右值 字面量 将亡值 lamda表达式)
- [**static**](https://blog.csdn.net/lms1008611/article/details/81408236?spm=1001.2101.3001.6650.2&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2-81408236-blog-123122434.pc_relevant_default&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2-81408236-blog-123122434.pc_relevant_default&utm_relevant_index=5)关键词:类名调用 不在对象的生命周期在程序的生命周期 类外初始化 **只初始化一次**

###### 

