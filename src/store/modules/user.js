import storage from '@/utils/storage'

const state = {
    isLogin: storage.getIsLogin(false),
    userInfo: storage.getUserInfo(null),
    token: storage.getToken(''),
    isAuth: storage.getIsAuth(false),
    authType: storage.getAuthType('')
}

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    token: state => state.token,
    isAuth: state => state.isAuth,
    authType: state => state.authType
}

const mutations = {
    /**
     * 设置登录状态
     * @param state
     * @param {boolean} isLogin 是否登录
     * @constructor
     */
    SET_IS_LOGIN(state, isLogin = false) {
        state.isLogin = isLogin
        isLogin ? storage.setIsLogin(isLogin) : storage.removeIsLogin()
    },
    /**
     * 设置用户信息
     * @param state
     * @param {object} userInfo 用户信息
     * @constructor
     */
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
        userInfo ? storage.setUserInfo(userInfo) : storage.removeUserInfo()
    },
    /**
     * 设置 token
     * @param state
     * @param {string} token
     * @constructor
     */
    SET_TOKEN(state, token = '') {
        state.token = token
        token ? storage.setToken(token) : storage.removeToken()
    },
    /**
     * 设置授权状态
     * @param state
     * @param isAuth
     * @constructor
     */
    SET_IS_AUTH(state, isAuth = false) {
        state.isAuth = isAuth
        storage.setIsAuth(isAuth)
    },
    /**
     * 设置授权类型
     * @param state
     * @param authType
     * @constructor
     */
    SET_AUTH_TYPE(state, authType = '') {
        state.authType = authType
        storage.setAuthType(authType)
    }
}

const actions = {
    /**
     * 登录
     * @param commit
     * @param params
     * @return {Promise<unknown>}
     */
    async login({commit}, params) {
        return new Promise((resolve, reject) => {

        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
