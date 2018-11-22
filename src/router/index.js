import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import confirmed from '@/components/confirmed'
import view_all from '@/components/view_all'
import layout from '@/components/layout'

import editInvitat from '@/components/edit_Invitat'
import add_new from '@/components/add_new'
import Cip from '@/components/test/cip'
import Ramo from '@/components/test/ramo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/confirmed',
      name: 'confirmed',
      component: confirmed
    },
    {
      path: '/view_all',
      name: 'view_all',
      component: view_all
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    },
    {
      path: '/add_new',
      name: 'add_new',
      component: add_new
    },
    {
      path: '/editInvitat/:gid',
      name: 'editInvitat',
      component: editInvitat
    },
    {
      path: '/cip',
      name: 'Cip',
      component: Cip
    },
    {
      path: '/ramo',
      name: 'Ramo',
      component: Ramo
    }
  ]
})
