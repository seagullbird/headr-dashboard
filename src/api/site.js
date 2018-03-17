import request from '@/utils/request'

export function sitenameExists(sitename) {
  return request({
    url: '/sitemgr/sitename-exists',
    method: 'post',
    data: {
      sitename
    }
  })
}

export function newSite(email, sitename) {
  return request({
    url: '/sitemgr/create-new-site',
    method: 'post',
    data: {
      email,
      sitename
    }
  })
}
