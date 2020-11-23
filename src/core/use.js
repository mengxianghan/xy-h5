import Vue from 'vue'
import Vant from 'vant'
import '@/components'
import api from '@/api'
import '@/core/permission'
import 'vant/lib/index.less'
import '@/assets/style/index.scss'

Vue.use(Vant)

//开启调试
if (process.env.VUE_APP_DEBUGGER === 'true') {
    const VConsole = require('vconsole')
    Vue.use(new VConsole())
}

// mock
if (process.env.VUE_APP_MOCK === 'true') {
    require('@/mock')
}

window.$api = Vue.prototype.$api = api
