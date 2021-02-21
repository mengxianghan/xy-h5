/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-21
 * @description: user
 */

import storage from '@/utils/storage'

const state = {
    isLogin: storage.getIsLogin() || false,
    userInfo: storage.getUserInfo() || null
}

const getters = {
    isLogin: state => state.isLogin,
    userInfo: state => state.userInfo
}

const mutations = {
    SET_IS_LOGIN(state, isLogin = false) {
        state.isLogin = isLogin
        storage.setIsLogin(isLogin)
    },
    /**
     * 设置用户信息
     * @param state
     * @param userInfo
     * @constructor
     */
    SET_USER_INFO(state, userInfo) {
        state.userInfo = userInfo
        storage.setUserInfo(userInfo)
    }
}

const actions = {
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
