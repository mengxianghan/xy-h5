import Storage from 'xy-storage'
import {upperFirst} from 'lodash-es'

const store = new Storage({
    namespace: process.env.VUE_APP_STORAGE_NAMESPACE
})

const attrs = {domain: process.env.VUE_APP_COOKIE_DOMAIN, expires: 365}

/**
 * local        localStorage
 * session      sessionStorage
 * cookie       cookie
 */
const storageMap = [
    {key: 'isLogin', type: 'cookie', attrs},
    {key: 'token', type: 'cookie', attrs},
    {key: 'userInfo', type: 'cookie', attrs}
]

const storage = {}

storageMap.forEach(item => {
    // set
    storage[`set${upperFirst(item.key)}`] = (value, attrs = null) => {
        return store[item.type].set(item.key, value, item.attrs && attrs ? {...item.attrs, ...attrs} : item.attrs || attrs)
    }

    // get
    storage[`get${upperFirst(item.key)}`] = (def = null) => {
        return store[item.type].get(item.key, def)
    }

    // remove
    storage[`remove${upperFirst(item.key)}`] = (attrs) => {
        return store[item.type].remove(item.key, item.attrs && attrs ? {...item.attrs, ...attrs} : item.attrs || attrs)
    }

    // clear
    storage['clear'] = () => {
        return store[item.type].clear()
    }
})

export default storage

