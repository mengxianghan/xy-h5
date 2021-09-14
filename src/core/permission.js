import router from '@/router'
import NProgress from '@/utils/nprogress'

router.beforeEach((to, from, next) => {
    NProgress.start()

    const {
        meta: {title}
    } = to

    // 设置页面标题
    if (title) {
        document.title = title
    }

    next()
})

router.afterEach((to, from) => {
    NProgress.done()
})
