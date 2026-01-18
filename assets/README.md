# Assets 资源文件夹

本文件夹包含网站的所有前端资源文件。

## 📁 文件结构

```
assets/
├── css/                    # 样式文件
│   └── floating-audio-player.css   # 悬浮音频播放器样式
├── js/                     # JavaScript 脚本
│   └── floating-audio-player.js    # 悬浮音频播放器逻辑
└── pages/                  # HTML 页面
    ├── audio-player.html          # 完整音频播放器页面
    ├── audio-player-demo.html     # 悬浮播放器演示页面
    └── pdf-viewer.html            # PDF 在线阅读器
```

## 🎵 音频播放器

### 悬浮播放器组件
- **文件**: `css/floating-audio-player.css` + `js/floating-audio-player.js`
- **功能**: 可集成到任何页面的悬浮式音频播放器
- **位置**: 固定在页面右下角
- **特性**: 
  - 最小化/展开切换
  - 完整播放控制
  - 进度条和音量控制
  - 多种播放模式
  - 播放列表管理

### 页面
1. **audio-player.html** - 独立的音频播放器页面
   - 大型专辑封面展示
   - 完整播放列表
   - 适合专注听音乐

2. **audio-player-demo.html** - 悬浮播放器演示
   - 展示悬浮播放器集成方式
   - 包含使用说明和代码示例

## 📚 PDF 阅读器

### pdf-viewer.html
- **功能**: 在线 PDF 文档阅读器
- **特性**:
  - PDF.js 驱动
  - 目录导航（侧边栏）
  - 页面控制（上一页/下一页）
  - 缩放功能
  - 全屏模式
  - 键盘快捷键支持

## 🔗 使用方式

### 在主站中集成悬浮播放器

已在 `index.html` 中集成：

```html
<link rel="stylesheet" href="assets/css/floating-audio-player.css">
<script src="assets/js/floating-audio-player.js"></script>
<script>
  window.audioPlayer = new FloatingAudioPlayer({
    playlist: [...]
  });
</script>
```

### 访问各个页面

- 主站: `https://glider110.github.io/gliderRecord/`
- 音频播放器: `https://glider110.github.io/gliderRecord/assets/pages/audio-player.html`
- 悬浮播放器演示: `https://glider110.github.io/gliderRecord/assets/pages/audio-player-demo.html`
- PDF 阅读器: `https://glider110.github.io/gliderRecord/assets/pages/pdf-viewer.html`

## 📝 维护说明

### 添加新的音频文件
1. 将音频文件放入 `resource_docs/audio/` 目录
2. 在播放器初始化代码中添加音频信息：
```javascript
{
  title: '歌曲名',
  artist: '艺术家',
  src: 'resource_docs/audio/文件名.mp3'
}
```

### 添加新的 PDF 文件
1. 将 PDF 文件放入 `resource_docs/pdf/` 对应分类目录
2. 在 `resource_docs/book.md` 中添加链接卡片

## 🎨 样式定制

所有组件使用统一的设计语言：
- 主色调: `#667eea` → `#764ba2` (渐变紫)
- 圆角: `12px` - `20px`
- 阴影: `0 10px 40px rgba(0,0,0,0.2)`
- 字体: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`

修改样式时请保持一致性。
