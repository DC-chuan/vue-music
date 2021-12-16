<template>
  <div class="play-list">
      <div class="rencentPlay-box" v-show="clickFlag">
        
      </div>
      <div class="list-btn" @click="clickFlag = !clickFlag"><i class="iconfont icon-bofangduilie"></i></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickFlag:false
    }
  },
}
</script>

<style scoped>
.play-list{
  position: relative;
  margin-left: 30px;
  padding-top: 15px;
}
.list-btn i {
  cursor: pointer;
  font-size: 25px;
}
.list-btn i:hover{
  color: aqua;
}
.rencentPlay-box{
  position: absolute;
  width: 400px;
  height: 600px;
  background-color: #ccc;
  transform: translate(-52%,-103%);
}
</style>