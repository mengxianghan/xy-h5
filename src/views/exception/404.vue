<template>
    <x-container>
        <van-empty description="对不起，您访问的页面不存在">
            <van-button round
                        type="primary"
                        :to="{
                            name: 'index',
                            replace: true
                        }">返回首页
            </van-button>
        </van-empty>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'

export default {
    name: '404',
    components: {
        XContainer
    }
}
</script>

<style lang="scss"
       scoped>
.van-button {
    --van-button-default-height: 40px;
    width: 120px;
}
</style>
