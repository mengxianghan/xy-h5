/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-05-28
 * @description: 授权
 */
import storage from '@/utils/storage'

const state = {
    // 是否授权
    isAuth: storage.getIsAuth(false),
    // 授权类型，区分哪个方式进行的授权
    authType: storage.getAuthType()
}

const getters = {
    isAuth: state => state.isAuth,
    authType: state => state.authType
}

const mutations = {
    /**
     * 设置是否授权
     * @param state
     * @param isAuth
     * @constructor
     */
    SET_IS_AUTH(state, isAuth) {
        state.isAuth = isAuth
        storage.setIsAuth(isAuth)
    },
    /**
     * 设置授权类型
     * @param state
     * @param authType
     * @constructor
     */
    SET_AUTH_TYPE(state, authType) {
        state.authType = authType
        storage.setAuthType(authType)
    }
}

const actions = {
    /**
     * 微信授权
     * @param options
     */
    weixin({}, options = {}) {
        const {appId, redirectUri, responseType, scope, state} = {
            appId: '',
            redirectUri: '',
            responseType: 'code',
            scope: 'snsapi_userinfo',
            state: 'wxlogin',
            ...options
        }
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}#wechat_redirect`
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
