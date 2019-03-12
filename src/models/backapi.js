import Axios from 'axios'
const baseDomain = 'https://vps434.vpshispeed.net'
const baseUrl = baseDomain + '/sapi'
const getAuthHeader = async () => {
  return {
    'Authorization': `bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json;charset=UTF-8',
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
export default {
  uploadimg (data) {
    Axios.post(baseUrl + '/photos/upload', data, requestOptions).then(result => {
      return result
    })
  }
}
