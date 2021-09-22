import {stringify} from 'qs'
import {parse} from 'url'

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
    return `${protocol}//${host}${Object.keys(query).length ? `?${stringify(query)}` : ''}`
}

/**
 * 深度合并
 * @param src
 * @param target
 * @return {{}}
 */
export function deepMerge(src = {}, target = {}) {
    for (let key in target) {
        src[key] = src[key] && Object.prototype.toString.call(src[key]) === '[object Object]' ? deepMerge(src[key], target[key]) : src[key] = target[key]
    }
    return src
}
