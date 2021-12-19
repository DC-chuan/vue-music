import axios from "axios";
import './http'


// 根据音乐的id值获取歌曲URL  /song/url?id=33894312
export const _getMusicById = (...rest)=>{
    return axios({
        method:'get',
        url:'song/url',
        params:{
            id: rest
        }
    })
}

// 获取歌曲详情信息
export const _getMusicDetail = (...rest)=>{
    return axios({
        method:'get',
        url:`song/detail?ids=${rest}`,  
    })
}

// 根据关键词搜索
export const _search = (keywords) =>{
    return axios({
        method:'get',
        url:'search',
        params:{
            keywords
        }
    })
}
