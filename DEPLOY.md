 Docsify 部署指南

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 启动本地服务器

```bash
npm run dev
```

访问 http://localhost:3000 预览网站。

## 手动部署到 GitHub Pages

### 方式一：使用 GitHub 仓库设置（推荐）

1. **确保所有文件已提交到 master 分支**
   
   ```bash
   git add .
   git commit -m "Update documentation"
   git push origin master
   ```

2. **在 GitHub 仓库中配置 GitHub Pages**
   
   - 进入你的仓库: https://github.com/glider110/gliderRecord
   - 点击 **Settings** (设置)
   - 在左侧菜单找到 **Pages**
   - 在 **Source** 部分选择:
     - Branch: `master`
     - Folder: `/ (root)`
   - 点击 **Save** (保存)

3. **等待部署完成**
   
   - GitHub 会自动部署，通常需要 1-2 分钟
   - 部署完成后，访问: https://glider110.github.io/gliderRecord/

### 方式二：使用 gh-pages 分支

如果你想使用独立的分支来部署，可以安装 `gh-pages` 包：

```bash
npm install --save-dev gh-pages
```

然后在 `package.json` 中添加部署脚本：

```json
"scripts": {
  "deploy": "gh-pages -d ."
}
```

部署命令：

```bash
npm run deploy
```

## 文件说明

- **index.html** - Docsify 主配置文件
- **_sidebar.md** - 侧边栏导航（基于 SUMMARY.md）
- **SUMMARY.md** - 原始目录结构
- **.nojekyll** - 告诉 GitHub Pages 不使用 Jekyll 处理
- **package.json** - npm 配置和脚本
- **.gitignore** - Git 忽略文件配置

## 更新文档

1. 编辑 Markdown 文件
2. 本地预览确认无误 (`npm run dev`)
3. 提交到 Git
4. 推送到 GitHub
5. GitHub Pages 会自动更新（如果已配置）

## 注意事项

- Docsify 是纯静态网站，不需要构建过程
- 所有 Markdown 文件和资源文件都需要提交到 Git
- 确保 `.nojekyll` 文件存在于根目录
- 图片等资源文件使用相对路径引用
- `node_modules/` 已在 `.gitignore` 中，不会提交到仓库

## 故障排查

### 页面 404 或样式丢失

- 检查 GitHub Pages 设置是否正确（分支和目录）
- 确认 `.nojekyll` 文件存在
- 查看 `index.html` 中的路径配置

### 侧边栏不显示

- 确认 `_sidebar.md` 文件存在
- 检查文件中的路径是否正确
- 查看浏览器控制台是否有错误

### 本地预览正常但线上异常

- 检查文件路径大小写（GitHub Pages 对大小写敏感）
- 确认所有引用的文件都已提交
- 查看 GitHub Actions 或 Pages 构建日志
