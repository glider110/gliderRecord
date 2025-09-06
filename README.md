# Glider Record

> **记录之美...**

<img src="README.assets/image-20250901113145179-17566977572521.png" alt="image-20250901113145179" style="zoom:50%;" />

## 📖 个人文档网站

这是一个基于 Jekyll 构建的个人文档网站，用于展示工作记录、知识库和生活管理内容。

### ✨ 内容概览

* **工作记录**: 日常工作记录和项目总结
* **知识库**: 个人书单、读书笔记和技术知识整理
* **生活管理**: 思维模式、理财规划和目标管理

### 🚀 快速部署

#### 方法一：使用部署脚本（推荐）

```bash
# 1. 初始化git仓库（如果还没有）
git init
git add .
git commit -m "初始提交"

# 2. 添加GitHub远程仓库
git remote add origin https://github.com/your-username/48rmw7nb2q.git

# 3. 运行部署脚本
./deploy.sh
```

#### 方法二：手动部署

1. **创建GitHub仓库**
   - 在GitHub上创建名为 `48rmw7nb2q` 的仓库
   - 将代码推送到仓库

2. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - 选择 "Deploy from a branch"
   - 选择 "main" 分支和 "/ (root)" 文件夹

3. **访问网站**
   - 网站地址：`https://your-username.github.io/48rmw7nb2q`

### 🛠️ 本地开发

```bash
# 安装Jekyll（需要Ruby）
gem install jekyll bundler

# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

### 📁 项目结构

```
48rmw7nb2q/
├── _config.yml          # Jekyll配置文件
├── _layouts/            # 页面模板
├── _includes/           # 可重用组件
├── assets/              # 静态资源
├── record/              # 工作记录
├── repository/          # 知识库
├── life_management/     # 生活管理
├── index.md            # 首页
└── deploy.md           # 详细部署说明
```

### 🎨 特色功能

- 📱 响应式设计，支持移动端
- 🖼️ 自动处理图片和静态资源
- 📄 支持PDF文档预览
- 🎨 代码高亮显示
- 🔍 搜索功能（通过浏览器）
- 📊 自动生成目录和导航

### 📚 详细说明

更多部署选项和故障排除，请查看 [deploy.md](deploy.md) 文件。

### 🔧 维护

- 更新内容：直接编辑Markdown文件
- 添加新页面：在对应目录创建.md文件
- 更新样式：修改 `assets/css/style.css`
- 重新部署：运行 `./deploy.sh` 或手动推送代码

---

**开始使用** → 按照上述步骤部署您的个人文档网站！

