import axios from 'axios'
import {Toast} from 'vant'

const state = {
    complete: false,
    loading: null
}

const getters = {
    complete: state => state.complete
}

const mutations = {
    /**
     * 设置状态
     * 判断预加载的数据是否加载完成
     * @param state
     * @param complete
     * @constructor
     */
    SET_COMPLETE(state, complete = false) {
        state.complete = complete
    },
    /**
     * 设置 loading
     * @param state
     * @param loading
     * @constructor
     */
    SET_LOADING(state, loading) {
        state.loading = loading
    }
}

const actions = {
    /**
     * 初始化
     * @param dispatch
     * @returns {Promise}
     */
    init({commit, dispatch}) {
        return new Promise((resolve) => {
            axios.all([]).then(() => {
                commit('SET_COMPLETE', true)
                resolve()
            })
        })
    },
    /**
     * 显示 loading
     */
    showLoading({commit}, options = {}) {
        options = typeof options === 'string' ? {message: options} : options
        const loading = Toast.loading({
            message: '加载中',
            forbidClick: true,
            duration: 0,
            ...options
        })
        commit('SET_LOADING', loading)
    },
    /**
     * 隐藏 loading
     */
    hideLoading({commit, state}) {
        const {loading} = state
        if (loading) {
            Toast.clear(loading)
            commit('SET_LOADING', null)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
