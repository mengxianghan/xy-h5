<template>
    <container>
        <flip-card :value="turn"
                   class="flip-card">
            <template #front>
                <div class="flip-card-content">
                    <div>正面</div>
                    <div @click="handleTurn"
                         class="mt-8-1">
                        <van-button size="small"
                                    round
                                    type="primary">点击翻转
                        </van-button>
                    </div>
                </div>
            </template>
            <template #back>
                <div class="flip-card-content">
                    <div>反面</div>
                    <div @click="handleTurn"
                         class="mt-8-1">
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
}
</style>
