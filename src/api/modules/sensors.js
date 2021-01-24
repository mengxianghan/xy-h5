/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-01-23
 * @description: sensors
 */

import request from '@/utils/request'

export default {
    /**
     * 演示
     * @param params
     * @return {Promise<commander.ParseOptionsResult.unknown>}
     */
    demo: params => request.api.post('', params)
}
