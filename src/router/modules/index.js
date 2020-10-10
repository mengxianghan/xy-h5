export default [
    {
        path: '/',
        component: () => import('@/views/index')
    },
    {
        path: '/video',
        component: () => import('@/views/video')
    }
]
