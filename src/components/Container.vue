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
            default: '#f8f8f8'
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
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.x-container {
    min-height: 100%;
}
</style>
