import { getAll, _delete } from '@/api/role'

export default {
  namespaced: true,
  state: {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    list: [],
    loading: false,
    extend: {}
  },
  mutations: {
    setList(state, { list, totalCount }) {
      state.list = list
      state.totalCount = totalCount
    },
    setCurrentPage(state, { currentPage }) {
      state.currentPage = currentPage
    },
    setLoading(state) {
      state.loading = !state.loading
    },
    setPageSize(state, { pageSize }) {
      state.pageSize = pageSize
    },
    setExtend(state, { extend }) {
      state.extend = extend
    }
  },
  actions: {
    getList({ commit, state }, { page }) {
      commit('setLoading')
      let skipCount = (page - 1) * state.pageSize
      let maxResultCount = state.pageSize
      var model = { skipCount, maxResultCount }
      if (state.extend) {
        Object.assign(model, state.extend)
      }
      getAll(model).then(res => {
        commit('setCurrentPage', { currentPage: page })
        commit('setList', { list: res.items, totalCount: res.totalCount })
        commit('setLoading')
      }).catch(error => {
        console.log(error)
      })
    },
    delete({ dispatch, commit, state }, { Id }) {
      var page = state.currentPage
      _delete({ Id }).then(() => {
        dispatch('getList', { commit, state, page })
      })
    }
  }
}
