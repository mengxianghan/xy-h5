<template>
    <container>
        <video-player :options="options"
                      ref="video"
                      @ready="onReady"
                      @dispose="onDispose"></video-player>

        <van-button @click="handlePlay">播放</van-button>
        <van-button @click="handlePause">暂停</van-button>
    </container>
</template>

<script>
import videojs from 'video.js'

export default {
    data() {
        return {
            player: null,
            options: {
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
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
    },
    methods: {
        onReady(player) {
            this.player = player
        },
        onDispose() {
            this.player = null
        },
        handlePlay() {
            this.player.play()
        },
        handlePause() {
            this.player.pause()
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
