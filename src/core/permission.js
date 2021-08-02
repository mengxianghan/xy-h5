import router from '@/router'
import NProgress from '@/utils/nprogress'

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})
