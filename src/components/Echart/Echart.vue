<!--
 * @Author: 孟祥涵
 * @Date: 2020-11-18
 * @Description: Echart
-->
<template>
    <div class="x-echart"
         ref="echart"></div>
</template>

<script>
import {color} from '@/components/Echart/theme'

export default {
    name: 'Echart',
    props: {
        option: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chart: null
        }
    },
    computed: {},
    watch: {
        option() {
            this.init()
        }
    },
    created() {
        this.$once('hook:beforeDestroy', () => {
            if (this.chart) {
                this.chart.dispose()
                this.chart = null
            }
        })
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const {option} = this
            if (!option || !Object.keys(option).length) return
            echarts.registerTheme('53', {
                color,
                label: {
                    fontFamily: 'PingFang SC'
                }
            })
            let chart = echarts.init(this.$refs.echart, '53')
            chart.setOption(option)

            this.$emit('complete', chart)

            this.chart = chart
        }
    }
}
</script>

<style lang="scss" scoped>
.x-echart {
    height: 375px;
}
</style>
