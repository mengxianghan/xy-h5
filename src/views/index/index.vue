<template>
    <container>
        <van-cell-group :border="false">
            <van-cell v-for="(item,index) in list"
                      :key="index"
                      :to="{name:item.name}"
                      :title="item.title"
                      is-link></van-cell>
        </van-cell-group>
    </container>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {name: 'echart', title: '图表 Echart'},
                {name: 'video', title: '视频播放器 Video'},
                {name: 'audio', title: '音频播放器 Audio'},
                {name: 'flipCard', title: '翻牌 FlipCard'},
                {name: 'flipBook', title: '翻书 FlipBook'},
                {name: 'callApp', title: '唤醒App CallApp'},
                {name: 'list', title: '列表 List'},
                {name: 'pdfViewer', title: 'Pdf预览 PdfViewer'}
            ]
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {}
}
</script>

<style lang="scss"
       scoped>
</style>
