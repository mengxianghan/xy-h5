/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-21
 * @description: user
 */

import request from '@/utils/request'

export default {
    // 登录
    login: params => request.api.post('/', params)
}
