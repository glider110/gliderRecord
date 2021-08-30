#ifndef COMMON_H_
#define COMMON_H_


#include <string>
#include <pcl/common/common_headers.h>

namespace NS_COMMON {

class Common
{
public:
    void write_ply(const pcl::PointCloud<pcl::PointXYZ>::Ptr cloud,std::string file_name);
};

} // namespace NS_COMMON

#endif