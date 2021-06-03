import request from '@/utils/request'

export default {
    /**
     * 演示
     * @param params
     * @return {Promise<commander.ParseOptionsResult.unknown>}
     */
    demo: params => request.api.post('', params)
}
