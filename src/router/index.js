import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import Discover from '../views/Discover.vue'
Vue.use(VueRouter)
const routes = [
    { path:'/discover',component: Discover},
    { path:'/musicDetail'}
]

const router = new VueRouter({
    routes
})

export default router