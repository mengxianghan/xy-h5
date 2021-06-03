export default {
    data() {
        return {
            searchForm: {},
            list: [],
            loading: false,
            loadingText: '正在努力加载',
            finished: false,
            finishedText: '暂无更多内容',
            error: false,
            errorText: '网络错误，点击重新加载',
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            }
        }
    },
    methods: {
        /**
         * 重置分页
         */
        resetPagination() {
            this.pagination = this.$options.data().pagination
        },
        /**
         * 重置加载
         */
        resetLoad() {
            this.list = []
            this.loading = false
            this.finished = false
            this.error = false
        },
        /**
         * 加载错误
         */
        loadError() {
            this.loading = false
            this.finished = false
            this.error = true
        },
        /**
         * 更新页码
         */
        updatePage(current) {
            this.$set(this.pagination, 'current', current ?? this.pagination.current + 1)
        }
    }
}
