<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-03
 * @description: index
-->
<template>
    <container>
        <flip-card :value="turn"
                   class="flip-card">
            <template #front>
                <div class="flip-card-content">
                    正面
                    <div @click="handleTurn">
                        <van-button size="small"
                                    round
                                    type="primary">点击翻转
                        </van-button>
                    </div>
                </div>
            </template>
            <template #back>
                <div class="flip-card-content">
                    背面
                    <div @click="handleTurn">
                        <van-button size="small"
                                    round
                                    type="info">点击翻转
                        </van-button>
                    </div>
                </div>
            </template>
        </flip-card>
    </container>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            turn: false,
            count: 0
        }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
        handleClick(content) {
            console.log(content)
        },
        handleTurn() {
            this.turn = !this.turn
        }
    }
}
</script>

<style lang="scss" scoped>
.x-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card {
    &-content {
        width: 100%;
        height: 100%;
        background: #ccc;
    }
}
</style>
