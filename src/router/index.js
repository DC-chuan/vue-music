import Vue from "vue";
import VueRouter from "vue-router";
// 引入组件
import Discover from '../views/Discover.vue'
import MusicDetail from '../components/common/MusicDetail.vue'

/**解决router重复报错 */
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const routes = [
    { path: '/' , redirect:'/discover'},
    { path:'/discover',component: Discover},
    { name:'/musicdetail', path:'detail',component: MusicDetail }
]

const router = new VueRouter({
    routes
})

export default router