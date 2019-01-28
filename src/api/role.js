import axios from '@/libs/api.request'

export const getAll = ({ skipCount, maxResultCount }) => {
  return axios.request({
    url: '/api/services/app/Role/GetAll',
    params: { skipCount, maxResultCount },
    method: 'get'
  })
}
