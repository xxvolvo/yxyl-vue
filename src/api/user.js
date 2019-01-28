import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    UserNameOrEmailAddress: userName,
    password
  }
  return axios.request({
    url: '/api/TokenAuth/Authenticate',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/api/services/app/Session/GetCurrentLoginInformations',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getAbpUserConfiguration = () => {
  return axios.request({
    url: '/AbpUserConfiguration/GetAll',
    method: 'get'
  })
}

export const getAll = ({ skipCount, maxResultCount }) => {
  return axios.request({
    url: '/api/services/app/User/GetAll',
    params: { skipCount, maxResultCount },
    method: 'get'
  })
}
