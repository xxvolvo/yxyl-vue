import { getAll } from '@/api/role'

export default {
  state: {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    list: [],
    loading: false
  },
  mutations: {
    setList(state, { list, totalCount }) {
      state.list = list
      state.totalCount = totalCount
    },
    setCurrentPage(state, { currentPage }) {
      state.currentPage = currentPage
    }
  },
  actions: {
    getAll({ commit, state }, { page }) {
      let skipCount = (page - 1) * state.pageSize
      let maxResultCount = state.pageSize
      getAll({ skipCount, maxResultCount }).then(res => {
        commit('setCurrentPage', { currentPage: page })
        commit('setList', { list: res.items, totalCount: res.totalCount })
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
