import axios from 'axios'

export default class Axios {
    #axiosInstance = null
    #options = null

    constructor(options) {
        this.#optioins = {
            config: {},
            requestOptions: {},
            ...options ?? {}
        }

        this.#axiosInstance = axios.create(this.#options.config)
        this.#setupInterceptors()
    }

    /**
     * 拦截器
     */
    #setupInterceptors() {
        this.#axiosInstance.interceptors.request.use((config) => {
            return config
        }, (error) => {
            return Promise.reject(error)
        })

        this.#axiosInstance.interceptors.response.use((response) => {
            return response
        }, (error) => {
            return Promise.reject(error)
        })
    }

    get(config) {
        return this.request({...config, method: 'GET'})
    }

    post(config) {
        return this.request({...config, method: 'POST'})
    }

    put(config) {
        return this.request({...config, method: 'PUT'})
    }

    delete(config) {
        return this.request({...config, method: 'DELETE'})
    }

    upload(config) {
        return this.request({
            ...config,
            method: 'POST',
            headers: {
                'content-type': 'multipart/form-data;charset=UTF-8'
            }
        })
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.#axiosInstance.request(config).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}
