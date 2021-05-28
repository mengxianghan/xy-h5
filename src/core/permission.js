import router from '@/router'
import store from '@/store'
import {isWeixin} from '@/utils/validate'
import {clearQuery} from '@/utils/util'

// 检查数据初始化是否完成
function checkComplete(callback) {
    if (store.getters['app/complete']) {
        // 加载完成
        callback.call(this)
    } else {
        // 未加载完成
        store.dispatch('app/init').then(() => {
            callback.call(this)
        })
    }
}

router.beforeEach((to, from, next) => {
    const {
        query: {code = '', state = ''},
        meta: {
            title = process.env.VUE_APP_TITLE,
            requiredLogin = false
        }
    } = to
    const {href} = router.resolve(to)
    const url = location.origin + href

    document.title = title

    // 是否需要登录
    if (requiredLogin) {
        // 需要登录

        // 是否登录
        if (store.getters['user/isLogin']) {
            // 已登录
            checkComplete(() => {
                next()
            })
        } else {
            // 未登录
            // TODO: 登录逻辑
            // 判断是否微信浏览器
            if (isWeixin()) {
                // 判断微信授权状态
                if (code && state === 'wxauth') {
                    // 已授权
                    // TODO: 获取用户信息后跳转响应页面

                    // 清理 url 中的 code 和 state 参数，防止重复授权
                    window.location.href = clearQuery(location.href, ['code', 'state'])
                } else {
                    // 还未跳转过授权
                    if (state === 'wxauth') {
                        // 拒绝授权
                        // TODO: 拒绝授权的逻辑，默认跳转错误页面
                        next({
                            name: 'error',
                            query: {
                                title: encodeURIComponent('拒绝授权'),
                                description: encodeURIComponent('授权失败，请重新授权')
                            },
                            replace: true
                        })
                    } else {
                        // 跳转授权
                        store.dispatch('auth/weixin', {
                            appId: process.env.VUE_APP_WX_APP_ID,
                            redirectUri: encodeURIComponent(url)
                        })
                    }
                }
            }

        }
    } else {
        // 不需要登录
        checkComplete(() => {
            next()
        })
    }


})

router.afterEach(() => {

})
