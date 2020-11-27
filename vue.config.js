const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

/**
 * 获取对应的 CDN 资源
 * @param key
 * @returns {[]}
 */
const getAssetsCDN = (key) => {
    let res = []
    const data = assetsCDN[key]
    if (data.env) {
        res = data.env
    }
    if (data[process.env.NODE_ENV]) {
        res = [
            ...res,
            ...data[process.env.NODE_ENV]
        ]
    }
    return res
}

const assetsCDN = {
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'vant': 'vant',
        'jschardet': 'jschardet',
        'dayjs': 'dayjs',
        'video.js': 'videojs'
    },
    css: {
        env: [
            '//cdn.jsdelivr.net/npm/video.js@7.11.0/dist/video-js.min.css'
        ]
    },
    js: {
        env: [
            '//cdn.jsdelivr.net/npm/lib-flexible@0.3.2/flexible.min.js',
            '//cdn.jsdelivr.net/npm/video.js@7.11.0/dist/video.min.js',
            '//res.wx.qq.com/open/js/jweixin-1.6.0.js'
        ],
        production: [
            '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
            '//cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js',
            '//cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
            '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
            '//cdn.jsdelivr.net/npm/vant@2.11.0/lib/vant.min.js',
            '//cdn.jsdelivr.net/npm/jschardet@2.1.1/dist/jschardet.min.js',
            '//cdn.jsdelivr.net/npm/dayjs@1.9.6/dayjs.min.js'
        ]
    }
}

module.exports = {
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: process.env.VUE_APP_OUTPUT_DIR,
    assetsDir: `static`,
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        /*proxy: {
            '/': {
                target: 'http://192.168.1.50:8070',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    //'^/api': ''
                }
            }
        },*/
        watchOptions: {
            ignored: /node_modules|dist|.git|.idea/,
            poll: true
        }
    },
    configureWebpack: {
        externals: isProd ? assetsCDN.externals : {},
        plugins: [
            new CompressionPlugin({
                test: /\.(js|css)$/,
                filename: '[path][base].gz[query]',
                threshold: 10240,
                deleteOriginalAssets: false
            })
        ]
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_TITLE
                args[0].cdn = {}
                args[0].cdn.css = getAssetsCDN('css')
                args[0].cdn.js = getAssetsCDN('js')
                return args
            })
    },
    productionSourceMap: !isProd,
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'hack': `true; @import '~@/assets/style/theme.less'`
                },
                javascriptEnabled: true
            },
            sass: {
                prependData: `@import '~@/assets/style/vars.scss';`
            },
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({
                        rootValue: 37.5,
                        minPixelValue: 1
                    })
                ]
            }
        }
    }
}
