/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 神策埋点
 */
import sensorsDataAnalytic201505 from 'sa-sdk-javascript'

const sensors = sensorsDataAnalytic201505

const state = {}

const getters = {}

const mutations = {}

const actions = {
    /**
     * 初始化
     */
    init() {
        sensors.init({
            server_url: process.env.VUE_APP_SENSORS_SERVER_URL,
            heatmap: {
                //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
                clickmap: 'default',
                //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
                scroll_notice_map: 'default'
            },
            is_track_single_page: true,
            app_js_bridge: true, // 打通 app 和 h5
            show_log: process.env.VUE_APP_SENSORS_SHOW_LOG === 'true' ? true : false
        })

        sensors.quick('autoTrack', {platform: 'H5'})
    },
    /**
     * 演示 1
     * 请求接口并埋点
     * @param {Object} params 参数
     * @param {Object} extra 拓展属性
     * @return {Promise<void>}
     */
    async demo1({}, {params = {}, extra = {}} = {}) {
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

            sensors.track(eventType, values)
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
        const eventType = 'learning_diagnosis'
        sensors.track(eventType, {
            ...extra
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
