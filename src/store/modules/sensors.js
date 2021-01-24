/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 神策
 */


import {track} from '@/utils/sensors'

const state = {}

const getters = {}

const mutations = {}

const actions = {
    /**
     * 演示 1
     * 请求接口并埋点
     * @param {Object} params 参数
     * @param {Object} extra 拓展属性
     * @return {Promise<void>}
     */
    async demo1({}, {params = {}, extra = {}} = {}) {
        try {
            const eventType = 'learning_diagnosis'

            const {code, data} = await window.$dyy.api.sensors.demo({
                type: eventType,
                ...params
            })
            if (code === '200') {
                const values = {
                    ...data,
                    ...extra
                }

                track(eventType, values)
            }
        } catch (e) {

        }
    },
    /**
     * 演示 2
     * 无接口请求，直接埋点
     * @param {Object} params 参数
     * @param {Object} extra 拓展属性
     * @return {Promise<void>}
     */
    async demo2({}, {params = {}, extra = {}} = {}) {
        try {
            const eventType = 'learning_diagnosis'
            track(eventType, {
                ...extra
            })
        } catch (e) {

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
