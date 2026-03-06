---
name: webpage_optimization
description: 优化 gliderRecord Docsify 知识库网站，包括文档结构、侧边栏、样式、性能和 SEO 等方面的优化。当用户提到「优化网页」「改进文档」「美化页面」「提升性能」等需求时使用此 skill。
---

# 网页优化 Skill

本 skill 用于优化 **gliderRecord** Docsify 知识库网站。项目部署于 GitHub Pages，使用 Docsify 4.x 纯静态方案，核心文件为根目录的 `index.html`、`_sidebar.md`、`_coverpage.md`。

---

## 一、文档内容优化

### 1. Markdown 文档规范
- 每个 `.md` 文件必须有且只有一个 `# 一级标题`
- 标题层级不要跳级（h1 → h2 → h3），最多使用到 h4
- 图片统一存放在与 md 同目录下的 `.{文件名}.assets/` 隐藏文件夹中
- 图片引用使用相对路径：`.{文件名}.assets/image.png`
- 代码块必须指定语言，例如：``` ```python``` ```、``` ```bash``` ```

### 2. 文档模板
新建文档时参考 `themes/template-cn.md`（中文模板）或 `themes/template-en.md`（英文模板）。

---

## 二、侧边栏优化（`_sidebar.md`）

### 规范
- 顶级分类使用 `**加粗**` 配合 emoji 图标，例如：`* **💼 工作记录**`
- 文档链接使用相对路径，例如：`[文档标题](record/standard_record/xxx.md)`
- 同一分类下的文档按时间或逻辑关联排序
- 新增文档后 **必须同步更新 `_sidebar.md`**

### 添加新条目的步骤
1. 确定文档所属分类（工作记录 / 知识仓库 / 资源文档）
2. 在 `_sidebar.md` 对应分类下添加一行：
   ```
     * [文档标题](相对路径/文件名.md)
   ```
3. 缩进使用 2 个空格

---

## 三、`index.html` 配置优化

### Docsify 配置（`window.$docsify`）
关键配置项说明：
```javascript
window.$docsify = {
  name: '...',          // 侧边栏顶部标题
  repo: '...',          // GitHub 仓库链接（右上角图标）
  loadSidebar: true,    // 启用自定义侧边栏
  subMaxLevel: 3,       // 侧边栏最多展示到 h3
  auto2top: true,       // 切换页面自动回到顶部
  search: { ... },      // 搜索插件配置
  copyCode: { ... },    // 代码复制按钮配置
}
```

### 主题色变量（CSS 自定义属性）
修改主题色时，统一修改以下 CSS 变量（在 `index.html` 的 `<style>` 中）：
```css
:root {
  --lapis-primary: #4870ac;    /* 主色 */
  --lapis-text: #40464f;       /* 正文颜色 */
  --lapis-bg: #ffffff;         /* 背景色 */
  --lapis-block-bg: #f6f8fa;  /* 代码块/引用块背景 */
  --lapis-border: #e3e8f0;     /* 边框颜色 */
  --theme-color: var(--lapis-primary);
}
```

---

## 四、性能优化

### 图片优化
- 图片尺寸建议不超过 **1920×1080**，文件大小不超过 **500KB**
- 截图使用 PNG，照片使用 JPEG（quality 80%）
- 避免直接提交未压缩的大图，可使用以下命令压缩：
  ```bash
  # 使用 ImageMagick 压缩图片（保持宽度 1200px，质量 85）
  convert input.png -resize 1200x\> -quality 85 output.png
  ```
- 保持 git 仓库体积小（README 中要求「小文件，便于 clone」）

### CDN 资源
项目使用 `cdn.jsdelivr.net` 加载 Docsify 及插件，**不要**将 CDN 资源下载到本地，保持引用 CDN 链接：
```html
<script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
```

### 插件加载顺序
`index.html` 底部 `<script>` 加载顺序：
1. Docsify 核心（`docsify@4`）
2. docsify-themeable
3. 功能插件（search、copy-code、zoom-image 等）
4. 代码高亮（prism）
5. 自定义脚本

---

## 五、SEO 优化

在 `index.html` 的 `<head>` 中确保以下 meta 标签完整：
```html
<title>gliderRecord - 个人技术知识库</title>
<meta name="description" content="个人工作记录和知识库">
<meta name="keywords" content="技术文档,知识库,工作记录,机器人,ROS2,AGV">
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
```

---

## 六、主题与样式扩展

### 可用主题（`themes/` 目录）
| 文件 | 风格 |
|------|------|
| `lapis.css` | Lapis 蓝（当前主风格） |
| `lapis-dark.css` | Lapis 暗色 |
| `github.css` | GitHub 风格 |
| `night.css` | 深夜暗色 |
| `newsprint.css` | 新闻纸风格 |
| `pixyll.css` | 极简白 |
| `whitey.css` | 纯净白 |

### 引入本地主题
将 `index.html` 中的主题 CDN 链接替换为本地路径：
```html
<link rel="stylesheet" href="themes/lapis.css">
```

---

## 七、常见操作速查

### 新增一篇工作记录
```bash
# 1. 在对应目录创建 md 文件
touch record/standard_record/新文档.md

# 2. 创建图片资源目录
mkdir -p record/standard_record/.新文档.assets

# 3. 编写内容后，更新侧边栏
# 编辑 _sidebar.md，在「工作记录」分类下添加链接

# 4. 提交（遵循 git.mdc 规范）
git add record/standard_record/新文档.md _sidebar.md
git commit -m "docs(record): 新增《新文档》工作记录"
git push origin master
```

### 本地预览网站
```bash
cd /home/std/project/gliderRecord
npm run dev
# 访问 http://localhost:3000
```

### 清理大文件（检查 git 仓库体积）
```bash
# 查看最大的 git 对象
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sort -k3 -n -r | head -20
```
