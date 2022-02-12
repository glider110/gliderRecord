# 常用代码段

> ***代码复用,避免重复造轮子;***



**1.int 和 string互换**

```c++
std::string perfect = std::to_string(1+2+4+7+14) + " is a perfect number";  
std::string str = "123";
int n = atoi(str.c_str());
```

**2.初始化形式**

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

**3.读取config文件**



**4.保存log文件**

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

- **初始化方式**

```c++
// 初始化pcl相关变量
original_points.reset(new pcl::PointCloud<pcl::PointXYZ>());
```

- **调试分析**

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

- **析构方式**

```c++
void AKBmsService::destroy()
{
    delete this;
}
```

- **耗时统计**

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

- 只获取第一次数据


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

- 数据交互


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

- 文件名获取数字

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

