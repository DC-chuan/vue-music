<template>
    <div class="music-box">
      <div class="music-pic">
        <img :src="info.picUrl" alt="">
      </div>
      <div class="music-detail">
          <div class="music-name">{{info.songName}}</div>
          <div class="music-songer">{{info.songer}}</div>
      </div>
    </div>
</template>

<script>
export default {
  props:['songInfo'],
  data(){
    return{
      info:this.songInfo
    }
  },
  mounted(){
    // box的宽度
  }
}
</script>

<style scoped>
  .music-box{
    height: 63px;
    display: flex;
    align-items: center;
    border-right: 1px solid rgb(67, 73, 78) ;
  }
  .music-pic{
    width: 50px;
    height: 56px;
    display: flex;
    align-items: center;
  }
  .music-pic img{
    width: 50px;
  }
  .music-detail{
    padding: 10px;
    width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .music-name{
    color: lightgrey;
    font-size: 17px;
  }
  .music-songer{
    color: slategray;
    font-size: 13px;
  }
</style>