import axios from "axios";
import qs from 'qs'

// 引入axios默认配置信息
import './http'

// 获取验证码
export const getAuth = (phone=>{
    return axios({
        method:'get',
        url:'captcha/sent',
        params:{
            phone
        }
    })
})

// 验证验证码是否正确
export const verifyCode = ((phone,captcha)=>{
    return axios({
        method:'get',
        url:'captcha/verify',
        params:{
            phone,
            captcha
        }
    })
})