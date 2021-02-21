<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2020-11-10
 * @description: Container.vue
-->
<template>
    <div class="x-container"
         :style="styles">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Container',
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
.x-container {
    min-height: 100%;
}
</style>
