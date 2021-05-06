import Vue from 'vue'
import vant from 'vant'
import store from '@/store'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger_vue'
import api from '@/api'
import '@/components'
import '@/core/permission'
import 'vant/lib/index.less'
import '@/assets/style/index.scss'

store.dispatch('sensors/init')
Vue.use(vant)
Vue.use(AlloyFingerPlugin)

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
    loading: {
        show: options => store.dispatch('app/showLoading', options),
        hide: () => store.dispatch('app/hideLoading')
    }
}

Vue.config.errorHandler = (err, vm, info) => {
    console.error(err)
}

