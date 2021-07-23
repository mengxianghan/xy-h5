<template>
    <container>
        <pdf-viewer :url="pdfUrl"
                    @success="onSuccess"
                    @error="onError"></pdf-viewer>
    </container>
</template>

<script>
export default {
    data() {
        return {
            percentage: 0,
            loading: true,
            pdfUrl: '/static/1.pdf'
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
        onSuccess() {
            this.loading = false
        },
        onError(err) {
            this.$toast(err.message)
        }
    }
}
</script>

<style lang="scss"
       scoped>
.pdf-viewer--complete {
    ::v-deep .x-pdf-viewer__main {
        position: relative;
    }
}
</style>
