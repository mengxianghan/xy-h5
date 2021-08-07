<template>
    <div class="x-video-player">
        <video ref="refVideo"
               class="video-js"></video>
    </div>
</template>

<script>
import videojs from 'video.js'
import {nextTick, onMounted, onUnmounted, ref} from 'vue'

export default {
    name: 'XVideoPlayer',
    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    setup(props, ctx) {
        const player = ref(null)
        const refVideo = ref(null)

        /**
         * 创建实例
         */
        function createInstance() {
            const instance = videojs(refVideo.value, props.options, () => {
                ctx.emit('ready', instance)
            })

            player.value = instance
        }

        // 销毁实例
        function destroyInstance() {
            if (player.value) {
                player.value.dispose()
                player.value = null
                ctx.emit('dispose')
            }
        }


        onMounted(() => {
            nextTick(() => {
                createInstance()
            })
        })

        onUnmounted(() => {
            destroyInstance()
        })

        return {
            refVideo
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-video-player {
    width: 100%;
}
</style>
