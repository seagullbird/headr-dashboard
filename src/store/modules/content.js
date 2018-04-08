import { getAllPosts, getPost, newPost, deletePost, patchPost } from '@/api/content'

const content = {
  state: {},
  mutations: {},
  actions: {
    GetAllPosts({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAllPosts().then(res => {
          resolve(res.data.post_ids)
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetPost({ commit, state }, post_id) {
      return new Promise((resolve, reject) => {
        getPost(post_id).then(res => {
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    NewPost({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        newPost(params.site_id, params.post).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    DeletePost({ commit, state }, post_id) {
      return new Promise((resolve, reject) => {
        deletePost(post_id).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    PatchPost({ commit, state }, post) {
      return new Promise((resolve, reject) => {
        patchPost(post).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default content
