<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-10
 * @Description: Wrapper
-->
<template>
    <div class="wrapper"
         :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Wrapper",
        props: {
            background: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        computed: {
            styles() {
                return {
                    background: this.background
                }
            }
        },
        watch: {},
        created() {
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        min-height: 100%;
    }
</style>
