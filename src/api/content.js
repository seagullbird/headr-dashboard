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

export function newPost(site_id, post) {
  return request({
    url: '/contentmgr/posts/',
    method: 'post',
    data: {
      site_id: site_id,
      title: post.title,
      date: post.date,
      content: post.content,
      summary: post.summary,
      tags: post.tags
    }
  })
}

export function deletePost(post_id) {
  return request({
    url: '/contentmgr/posts/' + post_id,
    method: 'delete'
  })
}
