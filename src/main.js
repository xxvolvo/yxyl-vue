// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

// console.log(abp.auth.getToken())

// 实际打包时应该不引入mock
/* eslint-disable */
<<<<<<< HEAD
if (process.env.NODE_ENV !== 'production') require('@/mock')
=======
// if (process.env.NODE_ENV !== 'production') require('@/mock')

>>>>>>> a566c4bd5add1650e20afb1f7112e5f131188952
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

<<<<<<< HEAD
=======
// axios.request({
//   url: '/AbpUserConfiguration/GetAll',
//   method: 'get'
// }).then(res => {
//   console.log(res)
// })
>>>>>>> a566c4bd5add1650e20afb1f7112e5f131188952

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
