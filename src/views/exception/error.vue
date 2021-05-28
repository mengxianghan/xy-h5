<!--
* @author: 孟祥涵
* @email: 1056811341@qq.com
* @date: 2021-05-13
* @description: error
-->
<template>
    <container>
        <empty type="error"
               :title="title"
               :description="description">
            <template>
                <van-button type="primary-gradient"
                            round
                            to="/">首页
                </van-button>
            </template>
        </empty>
    </container>
</template>

<script>
export default {
    name: 'error',
    data() {
        return {}
    },
    computed: {
        title() {
            return decodeURIComponent(this.$route.query?.title ?? '')
        },
        description() {
            return decodeURIComponent(this.$route.query?.description ?? '')
        }
    },
    created() {
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
</style>
