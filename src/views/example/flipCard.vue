<template>
    <x-container>
        <x-flip-card :model-value="turn"
                     class="flip-card">
            <template #front>
                <div class="flip-card-content">
                    <div>正面</div>
                    <div @click="handleClick"
                         class="mt-8">
                        <van-button type="primary"
                                    round
                                    size="small">点击翻转
                        </van-button>
                    </div>
                </div>
            </template>
            <template #back>
                <div class="flip-card-content">
                    <div>反面</div>
                    <div @click="handleClick"
                         class="mt-8-1">
                        <van-button type="primary"
                                    round
                                    size="small">点击翻转
                        </van-button>
                    </div>
                </div>
            </template>
        </x-flip-card>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import XFlipCard from '@/components/XFlipCard'
import {ref} from 'vue'

export default {
    name: 'flipCard',
    components: {XContainer, XFlipCard},
    setup() {
        const turn = ref(true)

        function handleClick() {
            turn.value = !turn.value
        }

        return {
            turn,
            handleClick
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card {
    &-content {
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-shadow: $box-shadow-base;
    }
}
</style>
