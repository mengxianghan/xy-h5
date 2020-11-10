<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-02
 * @Description: VideoPlayer
-->
<template>
    <div class="video-player">
        <div class="video-player__box">
        </div>
        <div :id="id"></div>
    </div>
</template>

<script>
    import {guid, toTime} from '@/utils/util'

    export default {
        name: "VideoPlayer",
        data() {
            return {
                id: `video-player-${guid()}`,
                player: null,
                video: null,
                paused: true,
                currentTime: 0,
                duration: 0,
                buffered: 0
            }
        },
        computed: {
            time() {
                return `${toTime(this.currentTime)}/${toTime(this.duration)}`
            },
            portionPercent() {
                return `${this.currentTime / this.duration * 100}%`
            },
            bufferedPercent() {
                return `${this.buffered / this.duration * 100}%`
            }
        },
        watch: {},
        created() {

        },
        mounted() {
            this.initPlayer()
        },
        methods: {
            /**
             * 初始化播放器
             */
            initPlayer() {
                const {id} = this
                const player = new Aliplayer({
                    id,
                    width: '100%',
                    height: '210px',
                    autoplay: false,
                    source: 'http://cdn.xuanyunet.com/video.mp4',
                    cover: 'https://img.alicdn.com/tps/TB1EXIhOFXXXXcIaXXXXXXXXXXX-760-340.jpg',
                    skinLayout: false
                }, (player) => {
                    const video = document.getElementById(this.id).getElementsByTagName('video')[0]
                    this.video = video
                })

                player.on('ready', () => {
                    this.duration = player.getDuration()
                })

                player.on('play', () => {
                    this.paused = false
                })

                player.on('pause', () => {
                    this.paused = true
                })

                player.on('timeupdate', (e) => {
                    this.currentTime = player.getCurrentTime()
                    if (this.buffered < this.duration) this.buffered = this.video.buffered.end(0)
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    $control-height: 40px;

    .video-player {
        position: relative;

        &__box {

        }
    }
</style>
