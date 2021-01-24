/**
 * @Author: 孟祥涵
 * @Date: 2020-12-08
 * @Description: sensors.js
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
