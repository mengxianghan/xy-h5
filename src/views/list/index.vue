<template>
    <container>
        <van-list :loading="loading"
                  :loading-text="loadingText"
                  :finished="finished"
                  :finished-text="finishedText"
                  :error.sync="error"
                  :error-text="errorText"
                  :immediate-check="false"
                  @load="getList">
        </van-list>
    </container>
</template>

<script>
import pagination from '@/mixins/pagination'

export default {
    mixins: [pagination],
    data() {
        return {
            list: []
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
        this.getList()
    },
    methods: {
        /**
         * 获取列表
         */
        async getList() {
            this.loading = true
            this.finished = false
            const {
                pagination: {current, pageSize},
                searchForm
            } = this
            const {codr, data} = await this.$xy.api.index
                .getList({
                    page: current,
                    pageSize,
                    ...searchForm
                })
                .catch(() => {
                    this.loadError()
                })
            this.loading = false
            if (resultCode === 200) {
                this.list.push(...(list || []))
                // 没有下一页
                if (list.length < pageSize) {
                    this.finished = true
                } else {
                    this.updatePage()
                }
            } else {
                this.loadError()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
