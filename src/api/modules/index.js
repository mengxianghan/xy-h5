import request from '@/utils/request'

export default {
    // 获取歌词
    getLyric: () => request.readFile.get('/static/1.lrc')
}
