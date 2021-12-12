<template>
    <div class="login-box">
        <div class="longin-cancel clearfix" >
            <span>登录</span>
            <i class="icon icon-x " @click.stop="cancelLogin"></i>
        </div>
        <div class="login-img">
           <img src="../../assets/loginimg.png" alt="">
        </div>
        <div class="login-form">
            <at-input v-model="loginForm.phone" placeholder="请输入手机号" size='large' @blur="checkMobie(loginForm.phone)">
                <template slot="prepend">
                    <i class="iconfont icon-shouji"></i>
                </template>
            </at-input>
            <div class="phoneMessage">{{phoneMessage}}</div>
            <at-input 
            v-model="loginForm.auth" 
            placeholder="请输入验证码" 
            append-button size='large'
            @blur="verify()">
                <template slot="append">
                    <at-button 
                    v-show="!isGetting" 
                    type="primary" 
                    size= 'small' 
                    @click="getAuth">点击获取验证码</at-button>
                    <at-button class="disabeldbtn" v-show="isGetting" type="primary" size= 'small' @click="getAuth" disabled>{{count}}s后重新获取</at-button>
                </template>
            </at-input>
            <div v-show="!authPass" class="authMessage">{{authMessage}}</div>
            <div v-show="authPass" class="success">验证码正确<i class="icon icon-check"></i></div>
            <at-input v-model="loginForm.password" type="password" placeholder="请输入密码" size='large' @blur="checkMobie(loginForm.phone)">
                <template slot="prepend">
                    <i class="iconfont icon-password"></i>
                </template>
            </at-input>
        </div>
        <div class="login-button">
           <at-button type="error" style="width:80%">立即登录</at-button>
        </div>
    </div>
</template>

<script>
import {getAuth,verifyCode} from '../../api/user'
export default {
    data(){
        return{
            loginForm:{
                phone:'',
                auth:'',
                password:''
            },
            authMessage:'',
            phoneMessage:'',
            isGetting:false,
            timer:null,
            count:'',
            authPass:false,
            authErr: false
        }
    },
    methods:{
        cancelLogin(){
            this.$emit('cancelLogin')
        },
        checkMobie(value){
             const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
             if(!regMobile.test(value)){
                this.phoneMessage = '请输入合法的手机号'
                return false
            }else{
                this.phoneMessage = ''
                return true
            }
        },
        // 获取验证码
        async getAuth(){
            if(this.checkMobie(this.loginForm.phone)){
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.count = TIME_COUNT;
                this.isGetting = true;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                        } else {
                        this.isGetting = false;
                        clearInterval(this.timer);
                        this.timer = null;
                        }
                    }, 1000)
                } 
                const {data:res} = await getAuth(this.loginForm.phone)
                if(res.code === 200){
                    this.$Message.success('验证码发送成功，请注意查收~')
                }     
            }          
        },
        // 验证码验证规则
        checkAuth(){
             let authLength =this.loginForm.auth.length
             if(authLength !== 4) {
                this.authMessage = '请输入正确的验证码'
                return false
            }else{
                this.authMessage = ''
                return true
            }
        },
        // 验证验证码
        async verify(){
            if(this.checkAuth()){
                const {data:res} = await verifyCode(this.loginForm.phone,this.loginForm.auth)
                console.log(res);
                if(res.code ===200){
                    this.authPass = true
                }
            }
        }

    }
}
</script>

<style scoped>

.login-box{
    position: absolute;
    width: 300px;
    height: 400px;
    background-color: #fafafa;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: black;
    border: 1px solid #ccc;
    box-shadow: 0.1 0 0.3;
}
.longin-cancel{
    width: 100%;
    height: 20px;
    text-align: center;
    margin-top:10px;
}
.longin-cancel i{
    position: absolute;
    right: 10px;
}
.login-img {
    margin-top: 10px;
    width: 300px;
    height: 100px;
    position: relative;
    font-size: 30px;
}
.login-img img{
    width: 200px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
}
.login-form{
    padding: 10px;
    display: flex;
    margin:0 auto;
    height: 120px;
    flex-direction: column;
    height: 160px;
}
.login-button{
    display: flex;
    justify-content: center;
    margin-top: 10px;
}
.phoneMessage,
.authMessage{
    color: red;
    width: 100%;
    height: 21px;
    font-size: 12px;
    padding-left: 20px;
}
.disabeldbtn{
    color: lightcoral !important;
}
.success{
    color: green;
    font-size: 12px;
}
</style>