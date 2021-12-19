import Vue from "vue";
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const state = {
    path: 'discover',
    cookie: '',
    avatar: null,
    uid: '',
    user: null,
    nickname: null,
    logined: false,
    songInfo: [],
}

const actions = {
    SaveSongInfo(context,value){
        // 如果数组中已经有了这一项 就不保存
        if(!context.state.songInfo.some(item=>item.songId == value.songId)){
            if(!(context.state.songInfo.length >20)) return context.commit('SaveSongInfo',value)
            context.commit('FormatSongInfo',value)
        }
    }
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
        state.logined = true;
    },
    logout(state,value){
        state.logined = false;
    },
    //当state中歌曲的 id 数组长度超过二十
    FormatSongInfo(state,value){
        state.songInfo.pop();
        state.songInfo.unshift(value);
    },
    SaveSongInfo(state,value){
        state.songInfo.unshift(value);
    },
    //根据id值删除对应的一项
    removeInfo(state,value){
        const arr = state.songInfo.filter(item=>{
            return item.songId !== value.songId
        })
        state.songInfo = arr
        console.log(arr);
    }
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
    //获取歌曲数据列表
    getSongInfo(state){ 
        return state.songInfo
    },
}

export const plugins = [createPersistedState()]


export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters,
    plugins,
})