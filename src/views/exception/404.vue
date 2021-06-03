<template>
    <container>
        <empty type="error"
               title="404"
               description="对不起，您访问的页面不存在">
            <template>
                <van-button type="primary-gradient"
                            round
                            @click="handleClick">返回
                </van-button>
            </template>
        </empty>
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
    methods: {
        handleClick() {
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
