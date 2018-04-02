import { sitenameExists, newSite, getSiteID } from '@/api/site'
import { getAccessToken, getIdToken, parseIdToken } from '@/auth/utils'
import auth from '@/auth/AuthService.js'

const user = {
  state: {
    access_token: getAccessToken(),
    id_token: getIdToken(),
    email: '',
    name: '',
    avatar: '',
    site_id: 0
  },

  mutations: {
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, picture) => {
      state.avatar = picture
    },
    SET_SITE_ID: (state, site_id) => {
      state.site_id = site_id
    }
  },

  actions: {
    SET_PROFILE({ commit, state }) {
      var info = parseIdToken(getIdToken())
      // TODO: set site_id from id_token
      commit('SET_EMAIL', info.email)
      commit('SET_NAME', info.nickname)
      commit('SET_AVATAR', info.picture)
    },
    LogIn({ commit, state }) {
      auth.login()
    },
    LogOut({ commit, state }) {
      auth.logout()
    },
    CheckSitenameExists({ commit }, sitename) {
      return new Promise((resolve, reject) => {
        sitenameExists(sitename).then(res => {
          const data = res.data
          resolve(data.exists)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GenerateNewSite({ commit, state }, newSiteForm) {
      var email = state.email
      var sitename = newSiteForm.sitename
      return new Promise((resolve, reject) => {
        newSite(email, sitename).then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetSiteID({ commit, state }) {
      return new Promise((resolve, reject) => {
        getSiteID().then(res => {
          resolve(res.data.site_id)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
