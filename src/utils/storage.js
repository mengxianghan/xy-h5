/**
 * @Author: 孟祥涵
 * @Date: 2020-10-08
 * @Description: storage.js
 */
import {upperFirst} from 'lodash'
import Storage from 'xy-storage/src/storage'

const store = new Storage({
    namespace: process.env.VUE_APP_STORAGE_NAMESPACE
})

/**
 * local        localstorage
 * session      sessionstorage
 * cookie       cookie
 */
const storageMap = [
    {key: 'token', type: 'session'},
    {key: 'userInfo', type: 'session'},
    {key: 'isLogin', type: 'session'},
    {key: 'permission', type: 'session'},
    {key: 'isAuth', type: 'session'},
    {key: 'authType', type: 'session'}
]

const storage = {}

storageMap.forEach(item => {
    // set
    storage[`set${upperFirst(item.key)}`] = (value, attributes) => {
        return store[item.type].setItem(item.key, value, attributes)
    }

    // get
    storage[`get${upperFirst(item.key)}`] = (df = null) => {
        return store[item.type].getItem(item.key, df = null)
    }

    // remove
    storage[`remove${upperFirst(item.key)}`] = () => {
        return store[item.type].removeItem(item.key)
    }
})

// clear
storage['clear'] = () => {
    return store[item.type].clear()
}

export default storage

