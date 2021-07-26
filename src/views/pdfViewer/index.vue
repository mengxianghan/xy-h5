<template>
    <container>
        <van-progress v-if="loading"
                      :percentage="percentage"
                      :show-pivot="false"
                      class="progress"/>
        <pdf-viewer :url="pdfUrl"
                    @progress="onProgress"
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
        onProgress({loaded, total}) {
            this.percentage = Number.parseInt(loaded / total * 100)
        },
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
.progress {
    width: 100%;
    position: absolute;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 0;
}
</style>
