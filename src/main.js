import Vue from 'vue'
import App from './App.vue'
import './element/atui'
import './element/elementui'
import 'at-ui-style'
// 引入全局样式
import './assets/css/global.css'
// 引入字体图标
import './assets/font/iconfont.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
