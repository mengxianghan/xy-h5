<template>
    <container background="#f8f8f8">
        <flip-book :options="options"
                   @ready="onReady">
            <flip-book-item v-for="(item,index) in 10"
                            :key="index">
                this is page {{ index + 1 }}
            </flip-book-item>
        </flip-book>
    </container>
</template>

<script>
export default {
    data() {
        return {
            options: {
                pages: 10
            }
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {

    },
    methods: {
        onReady(e) {

        }
    }
}
</script>

<style lang="scss" scoped>
</style>
