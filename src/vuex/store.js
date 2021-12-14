import Vue from "vue";
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {
    
}

const mutations = {
    savePath(state,value){
        sessionStorage.setItem('path',value)
    },
    // 保存 用户信息
    addUser(state,userinfo){
        state.user = userinfo;
        state.cookie = userinfo.cookie;
        state.avater = userinfo.profile.avatarUrl;
        state.nickname = userinfo.profile.nickname;
        state.uid = userinfo.profile.userId
    },
    isLogin(state,value){
        state.logined = true
    },
    logout(state,value){
        state.logined = false
    }
}

const state = {
    path: 'discover',
    cookie:'',
    avatar:null,
    uid:'',
    user:null,
    nickname:null,
    logined:false
}

const getters = {
    getPath(state){
        if(sessionStorage.getItem('path')){
            state.path = sessionStorage.getItem('path')
        }
        return state.path
    },
    getAvater(state){
        if(localStorage.getItem('avater')){
            state.avater = localStorage.getItem('avater')
            return state.avater
        }
        return state.avater && state.user.profile.avatarUrl
        
    },
    getNickName(state){
        if(localStorage.getItem('nickname')){
            state.nickname = localStorage.getItem('nickname')
            return state.nickname
        }
        return state.nickname && state.user.profile.nickname
    },
}


export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
})