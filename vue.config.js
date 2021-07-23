const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

/**
 * 获取对应的 CDN 资源
 * @param {string} key
 * @param {any} defaults 默认值
 * @returns {[]}
 */
const getAssetsCDN = (key, defaults = []) => {
    const data = assetsCDN[key]
    let res = data.env || defaults
    if (data[process.env.NODE_ENV]) {
        res = res instanceof Array ? [...res, ...data[process.env.NODE_ENV]] : { ...res, ...data[process.env.NODE_ENV] }
    }
    return res
}

const assetsCDN = {
    externals: {
        production: {
            'vue': 'Vue',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios',
            'vant': 'vant',
            'jschardet': 'jschardet',
            'dayjs': 'dayjs',
            'video.js': 'videojs',
            'sa-sdk-javascript': 'sensorsDataAnalytic201505',
            'lodash': '_',
            'qs': 'Qs'
        }
    },
    css: {
        env: [
            'https://cdn.jsdelivr.net/npm/video.js@7.12.0/dist/video-js.min.css',
            //'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/web/pdf_viewer.css'
        ]
    },
    js: {
        env: [
            'https://cdn.jsdelivr.net/npm/lib-flexible@0.3.2/flexible.min.js',
            'https://cdn.jsdelivr.net/npm/video.js@7.12.0/dist/video.min.js',
            'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
            'https://cdn.jsdelivr.net/npm/echarts@5.0.0/dist/echarts.min.js',
            'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
            'https://cdn.jsdelivr.net/npm/alloyfinger@0.1.16/alloy_finger.min.js',
            '/plugins/turn/turn.min.js',
            'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/build/pdf.min.js',
            'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.8.335/web/pdf_viewer.js'
        ],
        production: [
            'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
            'https://cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js',
            'https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
            'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
            'https://cdn.jsdelivr.net/npm/vant@2.12.21/lib/vant.min.js',
            'https://cdn.jsdelivr.net/npm/jschardet@2.1.1/dist/jschardet.min.js',
            'https://cdn.jsdelivr.net/npm/dayjs@1.9.6/dayjs.min.js',
            'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.16.9/sensorsdata.min.js',
            'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
            'https://cdn.jsdelivr.net/npm/qs@6.10.1/dist/qs.js'
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
        externals: getAssetsCDN('externals', {}),
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

        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
            .use('url-loader')
            .loader('url-loader')
            .tap(options => ({
                ...options,
                limit: 1024 /// 文件大小（低于1Kb才会base64编码）
            })
            )
    },
    productionSourceMap: !isProd,
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary': ' #ff6839',

                    // Button
                    'button-primary-background-color': '@primary',
                    'button-primary-border-color': '@primary',
                    'button-large-height': '48px',

                    // Cell
                    'cell-vertical-padding': '12px',

                    // Dialog
                    'dialog-confirm-button-text-color': '@primary',

                    // GoodsAction
                    'goods-action-height': '56px',
                    'goods-action-button-height': '38px',
                    'goods-action-button-danger-color': 'linear-gradient(304deg, #ff931e 0%, #ff6839 100%)',

                    // SubmitBar
                    'submit-bar-height': '56px',
                    'submit-bar-button-height': '38px'
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
