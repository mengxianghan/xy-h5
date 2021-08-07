<template>
    <van-popup v-model:show="modelValue"
               round
               :close-on-click-overlay="false">
        <div class="x-guide-open-browser">
            <img :src="require('./images/arrow.png')"
                 class="x-guide-open-browser__arrow">
            <div class="x-guide-open-browser-step">
                <div class="x-guide-open-browser-step-item">
                    <div class="x-guide-open-browser-step__header">
                        <span>1</span>
                        点击手机屏幕右上角
                    </div>
                    <div class="x-guide-open-browser-step__body">
                        <img :src="navbarImg"
                             class="x-guide-open-browser__navbar-image">
                    </div>
                </div>
                <div class="x-guide-open-browser-step-item">
                    <div class="x-guide-open-browser-step__header">
                        <span>2</span>
                        选择用浏览器打开
                    </div>
                    <div class="x-guide-open-browser-step__body">
                        <img :src="browserImg"
                             class="x-guide-open-browser__browser-image">
                    </div>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script>
/**
 * @name XGuideOpenBrowser
 * @description 引导打开浏览器
 */
import {ref} from 'vue'

export default {
    name: 'XGuideOpenBrowser',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const navbarImg = ref('')
        const browserImg = ref('')

        // android
        if (new RegExp('android').test(navigator.userAgent.toLowerCase())) {
            navbarImg.value = require('./images/navbar_android.png')
            browserImg.value = require('./images/browser_android.png')
        } else {
            navbarImg.value = require('./images/navbar_ios.png')
            browserImg.value = require('./images/browser_ios.png')
        }

        return {
            navbarImg,
            browserImg
        }
    }
}
</script>

<style lang="scss"
       scoped>
:global(.van-popup) {
    overflow-y: visible;
}

.x-guide-open-browser {
    width: 300px;
    background: transparent;
    position: relative;

    &__arrow {
        width: 56px;
        display: block;
        position: absolute;
        right: 0;
        bottom: calc(100% + 12px);
    }

    &-step {
        border-radius: 14px;
        padding: 40px 30px;
        background: #ffffff;

        &-item {
            &:nth-child(2) {
                margin: 40px 0 0 0;
            }
        }

        &__header {
            font-size: 18px;
            font-weight: 500;
            display: flex;
            align-items: center;

            span {
                width: 28px;
                height: 28px;
                background: $color-primary;
                border-radius: 10em;
                color: #ffffff;
                margin: 0 14px 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
            }
        }

        &__body {
            padding: 20px 0 0 0;
        }
    }

    &__navbar-image {
        width: 100%;
    }

    &__browser-image {
        width: 64px;
        display: flex;
        margin: 0 auto;
    }
}
</style>
