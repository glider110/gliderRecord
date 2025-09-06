# 部署说明

## 方案一：GitHub Pages (推荐)

### 1. 准备工作
1. 在GitHub上创建一个新的仓库，命名为 `48rmw7nb2q`
2. 将本地的所有文件推送到GitHub仓库

### 2. 启用GitHub Pages
1. 进入仓库的 Settings 页面
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "main" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

### 3. 访问网站
- 网站将在 `https://your-username.github.io/48rmw7nb2q` 上可用
- 替换 `your-username` 为您的GitHub用户名

## 方案二：Netlify (备选)

### 1. 准备工作
1. 将代码推送到GitHub仓库
2. 访问 [Netlify](https://netlify.com)

### 2. 部署步骤
1. 点击 "New site from Git"
2. 选择 GitHub 并授权
3. 选择您的仓库
4. 构建设置：
   - Build command: `jekyll build`
   - Publish directory: `_site`
5. 点击 "Deploy site"

### 3. 自定义域名 (可选)
1. 在 Netlify 控制台中，进入 Site settings
2. 在 "Domain management" 中添加自定义域名
3. 按照指示配置DNS

## 方案三：Vercel (备选)

### 1. 准备工作
1. 将代码推送到GitHub仓库
2. 访问 [Vercel](https://vercel.com)

### 2. 部署步骤
1. 点击 "New Project"
2. 导入您的GitHub仓库
3. 框架预设选择 "Other"
4. 构建命令: `jekyll build`
5. 输出目录: `_site`
6. 点击 "Deploy"

## 本地测试

在部署前，您可以在本地测试网站：

```bash
# 安装Jekyll (需要Ruby)
gem install jekyll bundler

# 安装依赖
bundle install

# 启动本地服务器
bundle exec jekyll serve

# 访问 http://localhost:4000
```

## 注意事项

1. **静态资源**: 所有图片、PDF等文件都会自动包含在部署中
2. **路径问题**: 如果图片不显示，检查Markdown文件中的图片路径
3. **更新内容**: 每次推送代码到GitHub，网站会自动更新
4. **自定义域名**: 可以绑定自己的域名，让网站更专业

## 故障排除

### 图片不显示
- 检查图片路径是否正确
- 确保图片文件存在于仓库中
- 路径应该以 `/` 开头

### 构建失败
- 检查 `_config.yml` 语法是否正确
- 确保所有Markdown文件格式正确
- 查看构建日志中的错误信息

### 样式问题
- 检查 `assets/css/style.css` 文件
- 确保CSS路径正确
- 清除浏览器缓存
