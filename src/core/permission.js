import router from '@/router'

router.beforeEach((to, from, next) => {
    console.log('路由前置导航')
    next()
})

router.afterEach((to, from) => {
    console.log('路由后置导航')
})
