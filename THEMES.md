# 主题使用说明

## 当前配置

你的文档已经配置了 **Docsify 官方主题切换功能**，支持 5 个不同的主题样式。

## 可用主题列表

Docsify 官方提供的主题：

| 主题名称 | 特点 |
|---------|------|
| **Vue** | 默认主题，绿色系，清新简洁 |
| **Buble** | 浅色主题，紫色系，优雅 |
| **Dark** | 暗色主题，护眼，适合夜间阅读 |
| **Pure** | 纯净主题，极简风格 |
| **Dolphin** | 海豚主题，蓝色系 |

## 关于 themes/ 目录

⚠️ **重要说明**：`themes/` 目录中的 CSS 文件（github.css, lapis.css 等）是为 **Typora 编辑器**设计的，不兼容 Docsify。

- Typora 的 CSS 类名和结构与 Docsify 完全不同
- 直接使用会导致样式错乱、布局异常
- 这些文件无法在 Docsify 中正常工作

## 使用方法

### 方法一：在线切换（推荐）✨

1. 打开你的文档网站
2. 在右下角找到**主题选择器**下拉菜单
3. 选择你喜欢的主题
4. 主题会自动保存到浏览器，下次访问自动应用

### 方法二：修改默认主题

编辑 `index.html` 第 10 行：

```html
<!-- 当前默认主题 -->
<link rel="stylesheet" href="themes/github.css">
```

修改为你想要的主题：

```html
<!-- 改为 Lapis Dark 主题 -->
<link rel="stylesheet" href="themes/lapis-dark.css">
```

### 方法三：禁用主题切换器

如果你不需要切换功能，只想固定一个主题，可以：

1. 在 `index.html` 中删除主题切换器相关代码（第 34-51 行）
2. 只保留一个主题的 CSS 引用

## 主题特点说明

### GitHub 主题
- 📖 适合技术文档
- 🎨 黑白灰配色
- ✨ 代码高亮友好

### Lapis 系列
- 🇨🇳 针对中文字体优化
- 📝 使用思源字体
- 💼 包含专业简历样式

### Night 主题
- 🌙 护眼暗色
- 💻 适合长时间阅读
- 🎯 高对比度

### Newsprint 主题
- 📰 报纸印刷风格
- 📚 衬线字体
- 🎓 学术风格

## 自定义主题

如果你想修改主题样式：

1. 复制一个现有的 CSS 文件
2. 修改颜色、字体等样式
3. 保存为新的主题文件
4. 在 `index.html` 的主题选择器中添加选项

## 字体说明

主题文件夹中还包含了相应的字体文件：

- **Lapis**: 使用思源黑体/思源宋体
- **GitHub**: 使用 Open Sans
- **Newsprint**: 使用 PT Serif
- **Pixyll**: 使用 Lato + Merriweather

这些字体都已经本地化，不依赖外部 CDN，加载更快。

## 预览效果

本地预览命令：
```bash
npm run dev
```

访问 http://localhost:3000 查看不同主题效果。

## 部署注意事项

⚠️ 确保 `themes/` 目录已提交到 Git 仓库：

```bash
git add themes/
git commit -m "Add custom themes"
git push
```

部署到 GitHub Pages 后，主题切换功能会正常工作。
