import RouteViewLayout from '@/layouts/RouteViewLayout'

export default [
    {
        path: '/',
        name: 'index',
        component: () => import('@/views/index/index')
    },
    {
        path: '/example',
        name: 'example',
        component: RouteViewLayout,
        meta: {},
        children: [
            {
                path: 'chart',
                name: 'chart',
                component: () => import('@/views/example/chart'),
                meta: {
                    title: '图表 Chart'
                }
            },
            {
                path: 'flipCard',
                name: 'flipCard',
                component: () => import('@/views/example/flipCard'),
                meta: {
                    title: '翻牌 FlipCard'
                }
            }
        ]
    }
]
