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
    externals: {},
    css: {
        env: [
            'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css',
            'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css'
        ]
    },
    js: {
        env: [
            'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js',
            //'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-h5-min.js'
        ],
        production: []
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
                filename: '[path].gz[query]',
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
