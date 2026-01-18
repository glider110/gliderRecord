/**
 * 悬浮音频播放器插件
 * 可在任何页面使用
 */

class FloatingAudioPlayer {
  constructor(options = {}) {
    this.playlist = options.playlist || [];
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isMinimized = false;
    this.playMode = 'repeat-all'; // 'sequence', 'shuffle', 'repeat-all', 'repeat-one'
    this.volume = 0.7;
    
    this.init();
  }

  init() {
    this.createPlayer();
    this.createAudioElement();
    this.bindEvents();
    if (this.playlist.length > 0) {
      this.loadTrack(0);
    }
  }

  createPlayer() {
    const playerHTML = `
      <div class="floating-audio-player" id="floatingAudioPlayer">
        <!-- 最小化状态 -->
        <div class="player-minimized" id="playerMinimized">
          <div class="mini-info">
            <span class="mini-icon">🎵</span>
            <span class="mini-title">音乐播放器</span>
          </div>
          <button class="mini-expand-btn" id="miniExpandBtn">▲</button>
        </div>

        <!-- 完整播放器 -->
        <div class="player-expanded" id="playerExpanded">
          <!-- 头部 -->
          <div class="player-header">
            <div class="player-title">
              <span class="player-icon">🎵</span>
              <span>音乐播放器</span>
            </div>
            <div class="player-controls-header">
              <button class="header-btn" id="minimizeBtn" title="最小化">—</button>
              <button class="header-btn" id="closeBtn" title="关闭">×</button>
            </div>
          </div>

          <!-- 当前播放信息 -->
          <div class="current-track">
            <div class="track-cover" id="trackCover">🎵</div>
            <div class="track-details">
              <div class="track-name" id="trackName">选择歌曲开始播放</div>
              <div class="track-artist" id="trackArtist">未知艺术家</div>
            </div>
          </div>

          <!-- 进度条 -->
          <div class="progress-section">
            <div class="progress-bar-container" id="progressBarContainer">
              <div class="progress-bar-fill" id="progressBarFill">
                <div class="progress-handle"></div>
              </div>
            </div>
            <div class="time-display">
              <span id="currentTime">0:00</span>
              <span id="totalTime">0:00</span>
            </div>
          </div>

          <!-- 控制按钮 -->
          <div class="player-controls">
            <button class="control-btn mode-btn" id="modeBtnPlayer" title="播放模式">🔁</button>
            <button class="control-btn" id="prevBtnPlayer" title="上一首">⏮</button>
            <button class="control-btn play-pause-btn" id="playPauseBtnPlayer" title="播放">▶</button>
            <button class="control-btn" id="nextBtnPlayer" title="下一首">⏭</button>
            <button class="control-btn" id="volumeBtnPlayer" title="音量">🔊</button>
          </div>

          <!-- 音量控制 -->
          <div class="volume-section" id="volumeSection" style="display: none;">
            <input type="range" class="volume-range" id="volumeRange" min="0" max="100" value="70">
          </div>

          <!-- 播放列表 -->
          <div class="playlist-section">
            <div class="playlist-header">
              <span>播放列表</span>
              <span class="playlist-count" id="playlistCountDisplay">0</span>
            </div>
            <div class="playlist-items" id="playlistItems"></div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', playerHTML);
    this.playerElement = document.getElementById('floatingAudioPlayer');
  }

  createAudioElement() {
    this.audio = document.createElement('audio');
    this.audio.preload = 'metadata';
    document.body.appendChild(this.audio);
  }

  bindEvents() {
    // 获取DOM元素
    this.dom = {
      minimized: document.getElementById('playerMinimized'),
      expanded: document.getElementById('playerExpanded'),
      miniExpandBtn: document.getElementById('miniExpandBtn'),
      minimizeBtn: document.getElementById('minimizeBtn'),
      closeBtn: document.getElementById('closeBtn'),
      trackCover: document.getElementById('trackCover'),
      trackName: document.getElementById('trackName'),
      trackArtist: document.getElementById('trackArtist'),
      progressBarContainer: document.getElementById('progressBarContainer'),
      progressBarFill: document.getElementById('progressBarFill'),
      currentTime: document.getElementById('currentTime'),
      totalTime: document.getElementById('totalTime'),
      modeBtn: document.getElementById('modeBtnPlayer'),
      prevBtn: document.getElementById('prevBtnPlayer'),
      playPauseBtn: document.getElementById('playPauseBtnPlayer'),
      nextBtn: document.getElementById('nextBtnPlayer'),
      volumeBtn: document.getElementById('volumeBtnPlayer'),
      volumeSection: document.getElementById('volumeSection'),
      volumeRange: document.getElementById('volumeRange'),
      playlistItems: document.getElementById('playlistItems'),
      playlistCount: document.getElementById('playlistCountDisplay')
    };

    // 按钮事件
    this.dom.miniExpandBtn.addEventListener('click', () => this.expand());
    this.dom.minimizeBtn.addEventListener('click', () => this.minimize());
    this.dom.closeBtn.addEventListener('click', () => this.close());
    this.dom.playPauseBtn.addEventListener('click', () => this.togglePlay());
    this.dom.prevBtn.addEventListener('click', () => this.prevTrack());
    this.dom.nextBtn.addEventListener('click', () => this.nextTrack());
    this.dom.modeBtn.addEventListener('click', () => this.toggleMode());
    this.dom.volumeBtn.addEventListener('click', () => this.toggleVolume());

    // 进度条事件
    this.dom.progressBarContainer.addEventListener('click', (e) => this.seekTo(e));

    // 音量控制
    this.dom.volumeRange.addEventListener('input', (e) => {
      this.volume = e.target.value / 100;
      this.audio.volume = this.volume;
      this.updateVolumeIcon();
    });

    // 音频事件
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.onTrackEnded());
    this.audio.addEventListener('play', () => this.onPlay());
    this.audio.addEventListener('pause', () => this.onPause());
    this.audio.addEventListener('error', (e) => this.onError(e));

    // 渲染播放列表
    this.renderPlaylist();
  }

  loadTrack(index) {
    if (index < 0 || index >= this.playlist.length) return;
    
    this.currentIndex = index;
    const track = this.playlist[index];
    
    this.audio.src = track.src;
    this.dom.trackName.textContent = track.title;
    this.dom.trackArtist.textContent = track.artist;
    
    // 更新播放列表高亮
    this.updatePlaylistHighlight();
    
    console.log('加载音频:', track.src);
  }

  togglePlay() {
    if (this.audio.src) {
      if (this.isPlaying) {
        this.audio.pause();
      } else {
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('播放成功');
            })
            .catch(error => {
              console.error('播放失败:', error);
              alert('播放失败，请检查音频文件路径');
            });
        }
      }
    }
  }

  play() {
    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  prevTrack() {
    let prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) prevIndex = this.playlist.length - 1;
    this.loadTrack(prevIndex);
    if (this.isPlaying) this.play();
  }

  nextTrack() {
    if (this.playMode === 'repeat-one') {
      this.audio.currentTime = 0;
      this.play();
      return;
    }

    let nextIndex = (this.currentIndex + 1) % this.playlist.length;
    this.loadTrack(nextIndex);
    if (this.isPlaying) this.play();
  }

  toggleMode() {
    const modes = ['repeat-all', 'repeat-one', 'shuffle', 'sequence'];
    const currentModeIndex = modes.indexOf(this.playMode);
    this.playMode = modes[(currentModeIndex + 1) % modes.length];
    this.updateModeIcon();
  }

  updateModeIcon() {
    const icons = {
      'repeat-all': '🔁',
      'repeat-one': '🔂',
      'shuffle': '🔀',
      'sequence': '📋'
    };
    this.dom.modeBtn.textContent = icons[this.playMode];
    this.dom.modeBtn.title = this.getModeTitle();
  }

  getModeTitle() {
    const titles = {
      'repeat-all': '列表循环',
      'repeat-one': '单曲循环',
      'shuffle': '随机播放',
      'sequence': '顺序播放'
    };
    return titles[this.playMode];
  }

  toggleVolume() {
    const isVisible = this.dom.volumeSection.style.display !== 'none';
    this.dom.volumeSection.style.display = isVisible ? 'none' : 'block';
  }

  updateVolumeIcon() {
    if (this.volume === 0) {
      this.dom.volumeBtn.textContent = '🔇';
    } else if (this.volume < 0.5) {
      this.dom.volumeBtn.textContent = '🔉';
    } else {
      this.dom.volumeBtn.textContent = '🔊';
    }
  }

  seekTo(e) {
    if (!this.audio.duration) return;
    
    const rect = this.dom.progressBarContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    this.audio.currentTime = percent * this.audio.duration;
  }

  updateProgress() {
    if (!this.audio.duration) return;
    
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.dom.progressBarFill.style.width = percent + '%';
    this.dom.currentTime.textContent = this.formatTime(this.audio.currentTime);
  }

  updateDuration() {
    this.dom.totalTime.textContent = this.formatTime(this.audio.duration);
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  onPlay() {
    this.isPlaying = true;
    this.dom.playPauseBtn.textContent = '⏸';
    this.dom.trackCover.classList.add('playing');
    this.updatePlaylistHighlight();  // 更新播放列表高亮
  }

  onPause() {
    this.isPlaying = false;
    this.dom.playPauseBtn.textContent = '▶';
    this.dom.trackCover.classList.remove('playing');
    this.updatePlaylistHighlight();  // 更新播放列表高亮
  }

  onTrackEnded() {
    this.nextTrack();
  }

  onError(e) {
    console.error('音频加载错误:', e);
    console.error('音频源:', this.audio.src);
    this.dom.trackName.textContent = '加载失败';
    alert('音频文件加载失败，请检查文件路径');
  }

  renderPlaylist() {
    this.dom.playlistItems.innerHTML = this.playlist.map((track, index) => `
      <div class="playlist-item" data-index="${index}">
        <span class="playlist-item-icon">🎵</span>
        <div class="playlist-item-info">
          <div class="playlist-item-title">${track.title}</div>
          <div class="playlist-item-artist">${track.artist}</div>
        </div>
        <span class="playlist-item-indicator">♫</span>
      </div>
    `).join('');

    this.dom.playlistCount.textContent = `(${this.playlist.length})`;

    // 添加点击事件
    this.dom.playlistItems.querySelectorAll('.playlist-item').forEach(item => {
      item.addEventListener('click', () => {
        const index = parseInt(item.dataset.index);
        this.loadTrack(index);
        this.play();
      });
    });
  }

  updatePlaylistHighlight() {
    this.dom.playlistItems.querySelectorAll('.playlist-item').forEach((item, index) => {
      if (index === this.currentIndex) {
        item.classList.add('active');
        item.querySelector('.playlist-item-indicator').style.display = this.isPlaying ? 'block' : 'none';
      } else {
        item.classList.remove('active');
        item.querySelector('.playlist-item-indicator').style.display = 'none';
      }
    });
  }

  // 公共方法：从外部调用播放指定索引的歌曲
  playTrackByIndex(index) {
    if (index >= 0 && index < this.playlist.length) {
      console.log('playTrackByIndex called with index:', index);
      this.loadTrack(index);
      
      // 使用 play() 而不是直接调用 audio.play()，确保触发 onPlay 事件
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('播放成功，索引:', index);
            this.isPlaying = true;
            this.updatePlaylistHighlight();  // 确保更新高亮
          })
          .catch(error => {
            console.error('播放失败:', error);
          });
      }
      
      // 如果播放器是最小化的，展开它
      if (this.isMinimized) {
        this.expand();
      }
    } else {
      console.error('Invalid track index:', index);
    }
  }

  minimize() {
    this.isMinimized = true;
    this.dom.minimized.style.display = 'flex';
    this.dom.expanded.style.display = 'none';
  }

  expand() {
    this.isMinimized = false;
    this.dom.minimized.style.display = 'none';
    this.dom.expanded.style.display = 'block';
  }

  close() {
    this.pause();
    this.playerElement.style.display = 'none';
  }

  show() {
    this.playerElement.style.display = 'block';
  }
}

// 导出为全局变量
window.FloatingAudioPlayer = FloatingAudioPlayer;
