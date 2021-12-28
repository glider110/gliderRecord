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



```c
    // 初始化pcl相关变量
    original_points.reset(new pcl::PointCloud<pcl::PointXYZ>());
```

