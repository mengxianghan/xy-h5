/**
 * 树形结构转线形结构
 * @param {array} list
 * @param {object} fields
 * @return {*[]}
 */
export function toList(list = [], fields = {children: 'children'}) {
    let result = []
    if (!Array.isArray(list)) return result
    list.forEach(item => {
        let temp = []
        result.push(item)
        if (item[fields.children] && item[fields.children].length) {
            let children = toList(item[fields.children])
            if (children.length) {
                temp = children
            }
        }
        result = [...result, ...temp]
    })
    return result
}

/**
 * 线形数据转树形数据
 * @param {array} list
 * @param {string | number} parentValue
 * @param {object} fields
 * @return {*[]}
 */
export function toTree(list = [], parentValue = '0', fields = {
    key: 'id',
    children: 'children',
    parentKey: 'parentId'
}) {
    const result = []
    list.forEach(item => {
        if (item[fields.parentKey] === parentValue) {
            let temp = item
            let children = toTree(list, item[fields.key])
            if (children.length) {
                temp[fields.children] = children
            }
            result.push(temp)
        }
    })
    return result
}

/**
 * 秒转时间
 * @param {number} second
 * @return {string} 00:00 or 00:00:00
 */
export function toTime(second) {
    second = second || 0
    if (second === 0 || second === Infinity || second.toString() === 'NaN') {
        return '00:00'
    }
    const add0 = (num) => (num < 10 ? '0' + num : '' + num)
    const hour = Math.floor(second / 3600)
    const min = Math.floor((second - hour * 3600) / 60)
    const sec = Math.floor(second - hour * 3600 - min * 60)
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':')
}

/**
 * 时间转秒
 * @param time 00:00:00
 * @returns {number}
 */
export function toSeconds(time) {
    const regRule = /(\d{2,3}(?=:)):(\d{2}(?=\.))\.(\d{2,3})/g
    if (regRule.test(time)) {
        return RegExp.$1 * 60 + RegExp.$2 * 1 + ('0.' + RegExp.$3) * 1
    } else {
        return -1
    }
}
