import Axios from 'axios'

const baseDomain = 'https://vps434.vpshispeed.net'
const baseUrl = baseDomain + '/sapi'
const getAuthHeader = async () => {
  return {
    'Authorization': `bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'DELETE, HEAD, GET, OPTIONS, POST, PUT',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Content-Range, Content-Disposition, Content-Description',
    'Access-Control-Max-Age': '1728000'
  }
}
const requestOptions = {
  headers: getAuthHeader()
}
const handleResponse = (response) => {
  const data = response.data
  if (!response.data) {
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }
  return data
}
export default {
  uploadimg (data) {
    return Axios.post(baseUrl + '/photos/upload', data, requestOptions).then(handleResponse)
  },
  save (data) {
    return Axios.post(baseUrl + '/itemx', data, requestOptions).then(handleResponse)
  },
  login (data) {
    return Axios.post(baseUrl + '/getdb', data, requestOptions).then(handleResponse)
  },
  addmo (data) {
    return Axios.post(baseUrl + '/item/model', data, requestOptions).then(handleResponse)
  },
  getmodels () {
    return Axios.get(baseUrl + '/model', requestOptions).then(handleResponse)
  }
}
