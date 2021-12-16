import axios from "axios";

import './http'

// 获取轮播图
export const _getBanner = ()=>{
    return axios({
        method:'get',
        url:'banner'
    })
}

// 获取推荐歌单列表数据
export const _getMusicForm = (limit)=>{
    return axios({
        method:'get',
        url:'personalized',
        params:{
            limit
        }
    })
}

// 获取歌单详情信息
export const _playlistDetail = (id)=>{
    return axios({
        method:'get',
        url:'playlist/detail',
        params:{id}
    })
}

// 获取歌曲详情信息
export const _getMusicDetail = (...rest)=>{
    return axios({
        method:'get',
        url:`song/detail?ids=${rest}`,  
    })
}

// 获取独家放送信息
export const _getPernsonSend = (limit)=>{
    return axios({
        method:'get',
        url:'personalized/privatecontent/list',
        params:{
            limit
        }
    })
}