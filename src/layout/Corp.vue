<template>
    <div class="corp-box">
        <div class="menu-menu">
            <el-menu
                router
                @select="getPath"
                :default-active="path"
                class="el-menu-vertical-demo"
                background-color="#212124"
                text-color="#fff"
                active-text-color="lawngreen">
                <el-menu-item index="discover">
                    <i class="iconfont icon-faxian"></i>
                    <span slot="title">发现</span>
                </el-menu-item>
                <el-menu-item index="2" >
                    <i class="iconfont icon-paihangbang"></i>
                    <span slot="title">榜单</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="iconfont icon-shipin"></i>
                    <span slot="title">MV</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="iconfont icon-woxihuande"></i>
                    <span slot="title">喜欢</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="aside">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'Corp',
    data(){
        return{
           
        }
    },
     methods: {
         getPath(index){
            this.$store.commit('savePath',index)
         }
    },
    computed:{
        ...mapGetters({path:'getPath'})
    }
}
</script>

<style scoped>
    .corp-box{
        display: flex;
    }
    .menu-menu{
        width: 200px;
        height: 640px;
        background-color: #212124;
 
    }
    .el-menu{
        overflow: hidden;
        border: 0 !important;
    }
    .el-menu-item:hover{
        color:  #ffd04b !important;
        transform: translateX(1%);
        transition: linear;
    }
    .el-menu-item span{
        margin-left: 15px;
    }
    .aside{
        width:1342px;
        height: 640px;  
        background-color: #212124;
    }
</style>