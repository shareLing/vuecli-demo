import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/TodoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todoList',
      component: TodoList
    }
  ]
})
