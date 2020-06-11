import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'zico/css/zico.min.css'
import moment from 'moment'

import './assets/css/app.css'

Vue.config.productionTip = false

Vue.prototype.$http=axios;
moment.locale('zh-cn');
Vue.prototype.$moment=moment;

Vue.use(ElementUI)

axios.interceptors.response.use(res => { // 401的情况下表示验证未通过直接到error
  return res
}, error => {
  if (error.response.status === 401) {
    // console.log('123')
    router.push({ path: '/login' })
  }
  return Promise.reject(new Error(error))
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
