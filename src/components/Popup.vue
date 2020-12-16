<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-01
 * @Description: Popup
-->
<template>
    <van-popup :value="value"
               position="bottom"
               round
               safe-area-inset-bottom
               @click-overlay="onCancel">
        <div class="popup">
            <div class="popup__toolbar popup__toolbar--top"
                 v-if="showToolbar && toolbarPosition === 'top'">
                <div class="popup__cancel"
                     @click="handleCancel">
                    {{ cancelButtonText }}
                </div>
                <div class="popup__title">{{ title }}</div>
                <div class="popup__confirm"
                     @click="handleConfirm">
                    {{ confirmButtonText }}
                </div>
            </div>
            <div class="popup__body">
                <slot></slot>
            </div>
            <div class="popup__toolbar popup__toolbar--bottom"
                 v-if="showToolbar && toolbarPosition === 'bottom'">
                <van-button round>
                    {{ cancelButtonText }}
                </van-button>
                <van-button type="primary-gradient"
                            round>
                    {{ confirmButtonText }}
                </van-button>
            </div>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'Popup',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        toolbarPosition: {
            type: String,
            default: 'top'
        },
        showToolbar: {
            type: Boolean,
            default: false
        },
        title: {
            type: [String, Number],
            default: ''
        },
        confirmButtonText: {
            type: String,
            default: '确认'
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        }
    },
    data() {
        return {}
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
        /**
         * 确认
         */
        handleConfirm() {
            this.$emit('confirm')
            this.onCancel()
        },
        /**
         * 取消
         */
        handleCancel() {
            this.$emit('cancel')
            this.onCancel()
        },
        /**
         * 取消
         */
        onCancel() {
            this.$emit('input', false)
        }
    }
}
</script>

<style lang="scss" scoped>
.popup {
    display: flex;
    flex-direction: column;
    height: 100%;

    &__toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        flex-shrink: 0;

        &--bottom {
            padding: 0 32px;

            ::v-deep {
                .van-button {
                    flex: 1;

                    + .van-button {
                        margin-left: 24px;
                    }
                }
            }
        }
    }

    &__cancel,
    &__confirm {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
        font-size: 14px;
        color: #707070;
        font-weight: 500;
    }

    &__title {
        font-size: 16px;
        font-weight: 500;
        color: #2c2c2c;
    }

    &__body {
        flex: 1;
        overflow-y: auto;
    }
}
</style>
