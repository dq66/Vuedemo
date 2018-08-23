import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import Home from '@/components/Home'
import Type from '@/components/Type'
import User from '@/components/User'
import Xq from '@/components/Xq'
import Abc from '@/components/Abc'
import Ca from '@/components/Ca'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/admin',
    component: Admin,
    children: [{
      path: 'home',
      component: Home
    }, {
      path: 'type',
      name:'type',
      component: Type
    }, {
      path: 'type/xq',
      component: Xq
    }, {
      path: 'user',
      component: User
    }, {
      path: 'cs',
      component: Abc
    }, {
      path: 'aa',
      component: Ca
    }]
  }]
})
