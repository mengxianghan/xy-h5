import request from '@/utils/request'

export default {
    getSignature: params => request.api.post('/wechat/getWechatSignature', params)
}
