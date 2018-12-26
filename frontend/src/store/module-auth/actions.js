/*
export function someAction (context) {
}
*/
import axios from 'axios'

export function login ({commit, state}, data) {
  commit('login')
  commit('user', data.user[0])
  commit('attempt', data.attempt)
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.attempt.token
}
