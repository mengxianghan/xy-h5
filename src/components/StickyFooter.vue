<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-10
 * @Description: StickyFooter
-->
<template>
    <div class="sticky-footer"
         ref="stickyFooter">
        <slot></slot>
        <div class="sticky-footer__placeholder"
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
