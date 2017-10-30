// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//程序入口文件，加载各种公共组件
import Vue from 'vue' //引入vue
import App from './App' //应用相同目录下的App(App.vue)文件
import router from './router'//应用相同目录下的router文件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  router, //定义router组件（路由组件）
  template: '<App/>',//模块组件App.vue
  components: { App }//应用组件App.vue
})
