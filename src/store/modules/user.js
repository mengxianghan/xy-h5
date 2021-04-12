/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-21
 * @description: user
 */

import storage from '@/utils/storage'

const state = {
    isLogin: storage.getIsLogin(false),
    userInfo: storage.getUserInfo(null),
    token: storage.getToken('')
}

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo,
    token: state => state.token
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
