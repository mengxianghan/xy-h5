<template>
    <container class="py-8-2">
        <audio-player @ready="onReady"></audio-player>
        <lyric :data-source="lyric"
               :current-time="current"></lyric>
        <div class="pa-8-2">
            <van-row :gutter="16"
                     type="flex"
                     justify="center"
                     align="center">
                <van-col class="pa-8-4"
                         :span="24">
                    <van-slider :value="current / duration || 0"
                                :max="1"
                                :min="0"
                                :step="0.001"
                                :button-size="15"
                                :bar-height="3"
                                active-color="#ff6839"
                                @drag-start="onDragStart"
                                @input="onSliderInput"
                                @change="onSlideChange">
                    </van-slider>
                </van-col>
                <van-col :span="6">
                    {{ current | secondsToTime }}
                </van-col>
                <van-col :span="12"
                         class="align-center">
                    <van-button v-if="paused"
                                icon="play"
                                round
                                @click="handlePlay"/>
                    <van-button v-if="!paused"
                                icon="pause"
                                round
                                @click="handlePause"/>
                </van-col>
                <van-col :span="6"
                         class="align-right">
                    {{ duration | secondsToTime }}
                </van-col>
            </van-row>
        </div>
    </container>
</template>

<script>
import {secondsToTime} from '@/utils/util'

export default {
    data() {
        return {
            player: null,
            current: 0,
            duration: 0,
            lyric: '',
            paused: true
        }
    },
    computed: {},
    filters: {
        secondsToTime
    },
    watch: {},
    created() {
    },
    mounted() {
        this.getLyric()
    },
    methods: {
        /**
         * 获取歌词
         * @return {Promise<void>}
         */
        async getLyric() {
            const res = await this.$xy.api.index.getLyric()
            this.lyric = res
        },
        /**
         * 初始化完成
         * @param player
         */
        onReady({player}) {
            player.autoplay = true
            player.src = '/static/1.mp3'

            player.addEventListener('canplay', () => {
                this.duration = player.duration
            })

            player.addEventListener('play', () => {
                this.paused = player.paused
            })

            player.addEventListener('pause', () => {
                this.paused = player.paused
            })

            player.addEventListener('timeupdate', () => {
                this.current = player.currentTime
            })

            this.player = player
        },
        /**
         * 播放
         */
        handlePlay() {
            this.player.play()
        },
        /**
         * 暂停
         */
        handlePause() {
            this.player.pause()
        },
        /**
         * 拖动开始
         */
        onDragStart() {
            this.player.pause()
        },
        /**
         * 进度条发生改变
         * @param value
         */
        onSliderInput(value) {
            this.value = value
            this.current = this.duration * value
        },
        /**
         * 拖动结束
         */
        onSlideChange() {
            this.player.currentTime = this.current
            this.player.play()
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
