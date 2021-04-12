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
            echarts.registerTheme('myechart', {
                color: [
                    '#ff6838', '#ff8660', '#ffa488', '#ffc3af', '#ffe1d7',
                    '#ff9600', '#ffab33', '#ffc066', '#ffd599', '#ffeacc',
                    '#b2e050', '#c1e673', '#d1ec96', '#e0f3b9', '#f0f9dc',
                    '#1dd793', '#3ddfa9', '#6be7bf', '#9befd3', '#cdf7e9',
                    '#27d2fd', '#4adbfd', '#74e4fe', '#a2edfe', '#d0f6fe'
                ],
                label: {
                    fontFamily: 'PingFang SC'
                }
            })
            let chart = echarts.init(this.$refs.echart, 'myechart')
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
