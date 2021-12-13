<template>
    <div class="discover-box" v-loading="loading" element-loading-text="拼命加载中">
      <div class="discover-banner" >
          <Swiper :banner= 'banner' ref="swiper" /> 
      </div>
      <div class="discover-recommend">
          <RecommendList :musicForm= 'musicForm' />
      </div>
      <div class="person-send">
          <PersonSend :sendResult='sendResult'/>
      </div>
      <div class="discover-footer">
           据说    只要我滑的够快   寂寞就追不上我
      </div>
    </div>
</template>

<script>
import {_getBanner,_getMusicForm,_getPernsonSend} from '../api/discover'
import Swiper from '../components/common/Swiper.vue'
import RecommendList from '../components/common/RecommendList.vue'
import PersonSend from '../components/common/PersonSend.vue'
export default {
    components:{Swiper,RecommendList,PersonSend},
    async beforeCreate(){
        const {data:res} = await _getBanner()
        this.banner = res.banners
        this.loading=false
        const {data:data} = await _getMusicForm(10)
        this.musicForm = data.result
        console.log(data.result);
        const {data:url} = await _getPernsonSend(3)
        console.log(url);
        this.sendResult = url.result
    },
    data(){
        return{
            banner:[],
            musicForm:[],
            sendResult:[],
            loading:true
        }
    },
    methods:{
        changeLoading(){

        }
    }
}
</script>

<style scoped>
    .discover-box{
        padding: 0 15px;
        width: 100%;
        background-color: #16181C;
        height: 100%;
        overflow: hidden;
        width: 1320px !important;
        overflow: scroll;
        overflow-x: hidden;
    }
    .discover-banner{
        margin-top: 10px;
    }
    /* 滚动条样式 不显示滚动条 */
   ::-webkit-scrollbar {
        width: 6px;
        background-color: #ffffff;
        display: none;
    }
    .discover-footer{
        background-image: linear-gradient( to right,#8FBEB9,#76C2C2,#4EC7D0,#33BEE5);
        margin: 75px 0 30px 0;
        width: 100%;
        line-height: 50px;
        text-align: center;
        color: rgb(238, 237, 225);
        letter-spacing: 2px;
        border-radius: 8px;
        opacity: 0.8;
        cursor: default;
    }
</style>