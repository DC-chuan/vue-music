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