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
 * 微信支付 - 微信内浏览器
 * @param {object} options
 *  @var {string} appId 公众号ID，由商户传入
 *  @var {string} timeStamp 时间戳，自1970年以来的秒数
 *  @var {string} nonceStr 随机串
 *  @var {string} package 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
 *  @var {string} signType 微信签名方式
 *  @var {string} paySign 签名
 *  @function {function} success 成功回调
 *  @function {function} fail 失败回调
 *  @function {function} complete 回调
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

/**
 * h5微信支付 - 微信外浏览器
 * @param {string} prepayId
 * @param {string} pkg
 * @param {string} redirectUrl 回调地址，需进行 encodeURIComponent 处理
 */
export function weixinPayOfH5(prepayId, pkg = '', redirectUrl) {
    if (!prepayId || !pkg || !redirectUrl) {
        console.error('参数不完整')
        return
    }
    location.href = `https://wx.tenpay.com/cgi-bin/mmpayweb-bin/checkmweb?prepay_id=${prepayId}&package=${pkg}&redirect_url=${rediredtUrl}`
}
