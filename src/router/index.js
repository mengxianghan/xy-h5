import Vue from 'vue'
import VueRouter from 'vue-router'
import {constantRouterMap, notFoundRouter} from '@/config/router'

Vue.use(VueRouter)

//自动化引入
const files = require.context('./modules', false, /\.js$/)
const routes = []
files.keys().forEach(key => {
    const item = files(key).default
    routes.push(...item)
})

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    },
    routes: [
        ...routes,
        ...constantRouterMap,
        notFoundRouter
    ]
})

export default router
