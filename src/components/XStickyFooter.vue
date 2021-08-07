<template>
    <div class="x-sticky-footer">
        <div class="x-sticky-footer__content">
            <slot></slot>
        </div>
        <div class="x-sticky-footer__placeholder"
             :style="{ height }"></div>
    </div>
</template>

<script>
/**
 * @name XStickyFooter
 * @description 底部固定
 */
import {ref, onMounted} from 'vue'

export default {
    name: 'XStickyFooter',
    setup(props, ctx) {
        const height = ref(0)

        onMounted(() => {
            height.value = `${ctx.slots.default()[0].el.clientHeight}px`
        })

        return {
            height
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-sticky-footer {
    width: 100%;

    &__content {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;

        @include safe-area-inset-bottom;
    }
}
</style>
