import {createRouter, createWebHistory} from 'vue-router'

const files = require.context('./modules', false, /\.js$/)
const routes = []
files.keys().forEach(key => {
    const item = files(key).default
    routes.push(...item)
})

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export function setupRouter(app) {
    app.use(router)
}

export default router
