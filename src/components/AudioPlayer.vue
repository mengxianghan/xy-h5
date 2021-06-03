<template>
    <div ref="AudioPlayer"></div>
</template>

<script>
/**
 * @property {boolean} visibilitychange 是否监听前后台切换
 */
export default {
    name: 'AudioPlayer',
    props: {
        visibilitychange: {
            type: Boolean,
            default: false
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
            if (this.visibilitychange) document.removeEventListener('visibilitychange', this.onVisibilityChange)
        })
    },
    mounted() {
        let audio = document.getElementsByTagName('audio')[0]
        if (!audio) {
            audio = document.createElement('audio')
            this.$refs.AudioPlayer.appendChild(audio)
        }
        this.$nextTick(() => {
            if (this.visibilitychange) document.addEventListener('visibilitychange', this.onVisibilityChange)
            this.player = audio
            this.$emit('ready', {player: audio})
        })
    },
    methods: {
        onVisibilityChange() {
            if (document.hidden) {
                // 进入后台
                this.player.pause()
            } else {
                // 进入前台
                this.player.play()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
