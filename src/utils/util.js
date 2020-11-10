/**
 * @Author: 孟祥涵
 * @Date: 2020-10-13
 * @Description: 工具类
 */

export function toTree(list, options = {}) {
    const opts = {
        key: 'id',
        parent: '0',
        parentKey: 'parentId',
        children: 'children',
        ...options
    }

    const tempObj = {}

    list.forEach(item => {
        item[opts.children] = []
        tempObj[item[opts.key]] = item
    })

    return list.filter(item => {
        if (item[opts.parentKey] !== opts.parent) {
            tempObj[item[opts.parentKey]][opts.children].push(item)
            return false
        }
        return true
    })
}

/**
 * n位Number类型的随机数
 *
 * @param {Number} n 长度
 *
 * @returns {Number}
 */
export function random(n = 6) {
    if (n > 21) return null
    return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}

/**
 * guid
 *
 * @returns {String}
 */
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}

/**
 * 秒转时间
 * @param {Number} value
 */
export function toTime(value, empty = '00:00') {
    if (!value) return empty
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600)
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60))
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60))
    if (Number(h) === 0) {
        result = `${m}:${s}`
    } else {
        result = `${h}:${m}:${s}`
    }
    return result
}
