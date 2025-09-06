SROS参考写法:
```
            if ((collide_poses[0].pose - collide_poses[1].pose).head<2>().norm() > para_->deviation_dist_thresh) 
```



地面提取

```c++
void differenceNormalsSegmentation(const pcl::PointCloud<pcl::PointXYZ>::Ptr in_cloud_ptr,
                                   pcl::PointCloud<pcl::PointXYZ>::Ptr out_cloud_ptr)
{
  float small_scale = 0.5;
  float large_scale = 2.0;
  float angle_threshold = 0.5;
  pcl::search::Search<pcl::PointXYZ>::Ptr tree;
  if (in_cloud_ptr->isOrganized())
  {
    tree.reset(new pcl::search::OrganizedNeighbor<pcl::PointXYZ>());
  } else
  {
    tree.reset(new pcl::search::KdTree<pcl::PointXYZ>(false));
  }

  // Set the input pointcloud for the search tree
  tree->setInputCloud(in_cloud_ptr);

  pcl::NormalEstimationOMP<pcl::PointXYZ, pcl::PointNormal> normal_estimation;
  // pcl::gpu::NormalEstimation<pcl::PointXYZ, pcl::PointNormal> normal_estimation;
  normal_estimation.setInputCloud(in_cloud_ptr);
  normal_estimation.setSearchMethod(tree);

  normal_estimation.setViewPoint(std::numeric_limits<float>::max(), std::numeric_limits<float>::max(),
                                 std::numeric_limits<float>::max());

  pcl::PointCloud<pcl::PointNormal>::Ptr normals_small_scale(new pcl::PointCloud<pcl::PointNormal>);
  pcl::PointCloud<pcl::PointNormal>::Ptr normals_large_scale(new pcl::PointCloud<pcl::PointNormal>);

  normal_estimation.setRadiusSearch(small_scale);
  normal_estimation.compute(*normals_small_scale);

  normal_estimation.setRadiusSearch(large_scale);
  normal_estimation.compute(*normals_large_scale);

  pcl::PointCloud<pcl::PointNormal>::Ptr diffnormals_cloud(new pcl::PointCloud<pcl::PointNormal>);
  pcl::copyPointCloud<pcl::PointXYZ, pcl::PointNormal>(*in_cloud_ptr, *diffnormals_cloud);

  // Create DoN operator
  pcl::DifferenceOfNormalsEstimation<pcl::PointXYZ, pcl::PointNormal, pcl::PointNormal> diffnormals_estimator;
  diffnormals_estimator.setInputCloud(in_cloud_ptr);
  diffnormals_estimator.setNormalScaleLarge(normals_large_scale);
  diffnormals_estimator.setNormalScaleSmall(normals_small_scale);

  diffnormals_estimator.initCompute();

  diffnormals_estimator.computeFeature(*diffnormals_cloud);

  pcl::ConditionOr<pcl::PointNormal>::Ptr range_cond(new pcl::ConditionOr<pcl::PointNormal>());
  range_cond->addComparison(pcl::FieldComparison<pcl::PointNormal>::ConstPtr(
    new pcl::FieldComparison<pcl::PointNormal>("curvature", pcl::ComparisonOps::GT, angle_threshold)));
  // Build the filter
  pcl::ConditionalRemoval<pcl::PointNormal> cond_removal;
  cond_removal.setCondition(range_cond);
  cond_removal.setInputCloud(diffnormals_cloud);

  pcl::PointCloud<pcl::PointNormal>::Ptr diffnormals_cloud_filtered(new pcl::PointCloud<pcl::PointNormal>);

  // Apply filter
  cond_removal.filter(*diffnormals_cloud_filtered);

  pcl::copyPointCloud<pcl::PointNormal, pcl::PointXYZ>(*diffnormals_cloud_filtered, *out_cloud_ptr);
}

```

```
Eigen::Vector3d curr_pose;
 curr_pose.head<2>() = unit_vector * curr_length + info->start_point;
```







### gtest实战

成员函数的test

```c++
// Copyright 2024 Standard Robots Co. All rights reserved.
#include <glog/logging.h>
#include <gtest/gtest.h>
#include <filesystem>
#include <thread>
#include "modules/navigation/avoid_oba/particle_info_msg.hpp"
#include "modules/navigation/collide_result_recorder.h"

namespace fs = std::filesystem;

// 测试夹具，用于设置和清理测试环境
class CollideResultRecorderTest : public ::testing::Test {
protected:
    CollideResultRecorder recorder;
    std::string directory = COLLIDE_RESULT_RECORDER_DIR;  // 从类定义中获取目录常量

    void SetUp() override {
        // 确保测试开始前目录是空的
        if (fs::exists(directory)) {
            fs::remove_all(directory);
        }
    }

    void TearDown() override {
        // 测试结束后清理创建的文件和目录
        if (fs::exists(directory)) {
            fs::remove_all(directory);
        }
    }
};

// 测试写入功能
TEST_F(CollideResultRecorderTest, WritesDataToDirectory) {
    avoidoba::CollideResultInfo info;
    // 模拟一些碰撞区域数据
    info.collide_region_border.push_back({{1, 2, 3}, {4, 5, 6, 7}});
    info.collide_region_border.push_back({{2, 3, 4}, {5, 6, 7, 8}});

    // 记录碰撞结果
    recorder.record(std::make_shared<avoidoba::CollideResultInfo>(info));
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));

    // 检查目录是否被创建
    ASSERT_TRUE(fs::exists(directory));
    // 检查目录中是否有文件
    bool has_files = false;
    for (const auto& entry : fs::directory_iterator(directory)) {
        if (entry.is_regular_file()) {
            has_files = true;
            break;
        }
    }
    ASSERT_TRUE(has_files);
}

int main(int argc, char **argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}

```

