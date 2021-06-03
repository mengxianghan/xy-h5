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
