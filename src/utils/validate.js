/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 验证类
 */

const userAgent = navigator.userAgent.toLowerCase()

/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
    return /0?(13|14|15|17|18|19)[0-9]{9}/.test(mobile)
}

/**
 * 验证为空
 * @param str
 * @returns {boolean}
 */
export function isEmpty(str) {
    return str.trim() === '' ? false : true
}

/**
 * 验证url
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
    return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(url)
}

/**
 * 验证微信
 * @returns {boolean}
 */
export function isWeixin() {
    return /\bmicromessenger\b/g.test(userAgent)
}

/**
 * 验证微博
 * @return {*}
 */
export function isWeibo() {
    return /weibo/g.test(userAgent)
}

/**
 * 验证QQ
 * @return {*}
 */
export function isQQ() {
    return /qq\//g.test(userAgent)
}


/**
 * 验证 ios
 */
export function isIos() {
    return /ios/g.test(window.navigator.userAgent.toLocaleLowerCase())
}

/**
 * 验证 android
 */
export function isAndroid() {
    return /android/g.test(window.navigator.userAgent.toLocaleLowerCase())
}

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
export function isEmail(email) {
    return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g.test(email)
}


/**
 * 判断是否在app内部的webview
 */
export function isInApp() {
    return /53zaixian/g.test(window.navigator.userAgent.toLocaleLowerCase())
}
