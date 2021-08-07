<template>
    <div ref="refAudio"></div>
</template>

<script>
/**
 * @name XAudioPlayer
 * @description 音频播放器
 * @property {boolean} visibilitychange 是否监听进入后台，默认：false
 */
import {nextTick, onMounted, onUnmounted, ref} from 'vue'

export default {
    name: 'XAudioPlayer',
    props: {
        visibilitychange: {
            type: Boolean,
            default: false
        }
    },
    setup(props, ctx) {
        const refAudio = ref(null)
        const player = ref(null)

        function onVisibilityChange() {
            if (document.hidden) {
                player.value.pause()
            } else {
                player.value.play()
            }
        }

        onMounted(() => {
            let instance = document.getElementsByTagName('audio')[0]
            if (!instance) {
                instance = document.createElement('audio')
                refAudio.value.appendChild(instance)
            }
            nextTick(() => {
                if (props.visibilitychange) {
                    document.addEventListener('visibilitychange', onVisibilityChange)
                }
                player.value = instance
                ctx.emit('ready', instance)
            })
        })

        onUnmounted(() => {
            if (props.visibilitychange) {
                document.removeEventListener('visibilitychange', onVisibilityChange)
            }
        })

        return {
            refAudio
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
