<template>
    <div class="x-video-player">
        <video ref="VideoPlayer"
               class="video-js"></video>
    </div>
</template>

<script>
import videojs from 'video.js'

export default {
    name: 'VideoPlayer',
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    computed: {},
    watch: {},
    created() {
        this.$once('hook:beforeDestroy', () => {
            this.onDestroy()
        })
    },
    mounted() {
        this.init()
    },
    methods: {
        /**
         * 初始化
         */
        init() {
            const player = videojs(this.$refs.VideoPlayer,
                this.options,
                () => {
                    this.$emit('ready', player)
                }
            )

            this.player = player
        },
        /**
         * 销毁
         */
        onDestroy() {
            const {player} = this
            if (player) {
                player.dispose()
                this.$emit('dispose')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.x-video-player {
    width: 100%;
}
</style>
