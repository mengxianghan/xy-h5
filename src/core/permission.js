import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
    const {href} = router.resolve(to)
    const url = location.origin + href

    // 微信
    if (window.$xy.validate.isWeixin()) {
        store.dispatch('wx/setConfig', url)
    }

    // 判断预加载数据是否已加载完成
    if (store.getters.complete) {
        // 加载完成
        next()
    } else {
        // 未加载完成
        store.dispatch('app/init').then(() => {
            next()
        })
    }
})

router.afterEach(() => {

})
