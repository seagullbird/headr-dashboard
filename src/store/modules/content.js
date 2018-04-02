import { getAllPosts, getPost } from '@/api/content'

const content = {
  state: {
    post_ids: [],
    posts: []
  },
  mutations: {
    SET_POST_IDS(state, data) {
      state.post_ids = data
    },
    ADD_POST(state, data) {
      state.posts.push(data)
    },
    CLEAR_POSTS(state, data) {
      state.posts = []
    }
  },
  actions: {
    GetAllPosts({ commit, state }) {
      commit('CLEAR_POSTS')
      return new Promise((resolve, reject) => {
        getAllPosts().then(res => {
          var post_ids = res.data.post_ids
          commit('SET_POST_IDS', post_ids)
          for (let i = 0; i < post_ids.length; i++) {
            getPost(post_ids[i]).then(res => {
              var post = res.data
              post.ID = post_ids[i]
              commit('ADD_POST', post)
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default content
