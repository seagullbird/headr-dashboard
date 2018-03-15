import { getAccessToken, getIdToken, parseIdToken } from '@/auth/utils'
import auth from '@/auth/AuthService.js'

const user = {
  state: {
    access_token: getAccessToken(),
    id_token: getIdToken(),
    email: '',
    name: '',
    avatar: ''
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
    }
  },

  actions: {
    SET_PROFILE({ commit, state }) {
      var info = parseIdToken(getIdToken())
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
    GenerateNewSite({ commit }, newSiteForm) {
      console.log(newSiteForm.sitename)
    }
  }
}

export default user
