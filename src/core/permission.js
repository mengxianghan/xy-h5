import router from '@/router'
import api from '@/api'
import wx from 'weixin-js-sdk'

router.beforeEach((to, from, next) => {
    const {href} = router.resolve(to)
    const url = location.origin + href
    api.wechat.getSignature({
        url: url
    }).then(({code, data}) => {
        if (code === '200') {
            const {timestamp, noncestr, signature} = data
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: process.env.VUE_APP_APP_ID, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareTimeline'] // 必填，需要使用的JS接口列表
            })
        }
    })
    next()
})
