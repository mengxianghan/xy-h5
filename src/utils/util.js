import compareVersions from 'compare-versions'
import {setTitle as setAppTitle} from '@/utils/jsbridge'
import {isInApp} from '@/utils/validate'
import Qs from 'qs'
import {parse} from 'url'

/**
 * 树形结构转线形结构
 * @param {array} list
 * @param {object} fields
 * @return {*[]}
 */
export function treeToList(list = [], fields = {children: 'children'}) {
    let result = []
    if (!Array.isArray(list)) return result
    list.forEach(item => {
        let temp = []
        result.push(item)
        if (item[fields.children] && item[fields.children].length) {
            let children = treeToList(item[fields.children])
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
export function listToTree(list = [], parentValue = '0', fields = {
    key: 'id',
    children: 'children',
    parentKey: 'parentId'
}) {
    const result = []
    list.forEach(item => {
        if (item[fields.parentKey] === parentValue) {
            let temp = item
            let children = listToTree(list, item[fields.key])
            if (children.length) {
                temp[fields.children] = children
            }
            result.push(temp)
        }
    })
    return result
}

/**
 * 解析时间字符串，转成时间
 *
 * @param {number} second
 * @return {string} 00:00 or 00:00:00
 */
export function secondsToTime(second) {
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
 * 解析时间字符串，转成秒
 * @param timeTxt
 * @returns {number}
 */
export function timeToSeconds(timeTxt) {
    const regRule = /(\d{2,3}(?=:)):(\d{2}(?=\.))\.(\d{2,3})/g
    if (regRule.test(timeTxt)) {
        return RegExp.$1 * 60 + RegExp.$2 * 1 + ('0.' + RegExp.$3) * 1
    } else {
        return -1
    }
}

/**
 * 数据映射
 * @param {array} list 数据源
 * @param {object} structure 新结构
 *          {
 *              新字段名称: 对应数据中的字段名 || function(item, index, array){}
 *          }
 * @param {object} expand 拓展数据
 * @param {string} treeField 子节点，如果是树型结构，传入树型结构的子节点对应的字典名
 * @returns {[]}
 */
export function mapping(list, structure = {}, expand = {}, treeField) {
    let result = []
    if (!Array.isArray(list)) return []
    if (!structure) return list
    list.forEach((item, index, array) => {
        let temp = {},
            record,
            structureValue
        for (let key in structure) {
            structureValue = structure[key]
            record = item[structureValue]
            if (structureValue === treeField) {
                // 树结构
                if (record && record.length) {
                    const child = mapping(item[treeField], structure, expand, treeField)
                    if (child && child.length) {
                        temp[key] = child
                    }
                }
            } else if (structureValue instanceof Function) {
                // 函数
                temp[key] = structureValue(item, index, array)
            } else {
                // 其他类型
                //if ((record instanceof Array) && record.length) {
                //    temp[key] = mapping(record, structure, expand, treeField)
                //} else {
                //    temp[key] = (typeof record !== 'undefined') && record !== '' ? record : ''
                //}
                temp[key] = (typeof record !== 'undefined') && record !== '' ? record : ''
            }
        }
        temp = expand ? {...temp, ...expand} : temp
        result.push(temp)
    })
    return result
}

/**
 * 清理 query 参数
 * @param {string} url
 * @param {string | array} keys
 */
export function clearQuery(url = location.href, keys = []) {
    const {protocol, host, query} = parse(url, true)
    if (keys instanceof Array) {
        for (let key of keys) {
            delete query[key]
        }
    } else {
        delete query[keys]
    }
    return `${protocol}//${host}${Object.keys(query).length ? `?${Qs.stringify(query)}` : ''}`
}

/**
 * 格式化文本域内容，支持换行
 * @param content
 * @return {string}
 */
export function formatTextarea(content = '') {
    return content.replace(/\n|\r\n/g, '<br/>')
}

/**
 * 获取 app ua
 * @param {string} key
 */
export function getAppUa(key = '') {
    const ua = navigator.userAgent
    if (isInApp() && key) {
        const obj = Qs.parse(ua)
        return obj[key] ?? ''
    }
    return ua
}

/**
 * 获取 APP 版本号
 * @return {string|string|string}
 */
export function getAppVersion() {
    if (isInApp()) {
        return Qs.parse(navigator.userAgent)?.appVersion ?? '0.0.1'
    }
    return '0.0.1'
}

/**
 * 对象深度合并
 * @param obj1
 * @param obj2
 * @return {*}
 */
export function deepMerge(obj1, obj2) {
    let key
    for (key in obj2) {
        // 如果target(也就是obj1[key])存在，且是对象的话再去调用deepMerge，否则就是obj1[key]里面没这个对象，需要与obj2[key]合并
        // 如果obj2[key]没有值或者值不是对象，此时直接替换obj1[key]
        obj1[key] =
            obj1[key] &&
            obj1[key].toString() === '[object Object]' &&
            (obj2[key] && obj2[key].toString() === '[object Object]')
                ? deepMerge(obj1[key], obj2[key])
                : (obj1[key] = obj2[key])
    }
    return obj1
}

/**
 * 对比版本号
 * @param version 待对比版本号
 * @param operator 符号 >、<、=
 * @return {boolean}
 */
export function compareVersion(version = '1.03.02', operator = '>') {
    if (isInApp()) {
        const appVersion = getAppVersion()

        // 版本号中不带 .
        if (!(/\./g.test(appVersion))) {
            // 移除版本号中的 .
            version = version.replace(/\./g, '')
        }

        return compareVersions.compare(appVersion, version, operator)
    } else {
        return false
    }
}

/**
 * 设置标题
 * @param title
 */
export function setTitle(title) {
    // 是否在app内部
    if (isInApp()) {
        // 在app内部
        setAppTitle({
            data: {
                title
            }
        })
    } else {
        // 不在app内部
        document.title = title
    }
}
