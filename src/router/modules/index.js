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
            title: '视频 Video'
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
    }
]
