<template>
    <x-container>
        <van-cell-group :border="false">
            <van-cell v-for="(item,index) in list"
                      :key="index"
                      :title="item.title"
                      :value="item.value"
                      is-link
                      @click="handleClick(item)"></van-cell>
        </van-cell-group>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import {useRouter} from 'vue-router'

export default {
    name: 'index',
    components: {
        XContainer
    },
    setup(_, ctx) {
        const router = useRouter()
        const list = [
            {name: 'chart', title: '图表 Chart'},
            {name: 'videoPlayer', title: '视频播放器 VideoPlayer'},
            {name: 'audioPlayer', title: '音频播放器 AudioPlayer'},
            {name: 'flipCard', title: '翻牌 FlipCard'},
            {name: 'flipBook', title: '翻书 FlipBook', value: '开发中'},
            {name: 'callApp', title: '唤醒App CallApp', value: '开发中'},
            {name: 'list', title: '列表 List'},
            {name: 'pdfViewer', title: 'Pdf预览 PdfViewer', value: '开发中'}
        ]

        function handleClick(item) {
            if (item.hasOwnProperty('value')) {
                return
            }
            router.push({
                name: item.name
            })
        }

        return {
            list,
            handleClick
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
