/**
 * @description 移动端调试控制台
 */

import VConsole from 'vconsole'
import {getQueryParams} from '@/utils/get'

export function setupConsole() {
    const {debug} = getQueryParams()
    if (process.env.VUE_APP_DEBUG === 'true' || debug === '1') {
        new VConsole({
            disableLogScrolling: false
        })
    }
}
