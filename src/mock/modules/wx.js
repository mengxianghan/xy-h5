import Mock from 'mockjs2'
import {builder, getBody, getQueryParams} from '../util'

/**
 * 获取微信配置
 */
Mock.mock(/\/wx\/getConfig/, 'get', options => {
    const {url} = getQueryParams(options)

    if (!url) {
        return builder({}, '500', '缺少参数')
    }

    return builder(Mock.mock({
        timestamp: new Date().getTime(),
        noncestr: '',
        signature: '@guid'
    }))
})
