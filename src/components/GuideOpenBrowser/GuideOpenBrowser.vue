<template>
    <van-popup :value="value"
               :close-on-click-overlay="false"
               class="x-guide-open-browser">
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
    </van-popup>

</template>

<script>
import {isIos} from '@/utils/validate'

export default {
    name: 'GuideOpenBrowser',
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            navbarImg: '',
            browserImg: ''
        }
    },
    computed: {},
    watch: {},
    created() {
        if (isIos()) {
            this.navbarImg = require('./images/navbar-ios.png')
            this.browserImg = require('./images/browser-ios.png')
        } else {
            this.navbarImg = require('./images/navbar-android.png')
            this.browserImg = require('./images/browser-android.png')
        }
    },
    mounted() {
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.x-guide-open-browser {
    width: 300px;
    background: transparent;
    overflow: visible;
    transform: translate3d(-50%, 0, 0);
    top: 38px;

    &__arrow {
        width: 56px;
        display: block;
        margin: 0 0 11px auto;
    }

    &-step {
        border-radius: 14px;
        padding: 40px 30px;
        background: #fff;

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
                color: #fff;
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
