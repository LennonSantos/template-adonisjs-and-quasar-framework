import axios from 'axios'

export default ({ Vue }) => {
  axios.defaults.baseURL = 'http://127.0.0.1:3333'
  axios.defaults.timeout = 10000
  Vue.prototype.$axios = axios
}
