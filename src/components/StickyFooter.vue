<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2020-11-01
 * @description: StickyFooter.vue
-->
<template>
    <div class="x-sticky-footer"
         ref="x-stickyFooter">
        <slot></slot>
        <div class="x-sticky-footer__placeholder"
             :style="{
                height:height
             }"></div>
    </div>
</template>

<script>
export default {
    name: 'StickyFooter',
    data() {
        return {
            height: 0
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
        this.$nextTick(() => {
            this.height = `${this.$slots.default[0].elm.clientHeight}px`
        })
    },
    methods: {}
}
</script>

<style lang="scss" scoped>

</style>
