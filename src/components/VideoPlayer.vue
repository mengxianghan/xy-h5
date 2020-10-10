<!--
* @description:
* @author: mengxianghan
-->
<template>
    <div class="video">
        <video class="video-js"
               ref="video"></video>
    </div>
</template>

<script>
    export default {
        name: "VideoPlayer",
        props: {
            options: {
                type: Object,
                default: () => ({})
            }
        },
        data() {
            return {
                player: null
            }
        },
        mounted() {
            this.player = videojs(this.$refs.video, this.options)
        }
    }
</script>

<style lang="scss" scoped>
    .video {
        width: 100%;
    }
</style>
