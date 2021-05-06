/**
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-21
 * @description: index.js
 */

import request from '@/utils/request'

export default {
    // 获取歌词
    getLyric: () => request.readFile.get('/static/1.lrc')
}
