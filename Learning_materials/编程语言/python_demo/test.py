import cv2
import numpy
# import pylab
import matplotlib.pyplot as plt


# 读取一张400x600分辨率的图像
img = cv2.imread('obsMap.bmp')
print(img.shape)
print(type(img))
#创建窗口并显示图像
# cv2.namedWindow("Image")
# cv2.imshow("Image",img)
# cv2.waitKey(0)
# #释放窗口
# cv2.destroyAllWindows()



# import cv2

# # 读取一张400x600分辨率的图像
# color_img = cv2.imread('test_400x600.jpg')
# print(color_img.shape)

# # 直接读取单通道
# gray_img = cv2.imread('test_400x600.jpg', cv2.IMREAD_GRAYSCALE)
# print(gray_img.shape)


#!/usr/bin/env python 
# import cv2
# import numpy as np 
# import math
# point3s=np.array(([-3.42315, -1.69773, -0.340899],[-3.76219, -1.10685, -0.341598],[-4.15474, -1.106, -1.40024],[-3.14925, -1.54094, -1.06652],[-4.15474, -1.106, -1.40024],[-3.14925, -1.54094, -1.06652]),dtype=np.double)
# point2s=np.array(([494, 89],[1028, 118],[1074, 754],[505, 764],[1074, 754],[505, 764]),dtype=np.double)

# camera=np.array(([ 1.8662051087073896e+03, 0, 9.6197416454354118e+02],[0,1.8907532330116028e+03, 6.8753441160022533e+02],[0,0,1]),dtype=np.double)
# dist=np.array(([-5.7021027699312055e-01, 5.3788676876655150e-01,-1.3317400379136706e-02, 9.6858782674096261e-04,-5.2633103189649655e-01]),dtype=np.double)
# #dist=dist.T
# #dist=np.zeros((5,1))
# found,r,t=cv2.solvePnP(point3s,point2s,camera,dist) #计算雷达相机外参,r-旋转向量，t-平移向量
# R=cv2.Rodrigues(r)[0] #旋转向量转旋转矩阵
# camera_position=-np.matrix(R).T*np.matrix(t) #相机位置

# d3=np.array([[-3.14925, -1.54094, -1.06652]])
# d2,_=cv2.projectPoints(d3,r,t,camera,dist)#重投影验证
# print(r)
# print(R)
# print(t)
# print(d2)






# print(img.shape)
# retval, corners = cv2.findChessboardCorners(img, (8, 4))

# criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

# corners2 = cv2.cornerSubPix(img, corners, (5, 5), (-1, -1), criteria)
# plt.figure() 
# plt.imshow(img) 

# import cv2
# import numpy
# import pylab
# import matplotlib.pyplot as plt
# img = cv2.imread("/home/admins/workspace_log8.20/workspace_116310103/irImg_raw111.bmp",cv2.IMREAD_GRAYSCALE)
plt.figure()
plt.imshow(img)
plt.show()

