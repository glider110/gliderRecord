# 工程代码bug汇总

- 调试技巧：打印中间变量


```c++
   // TODO: 存在显示闪退bug 定位到下面这句函数
    // aktof.ExtractObstacles(convIrImg, clusters, output_grid, isRotation);
    aktof.ExtractObstacles(convIrImg, clusters, output_grid_generalobs,
                           isRotation);
    output_grid_generalobs.timestamp = tmp_tof_data.timestamp;
    output_grid = output_grid_generalobs;
    int count_c = 0;
    for (size_t i = 0; i < 100; ++i)
        {
            for (size_t j = 0; j < 100; ++j)
            {
                if (output_grid_generalobs.grid[i][j].type != 0)count_c++;
            }
        }   
    std::cout<<"CHW::count_c = "<<count_c<<std::endl;
```

- 调试技巧：实时输出难以观观察 追加到txt文件分析
- 







