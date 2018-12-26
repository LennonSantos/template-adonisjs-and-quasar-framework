/*
export function someMutation (state) {
}
*/

export function login (state) {
  state.loggedIn = true
}

export function logout (state) {
  state.loggedIn = false
}

export function user (state, obj) {
  state.user = obj
}

export function attempt (state, value) {
  state.attempt = value
}
