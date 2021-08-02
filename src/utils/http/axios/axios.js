import axios from 'axios'
import merge from 'deepmerge'
import {stringify, parse} from 'qs'

export default class Axios {
    #axiosInstance = null

    constructor(options) {
        this.#axiosInstance = axios.create(options)
        this.#setupInterceptors()
    }

    /**
     * 拦截器
     */
    #setupInterceptors() {
        this.#axiosInstance.interceptors.request.use((req) => {
            return req
        })

        this.#axiosInstance.interceptors.response.use((res) => {
            return res
        })
    }

    get(config) {
        return this.request({
            ...config,
            method: 'GET'
        })
    }

    post(config) {
        return this.request({
            ...config,
            method: 'POST'
        })
    }

    put(config) {
        return this.request({
            ...config,
            method: 'PUT'
        })
    }

    delete(config) {
        return this.request({
            ...config,
            method: 'DELETE'
        })
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
