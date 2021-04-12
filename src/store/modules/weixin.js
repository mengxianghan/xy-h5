/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 微信
 */

import api from '@/api'

const state = {
    config: {}
}

const getters = {}

const mutations = {
    /**
     * 设置配置
     * @param state
     * @param payload
     * @constructor
     */
    SET_CONFIG(state, payload) {
        state.config = payload
    }
}

const actions = {
    /**
     * 初始化微信配置
     * @param url
     */
    async init({commit}, url) {
        // 获取微信签名
        const {code, data} = await api.weixin.getWxConfig({
            url: encodeURIComponent(url)
        })
        if (code === '200') {
            const {timestamp, noncestr, signature} = data
            commit('SET_CONFIG', data)
            wx.config({
                debug: process.env.VUE_APP_WX_DEBUG === 'true' ? true : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: process.env.VUE_APP_WX_APP_ID, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表
            })
        }
    },
    /**
     * 分享
     * @param config
     */
    share({}, config = {}) {
        wx.ready(function () {
            //分享给朋友，分享到QQ
            wx.updateAppMessageShareData({
                title: config.title, // 分享标题
                desc: config.desc, // 分享描述
                link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgUrl, // 分享图标
                success: function () {
                    // 设置成功
                }
            })
            //分享到朋友圈，分享到QQ空间
            wx.updateTimelineShareData({
                title: config.title, // 分享标题
                link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgUrl, // 分享图标
                success: function () {
                    // 设置成功
                }
            })
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: config.title, // 分享标题
                link: config.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: config.imgUrl, // 分享图标
                success: function () {
                    // 用户点击了分享后执行的回调函数

                }
            })
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
