import {upperFirst} from 'lodash'
import Storage from 'xy-storage'

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
    storage[`set${upperFirst(item.key)}`] = (value, attrs) => {
        return store[item.type].set(item.key, value, attrs)
    }

    // get
    storage[`get${upperFirst(item.key)}`] = (df = null) => {
        return store[item.type].get(item.key, df)
    }

    // remove
    storage[`remove${upperFirst(item.key)}`] = () => {
        return store[item.type].remove(item.key)
    }

    // clear
    storage['clear'] = () => {
        return store[item.type].clear()
    }
})

export default storage

