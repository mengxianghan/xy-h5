import jschardet from 'jschardet'
import axios from 'axios'
import {merge} from 'lodash'

const instance = axios.create()

/**
 * 请求拦截
 */
instance.interceptors.request.use(req => {
    return req
}, err => {
    return Promise.reject(err)
})

/**
 * 响应拦截
 */
instance.interceptors.response.use(res => {
    return res
}, err => {
    return Promise.reject(err)
})

class Http {
    constructor(config = {}) {
        this.config = merge({
            timeout: 0,
            transformResponse: [function transformResponse(data) {
                if (typeof data === 'string') {
                    try {
                        let c1 = data.toString().replace(/:\d{17,}/g, ':"@rr$&"').replace(/@rr:\s/g, '').replace(/@rr:/g, '')
                        let c2 = c1.replace(/:\d{1,}\.\d+/g, ':"@rr$&"').replace(/@rr:\s/g, '').replace(/@rr:/g, '')
                        data = JSON.parse(c2)
                    } catch (e) {
                    }
                }
                return data
            }]
        }, config)
    }

    /**
     * 请求
     * @param config
     * @returns {Promise<unknown>}
     */
    request(config = {}) {
        return new Promise((resolve, reject) => {
            instance
                .request({
                    ...this.config,
                    ...config
                })
                .then(res => {
                    resolve(res.data)
                }, err => {
                    reject(err)
                }).catch(err => {
                reject(err)
            })
        })
    }

    /**
     * POST 请求
     * @param url
     * @param data
     * @param config
     * @returns {Promise<unknown>}
     */
    post(url = '', data = {}, config = {}) {
        return this.request({
            url: url,
            method: 'post',
            data,
            ...config
        })
    }

    /**
     * GET 请求
     * @param url
     * @param params
     * @param config
     * @returns {Promise<unknown>}
     */
    get(url = '', params = {}, config = {}) {
        return this.request({
            url: url,
            method: 'get',
            params: params,
            ...config
        })
    }

    /**
     * 上传
     * @param url
     * @param formData
     * @param config
     * @returns {Promise<unknown>}
     */
    upload(url = '', formData = {}, config = {}) {
        return this.post(url, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            },
            ...config
        })
    }

    /**
     * 下载
     * @param url
     * @param config
     * @returns {Promise<unknown>}
     */
    download(url = '', config = {}) {
        return this.request({
            url: url,
            baseURL: '',
            method: 'get',
            responseType: 'blob',
            ...config
        })
    }
}

class Api extends Http {
    constructor(gateway = '') {
        super({
            baseURL: `${process.env.VUE_APP_BASE_URL}${gateway}`
        })
    }
}

class ReadFile extends Http {
    constructor() {
        super({
            baseURL: '',
            responseType: 'blob',
            transformResponse: [async (data) => {
                const encoding = await this._encoding(data)
                return new Promise((resolve, reject) => {
                    let reader = new FileReader()
                    reader.readAsText(data, encoding)
                    reader.onload = function (e) {
                        resolve(reader.result)
                    }
                })
            }]
        })
    }

    /**
     * 文本编码
     * @param data
     * @returns {Promise<unknown>}
     * @private
     */
    _encoding(data) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader()
            reader.readAsBinaryString(data)
            reader.onload = function (e) {
                resolve(jschardet.detect(reader.result).encoding)
            }
        })
    }
}

export default {
    api: new Api(),
    readFile: new ReadFile()
}
