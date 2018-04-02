import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import auth from '@/auth/AuthService.js'

const whiteList = ['/login', '/callback'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (auth.isAuthenticated()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.site_id === 0 && to.path !== '/new_site') {
        next({ path: '/new_site' })
      } else if (store.getters.email.length === 0) {
        store.dispatch('SetProfile').then(res => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
