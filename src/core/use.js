import Vue from 'vue'
import Vant from 'vant'
import '@/components'
import api from '@/api'
import * as util from '@/utils/util'
import * as validate from '@/utils/validate'
import 'lib-flexible'
import './permission'
import 'vant/lib/index.less'
import '@/assets/style/index.scss'

Vue.use(Vant)

//开启调试
if (process.env.VUE_APP_DEBUGGER === 'true') {
    const VConsole = require('vconsole')
    Vue.use(new VConsole())
}

window.$xy = Vue.prototype.$xy = {
    api,
    util,
    validate
}
