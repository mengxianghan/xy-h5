<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-02-03
 * @description: 卡片翻转
-->
<template>
    <div class="x-flip-card"
         :style="styles">
        <div class="x-flip-card__front">
            <slot name="front"></slot>
        </div>
        <div class="x-flip-card__back">
            <slot name="back"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FlipCard',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        transition: {
            type: String,
            default: '.5s'
        }
    },
    data() {
        return {
            count: 0
        }
    },
    computed: {
        /**
         * 旋转角度
         */
        angle() {
            return this.count * 180
        },
        /**
         * 样式
         */
        styles() {
            const {transition, angle = 0} = this
            return {
                'transition': transition,
                '-webkit-transform': `rotateY(${angle}deg)`,
                '-moz-transform': `rotateY(${angle}deg)`,
                'transform': `rotateY(${angle}deg)`
            }
        }
    },
    watch: {
        value() {
            this.count += 1
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        handleClick() {
            this.$emit('input')
        }
    }
}
</script>

<style lang="scss" scoped>
.x-flip-card {
    transform-style: preserve-3d;
    position: relative;
    -webkit-perspective: 1000px;
    -moz-perspective: 1000px;
    perspective: 1000px;
    width: 240px;
    height: 320px;

    &__front,
    &__back {
        transform-style: preserve-3d;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    &__front {
        z-index: 2;
        -webkit-transform: rotateY(0);
        -moz-transform: rotateY(0);
        transform: rotateY(0);
    }

    &__back {
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        transform: rotateY(180deg);
    }
}
</style>
