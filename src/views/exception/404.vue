<!--
 * @Author: 孟祥涵
 * @Date: 2020-12-08
 * @Description: 404
-->
<template>
    <container>
        <empty image="/images/empty_nodata@2x.png"
               title="404"
               description="对不起，您访问的页面不存在">
            <template>
                <van-button type="primary-gradient"
                            round
                            @click="handleBack">返回
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
            /**
             * 返回
             */
            handleBack() {
                this.$router.replace({
                    name: 'diagnosis'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .van-button {
        width: 140px;
    }
</style>
