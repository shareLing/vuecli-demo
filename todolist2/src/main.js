// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
// var list=[
//   {name:"HTML5",done:false},
//   {name:"CSS3",done:false},
//   {name:"vue",done:false},
//   {name:"react",done:false}
// ];
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  
})
