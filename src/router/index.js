import Vue from 'vue'
import Router from 'vue-router'
import Cip from '@/components/Cip'
import Ramo from '@/components/Ramo'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Cip',
      component: Cip
    },
    {
      path: '/Cip',
      name: 'HelloWorld',
      component: Cip
    },
    {
      path: '/Ramo',
      name: 'Ramo',
      component: Ramo
    }
  ]
})