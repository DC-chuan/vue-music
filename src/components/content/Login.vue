<template>
    <div class="login-box">
        <div v-if="!logined">
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
                <at-input v-model="loginForm.password" type="password" placeholder="请输入密码" size='large' @blur="validPass(loginForm.password)">
                    <template slot="prepend">
                        <i class="iconfont icon-password"></i>
                    </template>
                </at-input>
                <div v-show="checkPass" class="authMessage">{{passErr}}</div>
            </div>
            <div class="login-button">
            <at-button type="error" style="width:80%" @click="login">立即登录</at-button>
            </div>
        </div>
        <div v-if="logined" class="logined">
             <div class="longin-cancel clearfix" >
                
                <i class="icon icon-x " @click.stop="cancelLogin"></i>
            </div>
            <div class="avater">
                <img :src="avater" alt="">
                <div>{{nickname}}</div>
            </div>
           <div class="logout">
               <at-button type="error" @click="logout">退出登录</at-button>
           </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getAuth,verifyCode, _login ,_logout} from '../../api/user'
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
            authErr: false,
            passErr:'',
            checkPass:false,
            logined: this.$store.state.logined
            
        }
    },
    computed:{
        ...mapGetters({avater:'getAvater',nickname:'getNickName'}),
    },
    methods:{
        cancelLogin(){
            this.$emit('cancelLogin')
            this.loginForm.phone = ''
            this.loginForm.password = ''
            this.loginForm.auth = ''
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
        validPass(value){
            if(value.length > 8 && value.length <16){
                 this.checkPass = false
                 return true
            }else{
                this.checkPass = true
                this.passErr = '请输入8到 16位密码'
                return false
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
        },
        // 登录
        async login(){
            const formData = {
                phone:this.loginForm.phone,
                password:this.loginForm.password
            }
            if(!this.checkMobie(formData.phone)) return
            if(!this.validPass(formData.password)) return
            const {data:res} = await _login(formData)
            this.$process.start() //开整
            console.log(res);
            if(res.code !== 200){
                this.$process.error()
                return  this.$Message.error('密码错误');
            }
            this.logined = true
            this.$store.commit('addUser',res);
            this.$store.commit('isLogin')
            this.$emit('cancelLogin')
            this.$process.finish()
            this.$Message.success('登陆成功')
            localStorage.setItem('cookie',res.cookie);
            localStorage.setItem('avater',res.profile.avatarUrl);
            localStorage.setItem('uid',res.profile.userId)
            localStorage.setItem('nickname',res.profile.nickname)
        },
        // 退出登录
        async logout(){
            const {data:res} = await _logout()
            if(res.code !== 200) return this.$Message.error('您的网络开小差了')
            this.$Message.success('退出成功')
            this.$emit('cancelLogin')
            this.logined = false
            this.$store.commit('logout')
        }
        
    },
    mounted() {
            console.log(this.$store);
        },
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
    z-index: 9999;
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

.logined{
    display: flex;
    flex-direction: column;
    align-content: space-around;
    text-align: center;
    justify-content: space-around;
}
.logined img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
.avater{
    flex-flow: column;
    height: 250px;
}
.logout{
    padding-top: 40px;
    flex: 1;
    height: 244px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>