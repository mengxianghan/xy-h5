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
                path: 'videoPlayer',
                name: 'videoPlayer',
                component: () => import('@/views/example/videoPlayer'),
                meta: {
                    title: '视频播放器 VideoPlayer'
                }
            },
            {
                path: 'audioPlayer',
                name: 'audioPlayer',
                component: () => import('@/views/example/audioPlayer'),
                meta: {
                    title: '音频播放器 AudioPlayer'
                }
            },
            {
                path: 'flipCard',
                name: 'flipCard',
                component: () => import('@/views/example/flipCard'),
                meta: {
                    title: '翻牌 FlipCard'
                }
            },
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/example/list'),
                meta: {
                    title: '列表 List'
                }
            }
        ]
    }
]
