import request from '@/utils/request'

export default {
    // 登录
    login: params => request.api.post('/', params)
}
