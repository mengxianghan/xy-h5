import Vue from 'vue'
import '@/components'
import api from '@/api'
import 'lib-flexible'
import '@/core/vant'
import '@/core/permission'
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

window.$api = Vue.prototype.$api = api
