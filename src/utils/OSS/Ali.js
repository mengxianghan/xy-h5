import Interface from './Interface'
import OSS from 'ali-oss'

export default class Ali extends Interface {
    constructor(options) {
        super(options)

        this.options = {
            accessKeyId: '', // 通过阿里云控制台创建的access key
            accessKeySecret: '', // 通过阿里云控制台创建的access secret
            bucket: '', // 通过控制台创建的bucket
            endpoint: '', // OSS域名
            region: '', // bucket 所在的区域，默认 oss-cn-hangzhou
            internal: false, // 是否使用阿里云内网访问，默认false。比如通过ECS访问OSS，则设置为true，采用internal的endpoint可节约费用
            cname: false, // 是否支持上传自定义域名，默认false。如果cname为true，endpoint传入自定义域名时，自定义域名需要先同bucket进行绑定
            isRequestPay: false, // bucket是否开启请求者付费模式，默认false。具体可查看请求者付费模式[https://help.aliyun.com/document_detail/91337.htm?spm=a2c4g.11186623.2.3.434e5da7051GKQ#concept-yls-jm2-2fb]
            secure: true, // 则使用 HTTPS， (secure: false) 则使用 HTTP，详情请查看常见问题[https://help.aliyun.com/document_detail/91337.htm?spm=a2c4g.11186623.2.3.434e5da7051GKQ#concept-yls-jm2-2fb]
            timeout: '60s', // 超时时间，默认 60s
            headers: {
                'Cache-Control': 'public'
            },
            root: '', // 根目录
            domain: '', // 域名
            expires: 3600, // 过期时长，单位：s
            token: function () {
            },
            ...options
        }

        // 基础配置信息
        if (!this.options.accessKeyId
            || !this.options.accessKeySecret
            || !this.options.bucket
            || !this.options.region) {
            console.error('请完善 oss 配置信息')
            return
        }

        // 自有域名
        if (this.options.cname) {
            if (!this.options.endpoint) {
                console.error('请配置 oss 自有域名')
                return
            }
        } else {
            delete this.options.endpoint
        }

        this.client = new OSS(this.options)
    }

    /**
     * 文件上传
     * @param {string} name
     * @param {file} file
     * @param {object} config
     * @return {Promise<unknown>}
     */
    upload(name, file, config = {}) {
        return new Promise(async (resolve, reject) => {
            const result = await this.client.put(this._generateName(name), file, {
                ...config,
                headers: {
                    ...this.options.headers,
                    ...config?.headers ?? {}
                }
            }).catch((err) => {
                reject(err)
            })
            resolve(this._formatResult(result))
        })
    }

    /**
     * 分片上传
     * @param name
     * @param file
     * @param config
     * @return {Promise<unknown>}
     */
    multipartUpload(name, file, config = {}) {
        return new Promise(async (resolve, reject) => {
            const result = await this.client.multipartUpload(this._generateName(name), file, {
                ...config,
                headers: {
                    ...this.options.headers,
                    ...config?.headers ?? {}
                }
            }).catch((err) => {
                reject(err)
            })
            resolve(this._formatResult(result))
        })
    }

    /**
     * 断点续传
     * @param name
     * @param file
     * @param config
     * @return {Promise<unknown>}
     */
    resumeMultipartUpload(name, file, config = {}) {
        return new Promise(async (resolve, reject) => {
            const result = await this.client.multipartUpload(name, file, {
                ...config,
                headers: {
                    ...this.options.headers,
                    ...config?.headers ?? {}
                }
            }).catch((err) => {
                reject(err)
            })
            resolve(this._formatResult(result))
        })
    }

    /**
     * 暂停
     */
    pause() {
        this.client.cancel()
    }

    /**
     * 取消上传
     * @param {*} name
     * @param {*} uploadId
     * @returns
     */
    abortMultipartUpload(name, uploadId) {
        return new Promise(async (resolve, reject) => {
            const result = await this.client.abortMultipartUpload(name, uploadId).catch((err) => {
                reject(err)
            })
            resolve(result)
        })
    }
}
