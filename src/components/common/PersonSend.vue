<template>
  <div class="person-send-box">
      <div class="person-send-header">
          <span style="font-size:20px; cursor:default ;">独家放送</span>
      </div>
      <div class="person-send-list">
          <div class="person-send-item" v-for="(item,index) in sendResult" :key="index">
              <div class="person-send-icon"><i class="iconfont icon-shipin"></i></div>
              <img v-lazy="item.sPicUrl" alt="">
              <div class="person-send-detail">{{item.copywriter}}</div>
          </div>
          
      </div>
  </div>
</template>

<script>
export default {
    name:'PersonSend',
    props:['sendResult']
}
</script>

<style scoped>
    .person-send-header{
        margin-top:35px;
        line-height: 20px;
        color: #CFD0D7;
    }
    .person-send-list{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .person-send-item{
        width: 400px;
        height: 250px;
        position: relative;
        cursor: pointer;
    }
    .person-send-item img{
        width: 400px;   
        mask-repeat: repeat;
    }
    .person-send-icon{
        width: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid floralwhite;
        border-radius: 50%;
        position: absolute;
        transform: translate(10px,5px);
        color: floralwhite;
        opacity: 0.7;
        background-color:#333333 ;
    }
    .person-send-icon i{
         font-size: 12px;
    }
    .person-send-detail{
        color: floralwhite;
    }
</style>