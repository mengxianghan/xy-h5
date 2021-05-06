<!--
 * @author: 孟祥涵
 * @email: 1056811341@qq.com
 * @date: 2021-05-06
 * @description: 歌词
-->
<template>
    <div class="x-lyric"
         ref="Lyric">
        <div v-for="(item, index) in list"
             :key="index"
             class="x-lyric__item"
             :class="{
                 'x-lyric__item--active': activeIndex === index
             }"
             ref="LyricItem">
            {{ item.content }}
        </div>
    </div>
</template>

<script>
import {timeToSeconds} from '@/utils/util'

export default {
    name: 'Lyric',
    props: {
        dataSource: {
            type: String,
            default: ''
        },
        currentTime: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            list: [],
            activeIndex: -1
        }
    },
    computed: {},
    watch: {
        dataSource() {
            this.formatLyric()
        },
        activeIndex() {
            const box = this.$refs.Lyric
            const item = this.$refs.LyricItem
            const current = item[this.activeIndex]
            if (box && box.scrollTo) {
                const top = current.offsetTop - box.clientHeight / 2 + current.clientHeight / 2
                box.scrollTo({
                    top: top < 0 ? 0 : top,
                    behavior: 'smooth'
                })
            }
        },
        currentTime(val) {
            const {list} = this
            for (let i in list) {
                const record = list[i]
                const next = list[i + 1]
                if ((record.seconds < val) && (next && next.seconds > val || !next)) {
                    this.activeIndex = Number.parseInt(i)
                }
            }
        }
    },
    created() {
    },
    mounted() {
        this.formatLyric()
    },
    methods: {
        formatLyric() {
            this.list = this.dataSource.split(/\n|\r\n/)
                .map(item => item.match(/\[(.*)\](.*)/))
                .filter(item => item && item[2])
                .map((item) => {
                    const [_, time, content] = item
                    return {
                        time,
                        seconds: timeToSeconds(time),
                        content
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.x-lyric {
    overflow: hidden;
    overflow-y: auto;
    height: 50vh;
    position: relative;

    &::-webkit-scrollbar {
        display: none;
    }

    &__item {
        font-size: 16px;
        line-height: 1.5;
        text-align: center;
        padding: 4px 0;
        color: $text-color-secondary;
        transition: transform 600ms;
        transform: scale(.85);

        &--active {
            color: $color-primary;
            transform: scale(1);
        }
    }
}
</style>
