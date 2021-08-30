#include "common.h"
#include <pcl/io/ply_io.h>
namespace NS_COMMON {

void Common::write_ply(const pcl::PointCloud<pcl::PointXYZ>::Ptr cloud,std::string file_name)
{
    pcl::PLYWriter writer;
    writer.write(file_name, *cloud, true);
    
}

}