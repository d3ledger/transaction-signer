/*
 * Copyright D3 Ledger, Inc. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const lazyComponent = (name) => () => import(`@/components/${name}.vue`)
export const lazyView = (name) => () => import(`@/views/${name}.vue`)

const defaultRouter = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loading',
      component: lazyView('Loading')
    },
    {
      path: '/information',
      name: 'information',
      component: lazyView('Info')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: lazyView('Dashboard')
    },
    {
      path: '/keypair',
      name: 'keypair',
      component: lazyView('KeyPair')
    },
    {
      path: '/create-tx',
      name: 'create-tx',
      component: lazyView('CreateTX')
    },
    {
      path: '/sign-tx',
      name: 'sign-tx',
      component: lazyView('SignTX')
    }
  ]
})

export default defaultRouter
