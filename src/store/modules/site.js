import { getSiteConfig, updateSiteConfig } from '@/api/site'

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
    }
  }
}

export default content