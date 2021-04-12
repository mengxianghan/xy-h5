/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-23
 * @description: pay
 */

/**
 * 微信支付准备完成
 * @param options
 */
function onWeixinJSBridgeReady(options) {
    options = {
        appId: '', //公众号名称，由商户传入
        timeStamp: '', //时间戳，自1970年以来的秒数
        nonceStr: '', //随机串
        package: '',
        signType: 'RSA', //微信签名方式
        paySign: '', //微信签名
        // 成功
        success: function () {
        },
        // 失败
        fail: function () {
        },
        // 完成
        complete: function () {
        },
        ...options
    }
    WeixinJSBridge.invoke('getBrandWCPayRequest', {
            appId: options.appId,
            timeStamp: options.timeStamp,
            nonceStr: options.nonceStr,
            package: options.package,
            signType: options.signType,
            paySign: options.paySign
        },
        function (res) {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                options.success.call(this, res)
            } else {
                options.fail.call(this, res)
            }
            options.complete.call(this, res)
        })
}

/**
 * 微信支付
 */
export function weixinPay(options) {
    if (typeof WeixinJSBridge == 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onWeixinJSBridgeReady(options), false)
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onWeixinJSBridgeReady(options))
            document.attachEvent('onWeixinJSBridgeReady', onWeixinJSBridgeReady(options))
        }
    } else {
        onWeixinJSBridgeReady(options)
    }
}
