import VConsole from 'vconsole'
import {getQueryParams} from '@/utils/index'

export function setupConsole() {
    const {debug} = getQueryParams()
    if (process.env.VUE_APP_DEBUG === 'true' || debug === '1') {
        new VConsole({
            disableLogScrolling: false
        })
    }
}
