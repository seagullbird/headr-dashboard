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

export function getSiteConfig(site_id) {
  return request({
    url: '/sitemgr/sites/config/' + site_id,
    method: 'get'
  })
}

export function updateSiteConfig(site_id, config) {
  return request({
    url: '/sitemgr/sites/config/' + site_id,
    method: 'put',
    data: {
      config
    }
  })
}

export function getThemes(site_id) {
  return request({
    url: '/sitemgr/sites/themes/?site_id=' + site_id,
    method: 'get'
  })
}
