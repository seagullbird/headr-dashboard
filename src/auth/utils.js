import jwt_decode from 'jwt-decode'

export function getAccessToken() {
  return localStorage.getItem('access_token')
}

export function getIdToken() {
  return localStorage.getItem('id_token')
}

export function getExpiresAt() {
  return localStorage.getItem('expires_at')
}

export function setAccessToken(access_token) {
  return localStorage.setItem('access_token', access_token)
}

export function setIdToken(id_token) {
  return localStorage.setItem('id_token', id_token)
}

export function setExpiresAt(expires_at) {
  return localStorage.setItem('expires_at', expires_at)
}

export function removeAccessToken() {
  return localStorage.removeItem('access_token')
}

export function removeIdToken() {
  return localStorage.removeItem('id_token')
}

export function removeExpiresAt() {
  return localStorage.removeItem('expires_at')
}

export function parseIdToken(id_token) {
  return jwt_decode(id_token)
}
