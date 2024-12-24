ffmpeg -i 华为o车.webm -r 1 image-%3d.jpeg 

**封面裁剪**

ffmpeg -i jia.mp4 -r 1 image-%3d.jpeg 

**视频裁剪**

ffmpeg -i output.mp4 -f segment -segment_time 10 -c copy -reset_timestamps 1 output%03d.mp4#ffmpeg
#视频语音提取
ffmpeg -i 20240603_165541.mp4 -vn -acodec libmp3lame -ab 128k output_audio.mp3
#封面裁剪
ffmpeg -i jia.mp4 -r 1 image-%3d.jpeg 
#视频裁剪
ffmpeg -i output.mp4 -f segment -segment_time 10 -c copy -reset_timestamps 1 output%03d.mp4