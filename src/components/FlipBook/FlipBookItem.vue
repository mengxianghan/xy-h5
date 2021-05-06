<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-05-06
 * @description: FlipBookItem
-->
<template>
    <div class="x-flip-book-item">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'FlipBookItem',
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
.x-flip-book-item {
    background: #fff;
}
</style>
