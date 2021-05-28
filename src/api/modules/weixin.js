/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-21
 * @description: weixin.js
 */

import request from '@/utils/request'

export default {
    // 获取微信配置
    getConfig: params => request.api.get('/wx/getConfig', params)
}
