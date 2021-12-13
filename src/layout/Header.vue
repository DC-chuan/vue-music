<template>
    <div class="header-box">
       <div class="header">
           <div class="header-icon">
                <i class="icon icon-gitlab"></i>
                <span>随心音乐</span>
            </div>
           
           <div class="button-group">
               <at-button-group>
                    <at-button class="ahead-back"><i class="icon icon-chevron-left" @click="go(-1)"></i></at-button>
                    <at-button class="ahead-back"><i class="icon icon-chevron-right" @click="go(1)"></i></at-button>
                </at-button-group>
           </div>
           <div class="header-input">
                <at-input  placeholder="请输入内容" append-button>
                    <template slot="append">
                        <i class="icon icon-search"></i>
                    </template>
                </at-input>
           </div>
           <div class="thyme-login">
               <at-button-group>
                   <at-dropdown placement="bottom-right" >
                        <at-button class="thyme-btn" ><i class="iconfont icon-zhuti"></i></at-button> 
                        <at-dropdown-menu slot="menu">
                            <at-dropdown-item name="blue">天际蓝</at-dropdown-item>
                            <at-dropdown-item name="pink">可爱粉</at-dropdown-item>
                            <at-dropdown-item name="#3BA776" >清新绿</at-dropdown-item>
                        </at-dropdown-menu>
                    </at-dropdown>  
                    <at-button class="login-btn"  @click="handelLogin"><i class="iconfont icon-denglu-copy"></i></at-button>
                    <at-button class="login-btn login-btn2"><a href="https://github.com/DC-chuan"><i class="icon icon-github"></i></a></at-button>
                </at-button-group>
           </div>
           <!-- 登录组件 -->
           
        </div> 
       <transition name="el-fade-in">
            <Login v-show="isLogin" ref="login"/>
       </transition>
    </div>
</template>

<script>
import Login from '../components/content/Login.vue'
export default {
    name:'Header',
    components:{Login},
    data(){
        return{
            inputValue2:'',
            isLogin:false
        }
    },
    methods:{
        handelLogin(){
            this.isLogin = !this.isLogin
        },
        go(index){
            this.$store.commit('savePath',index)
            this.$router.go(index)
        }
    },
    mounted(){
        // 监听取消登录操作
        this.$refs.login.$on('cancelLogin',this.handelLogin)
    }
}
</script>

<style scoped>
    .header-box{
        height: 50px;
        width: 100%;
        background-color: #212124;
        color: aliceblue;
        border-bottom: 3px solid red;
    }
    .header{
        display: flex;
        width: 1100px;
        margin: 0 auto   ;
        line-height: 50px;
        font-size: 20px;
        align-items: center;
    }
    .header-icon{
        width: 180px;
    }
    .header-icon span{
        margin-left: 5px;
    }
    .header-input{
        margin-left: 70px;
        width:30%;
        height: 40px;
    }
    .button-group{
        margin-left: 30px;
        width: 10%;
    }
    .at-input{
        margin-top: 5px;
    }
    .ahead-back{
        color: aliceblue;
        background-color: #212124;
        margin-left:3px;
        width: 10px;
        text-align: center;
        line-height:2px ;
        border: 1px solid #4f4f4f;
    }
    
    .thyme-login{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      opacity: 0.5;
      z-index: 999;
    }
    .thyme-btn,
    .login-btn{
        height: 38px;
        width: 50px;
        background-color: #212124;
        border: 1px solid #4f4f4f;
        margin-top: 5px;
        align-items: center;
        color: cyan;
    }
    .ahead-back:hover,
    .thyme-btn:hover,
    .login-btn:hover{
        background-color: #212124;
        border: 1px solid cyan;    
    }
    .login-btn{
        margin-left: 30px;
    }
    .login-btn2 a{
        text-decoration: none;
    }
    .at-dropdown-menu{
        color: black;
    }
</style>
