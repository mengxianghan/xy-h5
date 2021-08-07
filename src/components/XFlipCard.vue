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
import {computed, ref, watch} from 'vue'

export default {
    name: 'XFlipCard',
    props: {
        valueModel: {
            type: Boolean,
            default: false
        },
        transition: {
            type: String,
            default: '.5s'
        }
    },
    setup(props) {
        const count = ref(props.valueModel ? 0 : 1)
        const angle = computed(() => count.value * 180)
        const styles = computed(() => ({
            'transition': props.transition,
            '-webkit-transform': `rotateY(${angle.value}deg)`,
            '-moz-transform': `rotateY(${angle.value}deg)`,
            'transform': `rotateY(${angle.value}deg)`
        }))

        watch(() => props.valueModel, () => count.value += 1)

        return {
            count,
            styles
        }
    }
}
</script>

<style lang="scss"
       scoped>
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
