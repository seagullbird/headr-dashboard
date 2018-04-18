import { getSiteConfig, updateSiteConfig, getThemes, updateTheme, updateAbout, getAbout } from '@/api/site'

const content = {
  state: {
  },
  mutations: {
  },
  actions: {
    GetSiteConfig({ commit, state }, site_id) {
      return new Promise((resolve, reject) => {
        getSiteConfig(site_id).then(res => {
          resolve(res.data.config)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateSiteConfig({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        updateSiteConfig(params.site_id, params.config).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetThemes({ commit, state }, site_id) {
      return new Promise((resolve, reject) => {
        getThemes(site_id).then(res => {
          resolve(JSON.parse(res.data.themes))
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateTheme({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        updateTheme(params.site_id, params.theme).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UpdateAbout({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        updateAbout(params.site_id, params.content).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAbout({ commit, state }, site_id) {
      return new Promise((resolve, reject) => {
        getAbout(site_id).then(res => {
          resolve(res.data.content)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default content
