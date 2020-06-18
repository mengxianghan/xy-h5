import Vue from 'vue'

// base library
import Vant from 'vant'
import '@/components'

// extra library
import VConsole from 'vconsole'
import api from '@/api'
import * as util from '@/utils/util'
import * as validate from '@/utils/validate'
import 'lib-flexible'
import './permission'

// style
import 'vant/lib/index.less'
import '@/assets/style/index.scss'

Vue.use(Vant)

//开启调试
if (process.env.VUE_APP_DEBUGGER === 'true') Vue.use(new VConsole())

window.$zs = Vue.prototype.$zs = {
    api,
    util,
    validate
}
