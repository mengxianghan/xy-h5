<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-05-06
 * @description: 唤醒App，参考文档：https://www.npmjs.com/package/callapp-lib
-->
<template>
    <container>
        <van-button type="primary"
                    @click="handleDownload">下载app
        </van-button>

        <guide-open-browser :value="showGuideOpenBrowser"></guide-open-browser>
    </container>
</template>

<script>
import CallApp from 'callapp-lib'
import {isQQ, isWeibo, isWeixin} from '@/utils/validate'

export default {
    data() {
        return {
            showGuideOpenBrowser: false, // 显示引导
            downloadUrl: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.tencent.mm&channel=0002160650432d595942&fromcase=60001' // 下载地址

        }
    },
    computed: {
        allowedCallApp() {
            return !(isWeixin() || isWeibo() || isQQ())
        }
    },
    watch: {},
    created() {
    },
    mounted() {
        this.openApp()
    },
    methods: {
        /**
         * 下载
         */
        handleDownload() {
            const {downloadUrl} = this
            if (!downloadUrl) {
                this.$toast('资源不存在')
                return
            }
            // 引导使用外部浏览器打开
            if (isWeixin() || isWeibo() || isQQ()) {
                this.showGuideOpenBrowser = true
                return
            }

            window.location.href = downloadUrl
        },
        /**
         * 唤醒app
         */
        openApp() {
            if (!this.allowedCallApp) return
            const protocol = 'weixin'
            const lib = new CallApp({
                scheme: {
                    protocol: protocol,
                    host: ''
                },
                intent: {
                    package: '',
                    scheme: protocol
                },
                //universal: {
                //    host: 'resource.53zaixian.com',
                //    pathKey: '*'
                //}
                //appstore: 'https://itunes.apple.com/cn/app/id432274380',
                //yingyongbao: '//a.app.qq.com/o/simple.jsp?pkgname=com.zhihu.android',
                fallback: ''
                //timeout: 2000
            })
            lib.open({
                path: '',
                callback: function () {
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
