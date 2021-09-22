import {reactive} from 'vue'

export function usePagination() {
    const page = reactive({
        searchForm: {},
        list: [],
        loading: false,
        loadingText: '正在努力加载',
        finished: false,
        finishedText: '暂无更多内容',
        error: false,
        errorText: '网络错误，点击重新加载',
        current: 1,
        pageSize: 10
    })

    /**
     * 更新页码
     */
    const nextPage = (current) => {
        page.current = current ?? page.current + 1
    }

    /**
     * 重置分页
     */
    const resetPage = () => {
        page.current = 1
        page.pageSize = 10
    }

    /**
     * 刷新
     */
    const refreshPage = () => {
        page.list = []
        page.loading = false
        page.finished = false
        page.error = false
    }

    /**
     * 加载错误
     */
    const onError = () => {
        page.loading = false
        page.finished = false
        page.error = true
    }

    return {
        page,
        nextPage,
        resetPage,
        refreshPage,
        onError
    }
}
