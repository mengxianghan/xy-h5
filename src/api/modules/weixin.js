import request from '@/utils/request'

export default {
    // 获取微信配置
    getWxConfig: params => request.api.get('/wx/getConfig', params)
}
