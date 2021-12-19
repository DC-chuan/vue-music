<template>
      <div class="recommend-box">
      <div class="recommend-header">
          <span style="font-size:20px; cursor:default ;" >推荐歌单</span>
          <span class="getMoreMusicList">更多<i class="el-icon-arrow-right"></i></span>
      </div>
      <div class="recommend-music-list">
          <div class="recommend-music-item"  v-for="(item,index) in musicForm" :key="index" >
                   <div  class="recommend-discribe"  ref='item'>{{item.copywriter}}</div>
                    <template  v-if="item">
                        <img :src="item.picUrl" 
                        @click="detail(item.id)" 
                        @mouseover="controlHidden(index)" 
                        @mouseleave="controlShow(index)">
                    </template>
                <div class="recommend-music-detail">{{item.name}}</div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:['musicForm'],
    methods:{
        detail(id){
            this.$router.push({
                name:'/musicdetail',
                params:{id:id}
            })
        },
        controlHidden(index){
            this.$refs.item[index].className = 'transitionShow'
        },   
        controlShow(index){
            this.$refs.item[index].className = 'transitionHidden'
        } 
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
        position: relative;
        overflow: hidden;
    }
    .recommend-discribe{
        display: none;
        position: absolute;
        color: floralwhite;
        text-align: center;
        font-size: 13px;
        line-height: 30px;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);

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
    .transitionHidden{
        display: none;
    }
    .transitionShow{
        opacity: 0.8;
        background-color: rgb(114, 113, 113);
        position: absolute;
        color: floralwhite;
        text-align: center;
        font-size: 13px;
        line-height: 30px;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
    }
</style>