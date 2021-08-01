import App from './App.vue'
import Vant from 'vant'

import '@/core/permission'

import 'vant/lib/index.css'
import '@/assets/style/index.scss'

import {createApp} from 'vue'
import {setupRouter} from './router'
import {setupStore} from './store'
import {setupDirective} from '@/directives'

function bootstrap() {
    const app = createApp(App)

    setupRouter(app)
    setupStore(app)
    setupDirective(app)

    app.use(Vant)

    app.mount('#app')
}

bootstrap()
