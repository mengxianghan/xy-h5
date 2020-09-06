import axios from 'axios'

const state = {
    complete: false
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
