import request from '@/utils/request'

export default {
    // 获取微信配置
    getConfig: params => request.api.get('/wx/getConfig', params)
}
