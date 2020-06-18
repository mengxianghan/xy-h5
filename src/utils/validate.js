/**
 * 验证手机号
 * @param mobile
 * @returns {boolean}
 */
export function mobile(mobile) {
    return /0?(13|14|15|17|18|19)[0-9]{9}/.test(mobile)
}

/**
 * 验证为空
 * @param str
 * @returns {boolean}
 */
export function empty(str) {
    return str.trim() === '' ? false : true
}

/**
 * 验证url
 * @param url
 * @returns {boolean}
 */
export function url(url) {
    return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(url)
}

/**
 * 验证微信
 * @returns {boolean}
 */
export function wechat() {
    return /\bMicroMessenger\b/g.test(window.navigator.userAgent)
}

export function weixin() {
    return /\bMicroMessenger\b/g.test(window.navigator.userAgent)
}

/**
 * 验证 ios
 */
export function ios() {
    return /ios/g.test(window.navigator.userAgent.toLocaleLowerCase())
}

/**
 * 验证 android
 */
export function android() {
    return /android/g.test(window.navigator.userAgent.toLocaleLowerCase())
}

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
export function email(email) {
    return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/g.test(email)
}
