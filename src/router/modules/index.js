export default [
    {
        path: '/',
        component: () => import('@/views/index')
    },
    {
        path: '/echart',
        name:'echart',
        component: () => import('@/views/echart')
    },
    {
        path: '/video',
        name:'video',
        component: () => import('@/views/video')
    },
    {
        path: '/flipCard',
        name:'flipCard',
        component: () => import('@/views/flipCard')
    },
    {
        path: '/flipBook',
        name:'flipBook',
        component: () => import('@/views/flipBook')
    }
]
