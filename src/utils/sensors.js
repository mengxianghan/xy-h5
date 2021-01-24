/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 神策埋点
 */

import sensorsDataAnalytic201505 from 'sa-sdk-javascript'

const sensors = sensorsDataAnalytic201505

/**
 * 初始化神策埋点
 */
export function init() {
    sensors.init({
        server_url: process.env.VUE_APP_SENSORS_SERVER_URL,
        heatmap: {
            //是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
            clickmap: 'default',
            //是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
            scroll_notice_map: 'not_collect'
        },
        is_track_single_page: true,
        app_js_bridge: true, // 打通 app 和 h5
        show_log: process.env.VUE_APP_SENSORS_SHOW_LOG === 'true' ? true : false
    })

    sensors.quick('autoTrack', {platform: 'H5'})
}

/**
 * 用户登录
 * @param uuid
 */
export function login(uuid) {
    sensors.login(uuid)
}

/**
 * 自定义事件
 * @param event
 * @param params
 */
export function track(event = '', params = {}) {
    sensors.track(event, params)
}
