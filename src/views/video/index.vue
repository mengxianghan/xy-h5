<!--
 * @Author: MengXianghan
 * @Date: 2020-10-04
 * @Description: index
-->
<template>
    <div class="video-container">
        <div v-for="(item,index) in list"
             :key="item.id"
             class="video">
            <video-player :options="item.options"></video-player>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        mounted() {
            this.getVideoList()
        },
        methods: {
            async getVideoList() {
                try {
                    const {code, data} = await this.$xy.api.index.getVideoList()
                    if (code === '200') {
                        data.list.forEach((item) => {
                            this.list.push({
                                ...item,
                                options: {
                                    controls: true,
                                    fluid: true,
                                    preload: 'auto',
                                    playsinline: true,
                                    sources: [
                                        {
                                            src: item.url,
                                            type: 'video/mp4'
                                        }
                                    ]
                                }
                            })
                        })
                    }
                } catch (e) {

                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .video-container {
        background: #ccc;
    }

    .video {
        margin-bottom: 12px;
    }
</style>

