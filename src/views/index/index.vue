<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2020-11-01
 * @description: index
-->
<template>
    <container>
        <van-cell-group>
            <van-cell :to="{name:'echart'}"
                      title="图表 Echart"
                      is-link></van-cell>
            <van-cell :to="{name:'video'}"
                      title="视频 Video"
                      is-link></van-cell>
            <van-cell :to="{name:'flipCard'}"
                      title="翻牌 FlipCard"
                      is-link></van-cell>
        </van-cell-group>
    </container>
</template>

<script>
export default {
    data() {
        return {}
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
