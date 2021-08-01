<template>
    <div class="x-container"
         :style="styles">
        <slot></slot>
    </div>
</template>

<script>
/**
 * @name Container
 */
import {computed} from 'vue'

export default {
    name: 'Container',
    props: {
        background: {
            type: String,
            default: '#f7f7f7'
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
