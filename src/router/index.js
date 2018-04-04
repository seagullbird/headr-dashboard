import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/auth/components/Login/index'), hidden: true },
  { path: '/callback', component: () => import('@/auth/components/Callback/index'), hidden: true },
  { path: '/new_site', component: () => import('@/views/new_site/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/content',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Content',
        component: () => import('@/views/content/index'),
        meta: { title: 'Content', icon: 'form' }
      }
    ]
  },

  {
    path: '/content',
    component: Layout,
    hidden: true,
    children: [{
      name: 'NewPost',
      path: 'new_post',
      component: () => import('@/views/content/new_post'),
      meta: { title: 'New Post' }
    }]
  },

  {
    path: '/settings',
    component: Layout,
    redirect: '/settings/theme',
    name: 'Settings',
    meta: { title: 'Settings', icon: 'example' },
    children: [
      {
        path: 'theme',
        name: 'Theme',
        component: () => import('@/views/theme/index'),
        meta: { title: 'Theme', icon: 'table' }
      },
      {
        path: 'site',
        name: 'Site',
        component: () => import('@/views/site_settings/advanced'),
        meta: { title: 'Site', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

