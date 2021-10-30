
import cv2
import matplotlib.pyplot as plt 
import numpy as np 

import os 
import sys

import numpy as np
import matplotlib as mpl
import matplotlib.pyplot as plt

# plt.close('all')
# plt.ion()

# filename = str(sys.argv[1]) # "./workspace_log"
# img = cv2.imread(filename,cv2.IMREAD_GRAYSCALE)
# img = cv2.imread("/home/admins/workspace_log8.20/workspace_116310103/irImg_raw111.bmp",cv2.IMREAD_GRAYSCALE)
mip=[239]
for i in range(len(mip)):
    ip=mip[i]
    str_a=str(ip)
    print("**************************************************************")
    print("标定数据："+str(ip))
    img = cv2.imread("/home/admins/data9.17/"+str_a+"-4/irImg_raw111.bmp",cv2.IMREAD_GRAYSCALE)

    print(img.shape)
    retval, corners = cv2.findChessboardCorners(img, (8, 4))

    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 30, 0.001)

    corners2 = cv2.cornerSubPix(img, corners, (5, 5), (-1, -1), criteria)
    plt.figure() 
    plt.imshow(img) 

    plt.plot(corners[:, 0, 0], corners[:, 0, 1], 'ro')
    plt.plot(corners2[:, 0, 0], corners2[:, 0, 1], 'gx')

    # TOF 模组内参, 需要通过程序去读取
    if ip==135:
        global fx, fy,cx,cy
        fx = 206.244
        fy = 206.244
        cx = 108.796
        cy = 86.4599

    if ip==161:
        fx = 207.276
        fy = 207.276
        cx = 111.897
        cy = 80.5297

    if ip==239:
        fx = 206.481
        fy = 206.481
        cx = 110.449
        cy = 85.2038

    cameraMatrix = np.eye(3)
    cameraMatrix[0, 0] = fx
    cameraMatrix[1, 1] = fy
    cameraMatrix[0, 2] = cx
    cameraMatrix[1, 2] = cy
    # 由于读取的图像已经去畸变，可以不考虑模组内参中的畸变参数
    distCoeffs = np.zeros((4, 1))


    # 棋盘格上的个点在世界坐标系中的真实位置
    nX = 8
    nY = 4
    checkerW = 32
    checkerH = 32


    x0 = -4*32+16
    x0 = 0
    y0 = 0
    objPoints = np.zeros((nX*nY, 3), dtype=np.float64)
    cnt = 0

    fig, ax = plt.subplots(1, 1)
    for y in range(nY):
        for x in range(nX):
            objPoints[cnt, 0] = x * checkerW + x0
            objPoints[cnt, 1] = y * checkerH + y0  
            objPoints[cnt, 2] = 0.0

            s = str("{}".format(cnt))
            ax.plot(objPoints[cnt, 0], objPoints[cnt, 1], 'o')
            plt.text(objPoints[cnt, 0], objPoints[cnt, 1], s, fontsize=12)
            cnt += 1
    plt.title("objPoints")
    plt.xlabel("x (mm)")
    plt.ylabel("y (mm)")
    ax.invert_yaxis()

    imgPoints = np.zeros((32, 2), dtype=np.float64)
    fig, ax = plt.subplots(1, 1)
    for i in range(32):
        imgPoints[i, :] = corners2[i, 0, :]
        s = str("{}".format(i))
        ax.plot(imgPoints[i, 0], imgPoints[i, 1], 'o')
        plt.text(imgPoints[i, 0], imgPoints[i, 1], s, fontsize=12)
    plt.title("image corners")
    plt.xlabel("u")
    plt.xlabel("v")
    plt.xlim([0, 224])
    plt.ylim([0, 172])
    ax.invert_yaxis()
    # plt.show() 

    # PNP 求解
    ret, rvec, tvec = cv2.solvePnP(objPoints, imgPoints, cameraMatrix, distCoeffs)
    # result = cv2.solvePnPRansac(objPoints, imgPoints, cameraMatrix, distCoeffs)
    # flag, rvec, tvec, inliers = result
    R = cv2.Rodrigues(rvec)
    Rmat = R[0]
    T = np.eye(4)
    T[:3, :3] = Rmat
    T[:3, 3] = tvec[:, 0]

    # project 3D pts to 2D
    projUV2D = np.zeros((objPoints.shape[0], 2))
    for i in range(objPoints.shape[0]):
        # 3D points in camera coordinates
        pt3D = np.dot(Rmat, objPoints[i, :]) + tvec[:, 0]
        # project to image plane 
        u = fx * pt3D[0] / pt3D[2] + cx
        v = fy * pt3D[1] / pt3D[2] + cy
        projUV2D[i, 0] = u
        projUV2D[i, 1] = v
    plt.figure()
    plt.plot(projUV2D[:, 0], projUV2D[:, 1], 'b.')
    plt.show() 

    pitch = -rvec[0]/np.pi*180
    yaw   = -rvec[1]/np.pi*180
    roll  = -rvec[2]/np.pi*180
    print(" pitch = {}".format(pitch))
    print(" yaw = {}".format(yaw))
    print(" roll = {}".format(roll))
    print(" tvec: \n", tvec)
    print("R: \n", R[0])

