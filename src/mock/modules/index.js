import Mock from 'mockjs2'
import {builder, getBody, getQueryParams} from '../util'

/**
 * 获取微信配置
 */
Mock.mock(/\/index\/getVideoList/, 'get', options => {

    return builder(Mock.mock({
        'list|3': [
            {
                id: '@guid',
                url: 'http://cdn.xuanyunet.com/video.mp4'
            }
        ]
    }))
})
