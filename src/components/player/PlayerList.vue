<template>
  <div class="play-list">
    <div class="rencentPlay-box" v-show="clickFlag">
      <div class="recent-header">
        最近播放列表
      </div>
      <div class="recent-item" v-for="(item,index) in songInfo" :key="item.id" v-show="!isNone"
        style="margin-left:16px">
        <div class="recent-icon">
          <i class="iconfont icon-bofang" @click="sendInfo(item,index)"></i>
          <i class="iconfont icon-shanchu" @click="removeInfo(item)" style="margin-left:8px;"></i>
        </div>
        <div class="recent-song">{{item.songName}}</div>
        <div class="recent-songer">{{item.songer}}</div>
      </div>
      <div class="recent-none" v-show="isNone">
        <span class="recent-one">你还没有添加任何音乐</span>
        <span class="recent-two">去首页<ins @click="toDiscover">发现音乐</ins></span>
      </div>
    </div>
    <div class="list-btn" @click="clickFlag = !clickFlag"><i class="iconfont icon-bofangduilie"></i></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      clickFlag: false,
      isNone: false
    }
  },
  computed: {
    ...mapGetters({ songInfo: 'getSongInfo' })
  },
  methods: {
    sendInfo (value, index) {
      this.$bus.$emit('listSong', value, index)
    },
    removeInfo (item) {
      this.$store.commit('removeInfo', item)
    },
    toDiscover () {
      this.$router.replace('discover')
      this.clickFlag = false

    }
  },
  watch: {
    songInfo (newValue, oldValue) {
      if (newValue.length == 0) return this.isNone = true
      this.isNone = false
    }
  }
}
</script>

<style scoped>
.play-list {
  position: relative;
  margin-left: 30px;
  padding-top: 15px;
}
.list-btn i {
  cursor: pointer;
  font-size: 25px;
}
.list-btn i:hover {
  color: aqua;
}
.rencentPlay-box {
  position: absolute;
  width: 400px;
  height: 600px;
  background-color: #2d2f33;
  transform: translate(-52%, -103%);
  overflow: scroll;
  overflow-x: hidden;
  z-index: 888;
}
/* 滑动条轨道 */
.rencentPlay-box::-webkit-scrollbar-track {
  background-color: #212124;
}
/* 小滑块的样式 */
.rencentPlay-box::-webkit-scrollbar-thumb {
  background-color: rgb(55, 66, 66);
}
.rencentPlay-box::-webkit-scrollbar {
  width: 15px;
  background-color: rgb(20, 19, 19);
}
.recent-header {
  width: 400px;
  text-align: center;
  font-size: 25px;
  line-height: 37px;
  color: #82d8cd;
}
.recent-item {
  border-top: 1px solid #323236;
  padding-top: 3px;
  display: flex;
  height: 400px;
  height: 50px;
}
.recent-item:last-child {
  border-bottom: 1px solid #323236;
}
.recent-icon {
  width: 52px;
}
.recent-icon i {
  font-size: 28px;
}
.recent-icon i:hover {
  color: aqua;
}
.recent-pic {
  margin-left: 5px;
  width: 50px;
  height: 50px;
}
.recent-pic img {
  border-radius: 50%;
  width: 45px;
}
.recent-song {
  margin-left: 16px;
}
.recent-song,
.recent-songer {
  width: 50%;
  font-size: 12px;
  line-height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: darkgray;
}
.recent-none {
  text-align: center;
  height: 500px;
}
.recent-one {
  line-height: 500px;
  font-size: 16px;
  letter-spacing: 1px;
}
.recent-two {
  width: 400px;
  font-size: 13px;
}
.recent-two ins {
  cursor: pointer;
  color: #fff;
}
</style>