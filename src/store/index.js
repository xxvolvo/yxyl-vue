import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import role from './module/role'

Vue.use(Vuex)

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    role
  }
})
