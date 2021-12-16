<template>
  <div >
      <div class="footer-box">
          <Player/>
      </div>
  </div>
</template>

<script>
import Player from '../components/player/Player.vue'
export default {
    name:'Footer',
    components:{Player}
}
</script>

<style scoped>
    .footer-box{
        width: 1536px;
        height: 63px;
        background-color: #1f1f22;
        padding: 0 15px;
    }

</style>