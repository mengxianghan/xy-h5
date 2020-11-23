<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-10
 * @Description: Container
-->
<template>
    <div class="container"
         :style="styles">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Container",
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
    .container {
        min-height: 100%;
    }
</style>
