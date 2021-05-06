<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-04-30
 * @description: 翻书，API参考：http://www.turnjs.com/
-->
<template>
    <div>
        <div class="x-flip-book">
            <div v-finger:press-move="onPressMove"
                 v-finger:pinch="onPinch"
                 v-finger:multipoint-start="onMultipointStart"
                 v-finger:multipoint-end="onMultipointEnd"
                 :id="id"
                 class="x-flip-book-box"
                 :style="styles">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import {uniqueId} from 'lodash'

export default {
    name: 'FlipBook',
    props: {
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            id: uniqueId('flip-book-'),
            opts: {
                width: 300,
                height: 400,
                autoCenter: true,
                display: 'single',
                elevation: 0,
                ...this.options
            },
            flipBook: null,
            opacity: 0,
            initScale: 1,
            scale: 1,
            x: 0,
            y: 0
        }
    },
    computed: {
        styles() {
            const {x, y, scale, opacity, opts, duration} = this
            return {
                width: `${opts.width}px`,
                height: `${opts.height}px`,
                opacity,
                transform: `translate3d(${x}px, ${y}px, 0)  scale(${scale})`
            }
        }
    },
    watch: {
        options(val) {
            this.opts = {
                ...this.opts,
                ...val
            }
        }
    },
    created() {
    },
    mounted() {
        const {id} = this
        this.flipBook = $(`#${id}`)
        this.init()
    },
    methods: {
        /**
         * 初始化
         */
        init() {
            const {opts, flipBook} = this
            flipBook.turn(opts)
            this.opacity = 1
            this.$emit('ready', {el: flipBook})
        },
        onMultipointStart() {
            this.initScale = this.scale
        },
        onPinch(e) {
            this.scale = e.zoom * this.initScale
        },
        onMultipointEnd() {
            const {scale} = this
            if (scale < 1) {
                this.scale = 1
                this.x = 0
                this.y = 0
            }
        },
        onPressMove(e) {
            if (this.scale === 1) return
            this.x += e.deltaX
            this.y += e.deltaY
            e.preventDefault()
        }
    }
}
</script>

<style lang="scss" scoped>
.x-flip-book {
    position: relative;

    &-box {
        opacity: 0;
        transition: opacity .3s;
    }
}
</style>
