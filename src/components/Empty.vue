<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-13
 * @Description: Empty
-->
<template>
    <van-empty :image="image"
               class="empty">
        <div v-if="title || $slots.title"
             class="empty__title">
            <slot v-if="$slots.title"
                  name="title"></slot>
            <template v-else>{{title}}</template>
        </div>
        <div v-if="description || $slots.description"
             class="empty__description">
            <slot v-if="$slots.description"
                  name="description"></slot>
            <template v-else>{{description}}</template>
        </div>
        <div class="empty__bottom"
             v-if="$slots.default">
            <slot></slot>
        </div>
    </van-empty>
</template>

<script>
    export default {
        name: "Empty",
        props: {
            image: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
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
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .empty {
        text-align: center;
        padding: 85px 0;

        ::v-deep {
            .van-empty {
                &__image {
                    width: 170px;
                    height: auto;
                }
            }
        }

        &__title {
            font-size: 20px;
            color: #000;
            font-weight: 500;
            margin-bottom: 14px;
        }

        &__description {
            font-size: 14px;
            color: #b2b2b2;
        }

        &__bottom {
            margin-top: 48px;
        }
    }
</style>
