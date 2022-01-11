<template>
  <div class="play-box">
    <div class="player-art">
      <PlayerArt :songInfo='songInfo' />
    </div>
    <div class="player-controler">
      <PlayerControler :url='songInfo.musicUrl' />
    </div>
    <div class="player-list">
      <PlayerList />
    </div>
  </div>
</template>

<script>
import PlayerArt from './PlayerArt.vue'
import PlayerControler from './PlayerControler.vue'
import PlayerList from './PlayerList.vue'
import { _getMusicById } from '../../api/found'
import { _getMusicDetail } from '../../api/discover'
import { mapGetters } from 'vuex'
export default {
  components: { PlayerArt, PlayerControler, PlayerList },
  created () {
    this._getIdList(); //获取ID集合
  },
  mounted () {
    this.$bus.$on('sendId', (id) => { this.getSong(id) })
    this.$bus.$on('listSong', (info, index) => {
      this.index = index; // 获取歌曲在歌单中的index
      this.getSong(info.songId);
    });
    this.$bus.$on('IdFromSearch', (id) => {
      this.getSong(id);
    });
    this.$bus.$on('preMusic', (value) => {
      this.changeMusic(value);
    });
    this.$bus.$on('nextMusic', (value) => {
      this.changeMusic(value);
    })
  },
  watch: {
    currentId (newV, oldV) {
      if (newV) {
        this.getSong(newV)
      }
    }
  },
  data () {
    return {
      songInfo: {
        songName: '',
        musicUrl: '',
        picUrl: '',
        songDetail: '',
        songer: '',
        songId: '',
      },
      idList: [],
      currentId: '',
      index: '',
      length: '',
      init: 0
    }
  },
  computed: {
    ...mapGetters({ songIdInfo: 'getSongInfo' })
  },
  methods: {
    async getSong (id) {
      this.songInfo.songId = id;
      // 音乐url
      const { data: res } = await _getMusicById(id)
      // 音乐URL
      this.songInfo.musicUrl = res.data[0].url
      // 获取音乐详情
      const { data: result } = await _getMusicDetail(id)
      // console.log(result);
      // 歌名
      this.songInfo.songName = result.songs[0].name;
      // 歌曲图片
      this.songInfo.picUrl = result.songs[0].al.picUrl;
      // 歌曲详情
      this.songInfo.songDetail = result.songs[0].alia;
      // 歌手
      this.songInfo.songer = result.songs[0].ar[0].name;
      this.$store.dispatch('SaveSongInfo', this.songInfo);
    },
    //获取歌曲对象的ID属性
    _getIdList () {
      this.idList = this.songIdInfo.map(item => {
        return item.songId;
      })
      this.length = this.idList.length
    },
    // 切换歌曲ID 实现切换歌曲
    changeMusic (value) {
      if (value == '2') {
        if (this.idList[this.index + 1]) {
          this.currentId = this.idList[this.index + 1];
          this.index++;
        } else {
          this.currentId = this.idList[this.init]
        }
      } else {
        if (this.idList[this.index - 1]) {
          this.currentId = this.idList[this.index - 1]
          this.index--;
        } else {
          this.currentId = this.idList[this.length - 1]
        }
      }
    }
  },
}
</script>

<style scoped>
.play-box {
  display: flex;
}
.player-list {
  flex: 1;
}
</style>