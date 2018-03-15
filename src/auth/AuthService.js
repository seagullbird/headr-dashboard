/* eslint-disable */
import auth0 from 'auth0-js'
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'
import store from '../store'
import { setAccessToken, removeAccessToken, setIdToken, removeIdToken, getExpiresAt, setExpiresAt, removeExpiresAt } from '@/auth/utils'

class AuthService {
  authenticated = this.isAuthenticated()
  authNotifier = new EventEmitter()

  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  login () {
    this.auth0.authorize()
  }

  handleAuthentication () {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        router.replace('Dashboard')
      } else if (err) {
        router.replace('Dashboard')
        console.log(err)
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
    })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    setAccessToken(authResult.accessToken)
    setIdToken(authResult.idToken)
    setExpiresAt(expiresAt)
    this.authNotifier.emit('authChange', { authenticated: true })
  }

  logout () {
    // Clear access token and ID token from local storage
    removeAccessToken('access_token')
    removeIdToken('id_token')
    removeExpiresAt('expires_at')
    this.authNotifier.emit('authChange', false)
    // navigate to the Dashboard route
    router.replace('Dashboard')
  }

  isAuthenticated () {
    let expiresAt = JSON.parse(getExpiresAt())
    return new Date().getTime() < expiresAt
  }
}

export default new AuthService()