<template>
    <x-container>
        <van-list v-model:loading="page.loading"
                  v-model:error="page.error"
                  :finished="page.finished"
                  :loading-text="page.loadingText"
                  :finished-text="page.finishedText"
                  :error-text="page.errorText"
                  :immediate-check="false"
                  @load="onLoad">
            <van-cell v-for="item in page.list"
                      :key="item"
                      :title="item"/>
        </van-list>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import {usePagination} from '@/hooks/pagination'
import {onMounted} from 'vue'
import {Toast} from 'vant'

export default {
    name: 'list',
    components: {XContainer},
    setup(props, ctx) {
        const {page, onError} = usePagination()

        const onLoad = () => {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            page.loading = true
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    page.list.push(page.list.length + 1)
                }

                // 加载状态结束
                page.loading = false

                // 数据全部加载完成
                if (page.list.length >= 40) {
                    page.finished = true
                }
            }, 1000)
        }

        onMounted(() => {
            onError()
        })

        return {
            page,
            onLoad
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
