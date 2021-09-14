<template>
    <x-container>
        <x-audio-player @ready="onReady"></x-audio-player>

        <div :style="{padding: '24px'}">
            <van-slider :model-value="current / duration || 0"
                        :max="1"
                        :min="0"
                        :step="0.001"
                        :button-size="15"
                        :bar-height="3"
                        @drag-start="onDragStart"
                        @update:model-value="onSliderInput"
                        @change="onSlideChange">
            </van-slider>
        </div>

        <van-cell-group :border="false">
            <van-cell title="播放时长">{{ toTime(current) }}</van-cell>
            <van-cell title="总时长">{{ toTime(duration) }}</van-cell>
        </van-cell-group>

        <div :style="{padding: '24px'}">
            <van-button v-if="paused"
                        icon="play"
                        block
                        @click="handlePlay">播放
            </van-button>
            <van-button v-if="!paused"
                        icon="pause"
                        block
                        @click="handlePause">暂停
            </van-button>
        </div>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import XAudioPlayer from '@/components/XAudioPlayer'
import {ref} from 'vue'
import {toTime} from '@/utils/to'

export default {
    name: 'audioPlayer',
    components: {XAudioPlayer, XContainer},
    setup() {
        const player = ref(null)
        const current = ref(0)
        const duration = ref(0)
        const lyric = ref('')
        const paused = ref(true)
        const sliderValue = ref(0)

        /**
         * 播放
         */
        function handlePlay() {
            player.value.play()
        }

        /**
         * 暂停
         */
        function handlePause() {
            player.value.pause()
        }

        /**
         * 初始化完成
         * @param instance
         */
        function onReady(instance) {
            instance.autoplay = true
            instance.src = '/static/1.mp3'

            // 可以播放
            instance.addEventListener('canplay', () => {
                duration.value = instance.duration
            })

            // 播放
            instance.addEventListener('play', () => {
                paused.value = instance.paused
            })

            // 暂停
            instance.addEventListener('pause', () => {
                paused.value = instance.paused
            })

            // 时间发生变化
            instance.addEventListener('timeupdate', () => {
                current.value = instance.currentTime
            })

            player.value = instance
        }

        /**
         * 拖动开始
         */
        function onDragStart() {
            player.value.pause()
        }

        /**
         * 进度条发生改变
         * @param value
         */
        function onSliderInput(value) {
            sliderValue.value = value
            current.value = duration.value * value
        }

        /**
         * 拖动结束
         */
        function onSlideChange() {
            player.value.currentTime = current.value
            player.value.play()
        }

        return {
            handlePlay,
            handlePause,
            onReady,
            onDragStart,
            onSliderInput,
            onSlideChange,
            current,
            duration,
            paused,
            toTime
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
