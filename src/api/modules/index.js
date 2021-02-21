/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-21
 * @description: index.js
 */

import request from '@/utils/request'

export default {
    // 获取视频列表
    getVideoList: params => request.api.get('/index/getVideoList', params)
}
