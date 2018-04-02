import request from '@/utils/request'

export function sitenameExists(site_name) {
  return request({
    url: '/sitemgr/is-sitename-exists',
    method: 'post',
    data: {
      site_name
    }
  })
}

export function newSite(email, site_name) {
  return request({
    url: '/sitemgr/sites/',
    method: 'post',
    data: {
      site_name
    }
  })
}

export function getSiteID() {
  return request({
    url: '/sitemgr/site-id/',
    method: 'get'
  })
}
