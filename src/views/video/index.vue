<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-03
 * @description: video
-->
<template>
    <container>
        <video-player :options="options"></video-player>
    </container>
</template>

<script>
export default {
    data() {
        return {
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
    methods: {}
}
</script>

<style lang="scss" scoped>
</style>
