<template>
    <div class="x-container"
         :style="styles">
        <slot></slot>
    </div>
</template>

<script>
/**
 * @name XContainer
 * @description 容器
 */
import {computed} from 'vue'

export default {
    name: 'XContainer',
    props: {
        background: {
            type: String,
            default: '#f8f8f8'
        }
    },
    setup(props) {
        const styles = computed(() => ({
            background: props.background
        }))

        return {
            styles
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-container {
    min-height: 100%;
}
</style>
