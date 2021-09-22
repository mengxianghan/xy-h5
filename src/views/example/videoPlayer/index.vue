<template>
    <x-container>
        <x-video-player :options="options"
                        @ready="onReady"
                        @dispose="onDispose"></x-video-player>
        <van-button @click="handlePlay">播放</van-button>
        <van-button @click="handlePause">暂停</van-button>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import XVideoPlayer from '@/components/XVideoPlayer'
import {ref} from 'vue'

export default {
    name: 'videoPlayer',
    components: {XVideoPlayer, XContainer},
    setup() {
        const player = ref(null)
        const options = {
            autoplay: false,
            controls: true,
            fluid: true,
            bigPlayButton: true,
            controlBar: {
                remainingTimeDisplay: false,
                pictureInPictureToggle: false,
                volumePanel: false,
                currentTimeDisplay: true,
                timeDivider: true,
                durationDisplay: true
            },
            sources: [
                {
                    src: 'http://cdn.xuanyunet.com/video.mp4',
                    type: 'video/mp4'
                }
            ]
        }

        function handlePlay() {
            player.value.play()
        }

        function handlePause() {
            player.value.pause()
        }

        function onReady(instance) {
            player.value = instance
        }

        function onDispose() {
            player.value = null
            console.log('销毁实例')
        }

        return {
            options,
            player,
            handlePlay,
            handlePause,
            onReady,
            onDispose
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
