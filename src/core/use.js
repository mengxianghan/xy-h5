import Vue from 'vue'
import '@/components'
import './vant'
import api from '@/api'
import * as util from '@/utils/util'
import * as validate from '@/utils/validate'
import 'lib-flexible'
import './permission'
// import 'vant/lib/index.less'
import '@/assets/style/index.scss'

//开启调试
if (process.env.VUE_APP_DEBUGGER === 'true') {
    const VConsole = require('vconsole')
    Vue.use(new VConsole())
}

// mock
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}

window.$xy = Vue.prototype.$xy = {
    api,
    util,
    validate
}
