<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2020-11-01
 * @description: index
-->
<template>
    <container>
        <van-cell-group :border="false">
            <van-cell v-for="(item,index) in list"
                      :key="index"
                      :to="{name:item.name}"
                      :title="item.title"
                      is-link></van-cell>
        </van-cell-group>
    </container>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {name: 'echart', title: '图表 Echart'},
                {name: 'video', title: '视频 Video'},
                {name: 'flipCard', title: '翻牌 FlipCard'},
                {name: 'flipBook', title: '翻书 FlipBook'},
                {name: 'callApp', title: '唤醒App CallApp'}
            ]
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
