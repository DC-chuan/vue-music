import axios from "axios";
// 全局axios配置
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if(token){
        config.headers.common['Authorization'] = token
    }
return config;
},error => {
// Do something with request error
console.log('你的token不对劲哦');
return Promise.reject(error);
});