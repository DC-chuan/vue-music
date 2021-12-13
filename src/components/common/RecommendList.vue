<template>
  <div class="recommend-box">
      <div class="recommend-header">
          <span style="font-size:20px; cursor:default ;">推荐歌单</span>
          <span class="getMoreMusicList">更多<i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="recommend-music-list">
          <div class="recommend-music-item" v-for="(item,index) in musicForm" :key="index">
              <img :src="item.picUrl" alt="">
              <div class="recommend-music-detail">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['musicForm'],
    methods:{
        
    },
}
</script>

<style scoped>
    .recommend-header{
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        color: #CFD0D7;
    }
    .getMoreMusicList{
        line-height: 29px;
        cursor: pointer;
    }
    .recommend-music-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-between;
    }
    .recommend-music-list .recommend-music-item{
         width: 210px;
        /* height: 200px; */ 
        background-color: black;
        margin-left: 10px;
        cursor: pointer;
        
    }
    .recommend-music-list .recommend-music-item:nth-child(1),
    .recommend-music-list .recommend-music-item:nth-child(6){
        margin-left: 0;
    }
    .recommend-music-list .recommend-music-item{
        margin-top: 20px;
    }
    .recommend-music-item img{
        width: 210px;
        height: 220px;
    }
    .recommend-music-detail{
        line-height: 20px;
        padding: 0 5px;
        font-family: SimSun;
        color: #CFD0D7;
    }
</style>