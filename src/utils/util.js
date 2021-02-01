/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-24
 * @description: 工具类
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
 * 解析时间字符串
 *
 * @param {Number} second
 * @return {String} 00:00 or 00:00:00
 */
export function secondToTime(second) {
    second = second || 0
    if (second === 0 || second === Infinity || second.toString() === 'NaN') {
        return '00:00'
    }
    const add0 = (num) => (num < 10 ? '0' + num : '' + num)
    const hour = Math.floor(second / 3600)
    const min = Math.floor((second - hour * 3600) / 60)
    const sec = Math.floor(second - hour * 3600 - min * 60)
    return (hour > 0 ? [hour, min, sec] : [0, min, sec]).map(add0).join(':')
}

/**
 * 数据映射
 * @param list 数据源
 * @param structure 新结构
 *          {
 *              新字段名称: 对应数据中的字段名
 *          }
 * @param expand 拓展数据
 * @returns {[]}
 */
export function mapping(list, structure = {}, expand = {}) {
    let newList = []
    if (!Array.isArray(list)) return []
    list.forEach((item, index) => {
        let temp = {...expand}
        for (let key in structure) {
            if (structure[key] instanceof Function) {
                temp[key] = structure[key](item, index)
            } else {
                let value = item[structure[key]]
                if ((value instanceof Array) && value.length) {
                    temp[key] = mapping(value, structure, expand)
                } else {
                    temp[key] = (typeof value !== 'undefined') && value !== '' ? value : ''
                }
            }
        }
        newList.push(temp)
    })
    return newList
}
