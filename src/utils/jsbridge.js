import {isAndroid, isInApp} from './validate'
import {compareVersion} from './util'

window.zs = new Object()

/**
 * 打开页面
 * @param args
 *          {
 *              data: {
 *                  router: ''
 *              }
 *          }
 */
export function openPage(args) {
    bridge('openPage', args)
}

/**
 * 关闭页面
 */
export function closePage() {
    bridge('closePage')
}

/**
 * 显示遮罩
 */
export function showOverlay() {
    bridge('overLay', {
        data: {
            show: '1'
        }
    })
}

/**
 * 隐藏遮罩
 */
export function hideOverlay() {
    bridge('overLay', {
        data: {
            show: '0'
        }
    })
}

/**
 * 获取 token
 * @param args
 *          {
 *              callback: function(){}
 *          }
 */
export function getToken(args) {
    bridge('getToken', args)
}

/**
 * 移除错题
 * @param args
 */
export function removeTopic(args) {
    bridge('deleteTopic', args)
}

/**
 * 登录
 * @param args
 */
export function login(args) {
    bridge('openPage', {
        data: {
            router: 'wszs://page/login?needBack=1'
        }
    })
}

/**
 * 设置标题
 * @param args
 *          {
 *              data: {
 *                  title: ''
 *              }
 *          }
 */
export function setTitle(args) {
    bridge('setTitle', args)
}

/**
 * 设置背景色
 * @param args
 *          {
 *              data: {
 *                  color: ''
 *              }
 *          }
 */
export function setBg(args) {
    // 版本兼容
    if (compareVersion()) {
        bridge('setBg', args)
    }
}

export function bridge(method = '', args) {
    if (!isInApp()) {
        console.log('请在app内执行此操作')
        return
    }
    const {data = '', callback = '', func = ''} = args || {}
    const isFunc = callback instanceof Function
    const params = data && JSON.stringify(data)

    // 判断设备类型
    if (isAndroid()) {
        // android 设备
        let res = null
        switch (method) {
            case 'openPage':
                res = wszs.openPage(params)
                break
            case 'closePage':
                res = wszs.closePage()
                break
            case 'overLay':
                res = wszs.overLay(params)
                break
            case 'getToken':
                res = wszs.getToken()
                break
            case 'deleteTopic':
                res = wszs.deleteTopic(params)
                break
            case 'setTitle':
                res = wszs.setTitle(params)
                break
        }
        if (isFunc) callback.call(this, res)
    } else {
        // ios/ipad
        if (isFunc && !window.zs[method]) window.zs[method] = callback
        window.webkit.messageHandlers[method].postMessage({
            data: params,
            callback: isFunc ? `zs.${method}` : ''
        })
    }
}





