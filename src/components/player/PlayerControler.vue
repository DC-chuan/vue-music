<template>
  <div class="control-box">
    <audio :src="url" ref="audio" @canplay="getDuration" @timeupdate="getCurrentTime">
      不是吧阿sir 你的浏览器太low了吧 快去升个级吧
    </audio>
    <!-- 播放控件 -->
    <div class="audio-btn">
      <div class="play-btn" @click="preMusic"><i class="iconfont icon-shangyiqu"></i></div>
      <div class="play-btn" v-show="playFlag" @click="musicPlay"><i class="iconfont icon-zanting"></i></div>
      <div class="play-btn" v-show="!playFlag" @click="musicPause"><i class="iconfont icon-bofangzhong"></i></div>
      <div class="play-btn" @click="nextMusic"><i class="iconfont icon-xiayiqu"></i></div>
    </div>
    <!-- 进度条 -->
    <div class="audio-slider">
      <div class="time">{{currentTime}}</div>
      <div class="silder">
        <el-slider v-model="musicProcess" :show-tooltip="false" @change="changeMusicProcess"></el-slider>
      </div>
      <div class="time">{{duration}}</div>
    </div>

    <div class="audio-vloume">
      <div class="volume-icon" @click="volumeClick">
        <i v-show="volumeFlag" class="iconfont icon-yinliang"></i>
        <i v-show="!volumeFlag" class="iconfont icon-jingyin"></i>
      </div>
      <div class="volume-slider">
        <el-slider @change="changeVolumeSize" v-model="volumeSize" :show-tooltip="false">
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['url'],
  data () {
    return {
      audioDom: null,
      playFlag: true, //是否暂停
      id: 1,
      duration: '00:00',
      currentTime: '00:00',
      volumeSize: 40, //音量大小
      volumeHistory: 0, //记录音量
      musicProcess: 0, //音乐播放进度
      volumeFlag: true,  //是否静音
    }
  },
  methods: {
    // 初始化音频信息
    initAudio () {
      const self = this;
      self.audioDom = this.$refs.audio;
      self.audioDom.loop = false; //关闭循环播放
      self.audioDom.load();//重新加载标签
      // 当收到总时长 分辨率 子轨等信息时触发该事件
      self.audioDom.addEventListener("loadedmetadata", function () {
        self.duration = self.getDuration(); //计算
        self.volumeSize = self.audioDom.volume * 100; //音量大小
        self.volumeHistory = self.audioDom.volume * 100; //音量大小
        self.audioDom.autoplay = true;
        self.playFlag = false;
      });
      this.musicProcess = 0;
      //监听音乐是否播放完成
      this.audioDom.addEventListener('ended', function () {
        self.playFlag = true
      },
        false
      );
    },
    //获取音乐总时长
    getDuration () {
      this.duration = this.computeTime(this.$refs.audio.duration);
      return this.duration
    },

    // 当音乐播放时间改变时触发
    getCurrentTime (e) {
      this.currentTime = this.computeTime(e.target.currentTime);
      //改变进度条
      this.musicProcess = (e.target.currentTime / this.$refs.audio.duration) * 100
    },
    // 点击暂停与播放
    musicPause () {
      this.$refs.audio.pause()
      this.playFlag = true
    },
    musicPlay () {
      this.$refs.audio.play();
      this.playFlag = false;
    },
    computeTime (value) {
      var timeStr = "";
      timeStr =
        (Math.floor((value % 3600) / 60) > 9
          ? Math.floor((value % 3600) / 60)
          : "0" + Math.floor((value % 3600) / 60));
      timeStr +=
        ":" +
        (Math.floor(((value % 3600) % 60) / 1) > 9
          ? Math.floor(((value % 3600) % 60) / 1)
          : "0" + Math.floor(((value % 3600) % 60) / 1));
      return timeStr;
    },
    //拖拽进度条
    changeMusicProcess () {
      if (this.musicProcess === 0) {
        this.$refs.audio.currentTime = 0;
        this.currentTime = 0;
      }
      if (this.musicProcess < 100 && this.musicProcess > 0) {
        this.$refs.audio.currentTime =
          (this.$refs.audio.duration * this.musicProcess) / 100; // 音频的当前播放时间
        this.currentTime = this.computeTime(
          (this.$refs.audio.duration * this.musicProcess) / 100
        ); // 当前播放时间
      }
      if (this.musicProcess === 100) {
        this.$refs.audio.currentTime = this.$refs.audio.duration;
        this.currentTime = this.duration;
      }
    },
    // 拖动音量条事件
    changeVolumeSize () {
      this.volumeHistory = this.volumeSize; // 记录音量
      if (this.volumeSize === 0) {
        this.audioDom.volume = 0;
        this.volumeFlag = false; // 当音量为0时静音
      }
      if (this.volumeSize < 100 && this.volumeSize > 0) {
        this.audioDom.volume = this.volumeSize / 100;
        this.volumeFlag = true; // 当音量有时，不静音
      }
      if (this.volumeSize === 100) {
        this.audioDom.volume = 1;
        this.volumeFlag = true; // 当音量有时，不静音
      }
    },
    //点击静音
    volumeClick () {
      this.volumeFlag = !this.volumeFlag;
      if (!this.volumeFlag) {
        this.audioDom.volume = 0;
        this.volumeSize = 0;
      } else {
        this.audioDom.volume = this.volumeHistory / 100;
        this.volumeSize = this.volumeHistory;
      }
    },
    // 点击上一曲
    preMusic () {
      this.$bus.$emit('preMusic', '1')
    },
    // 点击下一曲
    nextMusic () {
      this.$bus.$emit('nextMusic', '2')
    }
  },
  mounted () {
    let that = this;
    setTimeout(() => {
      that.initAudio();
    }, 1000);
  },
  watch: {
    url (newValue, oldValue) {
      let that = this;
      setTimeout(() => {
        that.initAudio()
      }, 1000);
    },
    musicProcess (newV, oldV) {
      if (newV >= 100) {
        this.nextMusic(); // 播放完成切换下一首

      }
    }
  }
}
</script>

<style scoped>
.control-box {
  padding-left: 20px;
  width: 1100px;
  height: 63px;
  display: flex;
  align-items: center;
}
.audio-slider {
  margin-left: 15px;
  display: flex;
  width: 100%;
  align-items: center;
}
.silder {
  width: 80%;
}
.time {
  margin-left: 15px;
  width: 50px;
  color: darkgrey;
}
.audio-btn {
  display: flex;
}
.play-btn {
  cursor: pointer;
}
.play-btn i:hover {
  color: aqua;
}
.play-btn:nth-child(n-1) {
  margin-left: 15px;
}
.play-btn i {
  font-size: 35px;
}
.audio-vloume {
  display: flex;
  width: 300px;
  height: 100%;
  align-items: center;
}
.volume-slider {
  width: 150px;
}
.volume-icon {
  width: 50px;
}
.volume-icon i:hover {
  color: aqua;
}
.audio-vloume i {
  font-size: 35px;
}
</style>