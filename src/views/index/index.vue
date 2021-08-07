<template>
    <x-container>
        <van-cell-group :border="false">
            <van-cell v-for="(item,index) in list"
                      :key="index"
                      :to="{
                          name: item.name
                      }"
                      :title="item.title"
                      is-link></van-cell>
        </van-cell-group>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import XFlipCard from '@/components/XFlipCard'
import {ref} from 'vue'

export default {
    name: 'index',
    components: {
        XFlipCard,
        XContainer
    },
    setup() {
        const list = [
            {name: 'chart', title: '图表 Chart'},
            {name: 'videoPlayer', title: '视频播放器 VideoPlayer'},
            {name: 'audioPlayer', title: '音频播放器 AudioPlayer'},
            {name: 'flipCard', title: '翻牌 FlipCard'},
            {name: 'flipBook', title: '翻书 FlipBook'},
            {name: 'callApp', title: '唤醒App CallApp'},
            {name: 'list', title: '列表 List'},
            {name: 'pdfViewer', title: 'Pdf预览 PdfViewer'}
        ]

        return {
            list
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
