import { login, getUserInfo, getAbpUserConfiguration, getAll } from '@/api/user'
import abp from '@/libs/abp.js'

export default {
  namespaced: true,
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: abp.auth.getToken(),
    access: '',
    hasGetInfo: false,
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    list: [],
    loading: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, { token, tokenExpireDate }) {
      state.token = token
      abp.auth.setToken(token, tokenExpireDate)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setList (state, { list, totalCount }) {
      state.list = list
      state.totalCount = totalCount
    },
    setCurrentPage (state, { currentPage }) {
      state.currentPage = currentPage
    },
    setLoading (state) {
      state.loading = !state.loading
    },
    setPageSize (state, { pageSize }) {
      state.pageSize = pageSize
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password, rememberMe }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res
          let tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * data.expireInSeconds)) : undefined
          commit('setToken', { token: data.accessToken, tokenExpireDate })
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return Promise.all([getUserInfo(), getAbpUserConfiguration()]).then(res => {
        const data = res[0].user
        commit('setUserName', data.name)
        commit('setUserId', data.id)
        commit('setHasGetInfo', true)
        const grantedPermissions = res[1].auth.grantedPermissions
        let grantedPermissionsArry = Object.entries(grantedPermissions)
        const newgrantedPermissionsArry = grantedPermissionsArry.filter(item => {
          return item[1] === 'true'
        })
        commit('setAccess', newgrantedPermissionsArry.map(item => {
          return item[0]
        }))
      }).catch((err) => {
        return err
      })
    },
    getList ({ commit, state }, { page }) {
      commit('setLoading')
      let skipCount = (page - 1) * state.pageSize
      let maxResultCount = state.pageSize
      getAll({ skipCount, maxResultCount }).then(res => {
        commit('setCurrentPage', { currentPage: page })
        commit('setList', { list: res.items, totalCount: res.totalCount })
        commit('setLoading')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
