<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-20
 * @Description: VideoPlayer
-->
<template>
    <div class="video-player">
        <video ref="VideoPlayer"
               class="video-js xy-player"></video>
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
                function onPlayerReady() {
                    // console.log('onPlayerReady')
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
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.video-player {
    width: 100%;
}

::v-deep {
    .xy-player {
        &.video-js {

            // 大播放按钮
            .vjs-big-play-button {
                background-color: rgba(0, 0, 0, .65);
                width: 40px;
                height: 40px;
                padding: 0;
                border: 0;
                border-radius: 10em;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                font-size: 24px;

                .vjs-icon-placeholder {
                    line-height: 1;

                    &:before {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }

            // 音量
            .vjs-volume-bar {
                &.vjs-slider-horizontal {
                    height: 2px;

                    .vjs-volume-level {
                        height: 2px;

                        &:before {
                            top: 50%;
                            transform: translate3d(0, -50%, 0);
                        }
                    }
                }

                &.vjs-slider-vertical {
                    width: 2px;

                    .vjs-volume-level {
                        width: 2px;

                        &:before {
                            left: 50%;
                            transform: translate3d(-50%, 0, 0);
                        }
                    }
                }
            }

            // 时间
            .vjs-current-time,
            .vjs-time-divider,
            .vjs-duration {
                display: initial;
            }

            .vjs-current-time {
                padding-right: 2px;
            }

            .vjs-duration {
                padding-left: 2px;
            }

            .vjs-time-divider {
                min-width: 0;
                padding: 0;
            }

            // 进度条
            .vjs-progress-holder {
                height: 2px;
            }

            .vjs-play-progress {
                &:before {
                    top: 50%;
                    transform: translate3d(0, -50%, 0);
                }
            }

        }
    }
}
</style>
