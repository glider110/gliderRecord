反复定位到这句有问题:

```c++
common::Deque<data_type::OdometryData> UnsyncedDataQueue = odom_map.at("odom")->GetData();
```

上周一起定位在dosc.cc文件两处加锁:

```c++
std::unordered_map<std::string,std::shared_ptr<data_processor::Odom>> DataDispatch::GetAllOdomData(void) {
  std::lock_guard<std::mutex> locker(odom_data_group_mutex_);
  return odom_data_group_;
}
```

```c++
void DataDispatch::AddSensorData(const std::string &sensor_id, 
	const data_type::OdometryData &odom_data) {
  if(odom_data_group_.find(sensor_id) == odom_data_group_.end()) {
		auto odom = std::make_shared<data_processor::Odom>(sensor_id,odom_data_deque_len_);
		 odom_data_group_[sensor_id] = odom;
  }
 {
  std::lock_guard<std::mutex> locker(odom_data_group_mutex_);
  odom_data_group_[sensor_id]->AddData(odom_data);
 }
  std::lock_guard<std::mutex> locker(odom_data_mutex_);
  odom_data_ = odom_data;
  OdomRecv.Trigger();
}
```

我认为实际加锁是不成功的,因为加锁的是 `std::unordered_map<std::string,std::shared_ptr<data_processor::Odom>>` ,实际操作的map中的`std::shared_ptr<data_processor::Odom>`中的deque还是没有锁住;

后续我在odom.h文件加锁,直接锁住**`common::Deque<data_type::OdometryData> odom_`**

![image-20220726172930699](cartographer (copy).assets/image-20220726172930699.png)

后跑机,出现这个提示(sensor确定开启),测试是这个锁影响到激光数据

![image-20220726173006565](cartographer (copy).assets/image-20220726173006565.png)
