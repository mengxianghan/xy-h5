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
        res = res instanceof Array ? [...res, ...data[process.env.NODE_ENV]] : {...res, ...data[process.env.NODE_ENV]}
    }
    return res
}

const assetsCDN = {
    externals: {
        production: {}
    },
    css: {
        env: []
    },
    js: {
        env: [
            'https://cdn.jsdelivr.net/npm/lib-flexible@0.3.2/flexible.min.js',
            'https://cdn.jsdelivr.net/npm/echarts@5.1.2/dist/echarts.min.js'
        ],
        production: []
    }
}

module.exports = {
    configureWebpack: {
        externals: getAssetsCDN('externals', {})
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_TITLE
            args[0].cdn = {}
            args[0].cdn.css = getAssetsCDN('css')
            args[0].cdn.js = getAssetsCDN('js')
            return args
        })

        config.module.rule('images').test(/\.(png|jpe?g|gif|webp)(\?.*)?$/).use('url-loader').loader('url-loader').tap(options => ({
                ...options,
                limit: 1024 /// 文件大小（低于1Kb才会base64编码）
            })
        )
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    @import '~@/assets/style/vars.scss';
                    @import '~@/assets/style/mixin.scss';
                `
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
