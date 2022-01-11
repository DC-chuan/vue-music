import Vue from 'vue'
import App from './App.vue'

import './element/atui'
import './element/elementui'
import './element/ivew'

import 'at-ui-style'
import 'animate.css';

import router from './router/index'
import store from './vuex/store'
// 引入全局样式
import './assets/css/global.css'
//引入view-desion样式
import 'view-design/dist/styles/iview.css'
// 引入字体图标
import './assets/font/iconfont.css'
// 引入插件
import './plugins/index'

Vue.config.productionTip = false

new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  store,
  router,
  render: h => h(App),
}).$mount('#app')
