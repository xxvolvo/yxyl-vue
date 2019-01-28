import axios from '@/libs/api.request'

export const getAll = (data) => {
  return axios.request({
    url: '/api/services/app/Role/GetAll',
    params: data,
    method: 'get'
  })
}
