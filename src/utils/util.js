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
