const CompressionPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
    externals: {},
    css: [],
    js: []
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: `static`,
    devServer: {
        host: '0.0.0.0',
        port: 9002,
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
                args[0].title = '53助手'
                args[0].cdn = {}
                args[0].cdn.css = isProd ? assetsCDN.css : []
                args[0].cdn.js = isProd ? assetsCDN.js : []
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
