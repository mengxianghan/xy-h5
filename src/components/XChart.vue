<template>
    <div class="x-chart"
         ref="refChart"></div>
</template>

<script>
/**
 * @name XChart
 * @description 图表
 */
import {onMounted, ref, watch} from 'vue'

export default {
    name: 'XChart',
    props: {
        option: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, ctx) {
        const refChart = ref(null)

        watch(() => props.option, (val, oval) => {
            initData()
        })

        function initData() {
            const {option} = props
            if (!option || !Object.keys(option).length) return
            const chart = echarts.init(refChart.value)
            chart.setOption(option, true)
            ctx.emit('complete', chart)
        }

        onMounted(() => {
            initData()
        })

        return {
            refChart
        }
    }
}
</script>

<style lang="scss"
       scoped>
.x-chart {
    height: 100vw;
}
</style>
