export default [
    {
        path: '/',
        component: () => import('@/views/index')
    },
    {
        path: '/echart',
        name: 'echart',
        component: () => import('@/views/echart'),
        meta: {
            title: '图表 Echart'
        }
    },
    {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: {
            title: '视频播放器 Video'
        }
    },
    {
        path: '/audio',
        name: 'audio',
        component: () => import('@/views/audio'),
        meta: {
            title: '音频播放器 Audio'
        }
    },
    {
        path: '/flipCard',
        name: 'flipCard',
        component: () => import('@/views/flipCard'),
        meta: {
            title: '翻牌 FlipCard'
        }
    },
    {
        path: '/flipBook',
        name: 'flipBook',
        component: () => import('@/views/flipBook'),
        meta: {
            title: '翻书 FlipBook'
        }
    },
    {
        path: '/callApp',
        name: 'callApp',
        component: () => import('@/views/callApp'),
        meta: {
            title: '唤醒App CallApp'
        }
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('@/views/list'),
        meta: {
            title: '列表 List'
        }
    }
]
