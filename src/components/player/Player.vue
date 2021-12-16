<template>
    <div class= "play-box">
        <div class="player-art">
            <PlayerArt :songInfo='songInfo'/>
        </div>
        <div class="player-controler">
            <PlayerControler :url='songInfo.musicUrl' />
        </div>
        <div class="player-list">
            <PlayerList/>
        </div>
    </div>
</template>

<script>
import PlayerArt from './PlayerArt.vue'
import PlayerControler from './PlayerControler.vue'
import PlayerList from './PlayerList.vue'
import {_getMusicById, _search } from '../../api/found'
import { _getMusicDetail } from '../../api/discover'
export default {
    components:{PlayerArt,PlayerControler,PlayerList},
    mounted() {
        this.$bus.$on('sendId',(data)=>{
            this.getSong(data)
        })
    },
    // async created(){
    //     // 音乐url
    //     const {data:res} = await _getMusicById(1441897090)
    //     // 音乐URL
    //     this.songInfo.musicUrl = res.data[0].url
    //     // 获取音乐详情
    //     const {data:result} = await  _getMusicDetail(1441897090)
    //     // console.log(result);
    //     // 歌名
    //     this.songInfo.songName = result.songs[0].name
    //     // 歌曲图片
    //     this.songInfo.picUrl = result.songs[0].al.picUrl;
    //     // 歌曲详情
    //     this.songInfo.songDetail = result.songs[0].alia;
    //     // 歌手
    //     this.songInfo.songer = result.songs[0].ar[0].name
    // },
    data() {
        return {
            songInfo:{
                songName:'',
                musicUrl:'',
                picUrl:'',
                songDetail:'',
                songer:''
            }
        }
    },
    methods:{
        async getSong(id){
        const that = this;
            // 音乐url
        const {data:res} = await _getMusicById(id)
        // 音乐URL
        this.songInfo.musicUrl = res.data[0].url
        // 获取音乐详情
        const {data:result} = await  _getMusicDetail(id)
        // console.log(result);
        // 歌名
        that.songInfo.songName = result.songs[0].name
        // 歌曲图片
        that.songInfo.picUrl = result.songs[0].al.picUrl;
        // 歌曲详情
        that.songInfo.songDetail = result.songs[0].alia;
        // 歌手
        that.songInfo.songer = result.songs[0].ar[0].name
        },
        demo(value){
            console.log(value);
        }
    }
}
</script>

<style scoped>
    .play-box{
        display: flex;
    }
    .player-list{
        flex: 1;
    }
</style>