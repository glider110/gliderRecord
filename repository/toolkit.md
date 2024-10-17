ffmpeg -i 华为o车.webm -r 1 image-%3d.jpeg 



**封面裁剪**

ffmpeg -i jia.mp4 -r 1 image-%3d.jpeg 

**视频裁剪**

ffmpeg -i output.mp4 -f segment -segment_time 10 -c copy -reset_timestamps 1 output%03d.mp4