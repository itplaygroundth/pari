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
  method: 'POST',
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
  }
}
