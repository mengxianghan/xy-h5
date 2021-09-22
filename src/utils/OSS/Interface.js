import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'

export default class Interface {
    constructor(options) {
        this.options = {
            root: '', // 根目录
            domain: '', // 域名
            expires: 3600, // 过期时长，单位：s
            token: function () {
            },
            ...options
        }
    }

    /**
     * 获取 token
     * @returns
     */
    _getToken() {
        return new Promise(async (resolve, reject) => {
            // 验证 token
            if (this._validateToken()) {
                // token 未过期
                resolve(true)
            } else {
                // token 已过期
                // 获取 token
                const {code, data} = await this.options.token().catch(() => {
                    this.token = null
                    reject(false)
                })
                if (code === '200') {
                    this.token = {
                        token: '',
                        iat: '',
                        ...data
                    }
                    resolve(true)
                } else {
                    this.token = {}
                    reject(false)
                }
            }
        })
    }

    /**
     * 获取相对路径
     * @param path
     */
    getRelativePath(path) {
        if (!path) return ''
        return path.replace(new RegExp('^((https|http|ftp|rtsp|mms)?:\\/\\/)[^/]+\\/', 'g'), '')
    }

    /**
     * 获取完整路径
     * @param path
     * @return {*|string}
     */
    getFullPath(path) {
        if (!path) return ''
        return this._formatPath(new RegExp('https?', 'gi').test(path) ? path : `${this.options.domain}/${path}`)
    }

    /**
     * 生成名称
     * @param name
     * @return {string}
     * @private
     */
    _generateName(name) {
        if (!name) return ''
        const suffix = name.split('.').pop()
        const path = name.split('/')
        path.pop()
        return this._formatPath(`${this.options.root}/${path.join('/')}/${uuidv4()}.${suffix}`)
    }

    /**
     * 格式化结果
     * @param result
     * @return {{code: string, data: {filename: *, size, relativePath, absolutePath, suffix: string}}}
     * @private
     */
    _formatResult(result) {
        const {name = '', res: {status = 500, size = 0} = {}} = result || {}
        const code = String(status)
        return {
            code,
            data: {
                name,
                url: this.getFullPath(name),
                suffix: name ? `.${name.split('.').pop()}` : '',
                size
            }
        }
    }

    /**
     * 格式化路径
     * @param path
     * @return {*}
     * @private
     */
    _formatPath(path) {
        if (!path) return ''
        return path.replace(new RegExp('(?<!:)\\/{2,}', 'g'), '/').replace(new RegExp('^\\/'), '')
    }

    /**
     * 验证 token
     * @returns
     */
    _validateToken() {
        const {iat = ''} = this.token || {}
        // token 不存在
        if (!this.token) return false

        // 签发时间不存在，每次上传重新获取 token
        if (!iat) return false

        return !(dayjs().unix() >= dayjs(iat).add(this.options.expires, 's').unix())
    }
}
