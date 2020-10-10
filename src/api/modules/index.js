import request from '@/utils/request'

export default {
    // 获取视频列表
    getVideoList: params => request.api.get('/index/getVideoList', params)
}
