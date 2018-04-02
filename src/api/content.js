import request from '@/utils/request'

export function getAllPosts() {
  return request({
    url: '/contentmgr/posts/',
    method: 'get'
  })
}

export function getPost(post_id) {
  return request({
    url: '/contentmgr/posts/' + post_id,
    method: 'get'
  })
}
