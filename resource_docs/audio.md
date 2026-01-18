# 🎵 音乐播放器

> 💡 提示：点击下方按钮进入音频播放器，享受音乐时光

---

## 🎧 在线播放器

<div class="audio-player-section">
  <a href="https://glider110.github.io/gliderRecord/assets/pages/audio-player-local.html" class="audio-player-card" target="_blank">
    <div class="audio-player-icon">📁</div>
    <div class="audio-player-content">
      <h2>本地音频播放器</h2>
      <p>支持拖拽或选择本地音频文件播放</p>
      <div class="features">
        <span class="feature-tag">📁 文件选择</span>
        <span class="feature-tag">🎯 拖拽上传</span>
        <span class="feature-tag">📋 播放列表</span>
        <span class="feature-tag">⚡ 即时播放</span>
      </div>
    </div>
  </a>

  <a href="https://glider110.github.io/gliderRecord/assets/pages/audio-player-demo.html" class="audio-player-card" target="_blank" style="margin-top: 20px;">
    <div class="audio-player-icon">🎵</div>
    <div class="audio-player-content">
      <h2>在线音乐播放器</h2>
      <p>播放预设的在线音乐列表</p>
      <div class="features">
        <span class="feature-tag">▶️ 播放控制</span>
        <span class="feature-tag">📋 播放列表</span>
        <span class="feature-tag">🔀 随机播放</span>
        <span class="feature-tag">🔁 循环模式</span>
      </div>
    </div>
  </a>
</div>

---

## 🎼 播放列表

<div class="music-grid">
  <div class="music-card" onclick="playTrack(0)" style="cursor: pointer;">
    <div class="music-icon">🎵</div>
    <div class="music-info">
      <h3>理想三旬</h3>
      <p class="artist">陈鸿宇</p>
      <p class="genre">民谣 / 流行</p>
    </div>
  </div>

  <div class="music-card" onclick="playTrack(1)" style="cursor: pointer;">
    <div class="music-icon">🎵</div>
    <div class="music-info">
      <h3>走歌人</h3>
      <p class="artist">暗杠</p>
      <p class="genre">民谣 / 独立</p>
    </div>
  </div>
</div>

<script>
  // 播放指定曲目
  function playTrack(index) {
    // 检查是否有悬浮播放器实例
    if (window.audioPlayer) {
      window.audioPlayer.playTrackByIndex(index);
      
      // 显示提示
      const trackNames = ['理想三旬', '走歌人'];
      showNotification(`正在播放: ${trackNames[index]}`);
    } else {
      showNotification('播放器未加载，请刷新页面重试');
    }
  }

  // 显示通知
  function showNotification(message) {
    // 移除旧通知
    const oldNotification = document.querySelector('.play-notification');
    if (oldNotification) {
      oldNotification.remove();
    }

    // 创建新通知
    const notification = document.createElement('div');
    notification.className = 'play-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // 3秒后自动移除
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
</script>

<style>
  /* 播放通知样式 */
  .play-notification {
    position: fixed;
    top: 80px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 25px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    font-size: 16px;
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    transition: opacity 0.3s;
  }

  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>

---

## ⚡ 播放器特性

<div class="features-grid">
  <div class="feature-item">
    <div class="feature-icon">▶️</div>
    <h3>完整播放控制</h3>
    <p>播放、暂停、上一首、下一首，轻松掌控</p>
  </div>

  <div class="feature-item">
    <div class="feature-icon">📊</div>
    <h3>进度条控制</h3>
    <p>拖动进度条快速跳转，实时显示播放时间</p>
  </div>

  <div class="feature-item">
    <div class="feature-icon">🔊</div>
    <h3>音量调节</h3>
    <p>滑动调节音量，静音切换更方便</p>
  </div>

  <div class="feature-item">
    <div class="feature-icon">🔀</div>
    <h3>多种播放模式</h3>
    <p>顺序播放、随机播放、列表循环、单曲循环</p>
  </div>

  <div class="feature-item">
    <div class="feature-icon">📱</div>
    <h3>响应式设计</h3>
    <p>完美适配电脑、平板、手机等设备</p>
  </div>

  <div class="feature-item">
    <div class="feature-icon">⌨️</div>
    <h3>键盘快捷键</h3>
    <p>空格键播放/暂停，方向键控制进度和音量</p>
  </div>
</div>

---

## 🎹 快捷键说明

<div class="shortcuts-container">
  <div class="shortcut-item">
    <kbd>空格</kbd>
    <span>播放 / 暂停</span>
  </div>

  <div class="shortcut-item">
    <kbd>←</kbd>
    <span>后退 5 秒</span>
  </div>

  <div class="shortcut-item">
    <kbd>→</kbd>
    <span>前进 5 秒</span>
  </div>

  <div class="shortcut-item">
    <kbd>↑</kbd>
    <span>增加音量</span>
  </div>

  <div class="shortcut-item">
    <kbd>↓</kbd>
    <span>降低音量</span>
  </div>
</div>

---

<style>
/* 音频播放器卡片 */
.audio-player-section {
  margin: 40px 0;
}

.audio-player-card {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.audio-player-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.4);
}

.audio-player-icon {
  font-size: 80px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.audio-player-content h2 {
  font-size: 32px;
  margin-bottom: 12px;
  font-weight: 700;
}

.audio-player-content p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 20px;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.feature-tag {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

/* 音乐卡片网格 */
.music-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.music-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
  transition: all 0.3s;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  gap: 20px;
}

.music-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
  border-color: #667eea;
}

.music-icon {
  font-size: 48px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  flex-shrink: 0;
}

.music-info h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.music-info .artist {
  font-size: 16px;
  color: #667eea;
  font-weight: 600;
  margin-bottom: 4px;
}

.music-info .genre {
  font-size: 14px;
  color: #999;
}

/* 特性网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 30px 0;
}

.feature-item {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.3s;
}

.feature-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-item h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
  font-weight: 600;
}

.feature-item p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 快捷键容器 */
.shortcuts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin: 30px 0;
}

.shortcut-item {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 15px;
}

.shortcut-item kbd {
  display: inline-block;
  padding: 8px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  min-width: 50px;
  text-align: center;
}

.shortcut-item span {
  font-size: 15px;
  color: #555;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 768px) {
  .audio-player-card {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }

  .audio-player-icon {
    font-size: 60px;
  }

  .audio-player-content h2 {
    font-size: 24px;
  }

  .music-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .shortcuts-container {
    grid-template-columns: 1fr;
  }
}
</style>
