简易的命令行入门教程:

Git 全局设置:

```
git config --global user.name "郭小凡"
git config --global user.email "glider.guo@ankobot.com"
```

生成秘钥放在远程服务器 免密登录：
```
ssh-keygen -t rsa -C "glider.guo@ankobot.com"
cat id_rsa.pub 
```


创建 git 仓库:

```
mkdir pcl_library
cd pcl_library
git init
touch README.md
git add README.md
git commit -m "first commit"
git remote add origin git@gitee.com:aktof/pcl_library.git
git push -u origin master
```

#### 已有仓库

```
cd existing_git_repo
git remote add origin git@gitee.com:aktof/pcl_library.git
git push -u origin master
```

![image-20210913110754055](git.assets/image-20210913110754055.png)



#### [Git回滚代码到某个commit](https://www.cnblogs.com/hukuangjie/p/11369434.html)

```shell
回退命令：

$ git reset --hard HEAD^ 回退到上个版本
$ git reset --hard HEAD~3 回退到前3次提交之前，以此类推，回退到n次提交之前
$ git reset --hard commit_id 退到/进到 指定commit的sha码
```

#### [查看log](https://blog.csdn.net/chenpuzhen/article/details/92084229?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-2.no_search_link)

```shell
$ git log
$ git reflog
$ git diff   查看修改但没有commit的内容
```

