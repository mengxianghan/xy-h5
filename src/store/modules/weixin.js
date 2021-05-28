/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 微信
 */
import router from '@/router'

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
     * @param {string} url 转码后的 url
     */
    config({commit}, url) {
        return new Promise(async (resolve, reject) => {
            // 获取微信签名
            const result = await window.$xy.api.weixin.getConfig({
                url: encodeURIComponent(url)
            })
            const {code, data} = result
            if (code === '200') {
                const {timestamp, nonceStr, signature} = data
                commit('SET_CONFIG', data)
                wx.config({
                    debug: process.env.VUE_APP_WX_DEBUG === 'true' ? true : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: process.env.VUE_APP_WX_APP_ID, // 必填，公众号的唯一标识
                    timestamp: timestamp, // 必填，生成签名的时间戳
                    nonceStr: nonceStr, // 必填，生成签名的随机串
                    signature: signature,// 必填，签名
                    jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline', 'chooseWXPay'] // 必填，需要使用的JS接口列表
                })
            }
            return result
        })
    },
    /**
     * 微信分享
     * @param options
     *      @param {string} title 标题
     *      @param {string} desc 描述
     *      @param {string} link 分享链接
     *      @param {string} imgUrl 图片地址
     *      @param {function} success 成功回调
     */
    share({dispatch}, options = {}) {
        const {title, desc, link, imgUrl} = options
        return new Promise((resolve) => {
            wx.ready(function () {
                //分享给朋友，分享到QQ
                wx.updateAppMessageShareData({
                    title, // 分享标题
                    desc, // 分享描述
                    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
                //分享到朋友圈，分享到QQ空间
                wx.updateTimelineShareData({
                    title, // 分享标题
                    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl, // 分享图标
                    success: function () {
                        // 设置成功
                    }
                })
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title, // 分享标题
                    link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl, // 分享图标
                    success: function () {
                        // 用户点击了分享后执行的回调函数

                    }
                })
            })
            resolve()
        })
    },
    /**
     * QQ 分享
     * @param options
     *      @param {string} title 标题，非必填
     *      @param {string} desc 描述文案，必填
     *      @param {string} imgUrl 图片地址，必填
     */
    shareByQQ({}, options = {}) {
        const {title = '', desc = '', imgUrl = ''} = options
        let logo = document.getElementById('shareByQQ'),
            img = document.createElement('img'),
            meta = document.querySelector('meta[name="description"]')
        if (logo) logo.remove()
        if (meta) meta.remove()

        if (title) document.title = title

        if (options.desc) {
            meta = document.createElement('meta')
            meta.name = 'description'
            meta.content = desc
            document.querySelector('head').appendChild(meta)
        }

        img = document.createElement('img')
        img.src = imgUrl
        logo = document.createElement('h1')
        logo.style.display = 'none'
        logo.id = 'ShareLogoByQQ'
        logo.appendChild(img)
        document.body.insertBefore(logo, document.body.firstChild)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
