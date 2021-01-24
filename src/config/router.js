/**
 * 未找到页面路由
 */
export const notFoundRouter = {
    path: '*',
    redirect: '/exception/404',
    meta: {}
}

/**
 * 基础路由
 * @type {*[]}
 */
export const constantRouterMap = [
    {
        path: '/exception/404',
        component: () => import('@/views/exception/404'),
        meta: {
            title: '404'
        }
    }
]
