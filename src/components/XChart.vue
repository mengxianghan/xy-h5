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
        options: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, ctx) {
        const refChart = ref(null)

        watch(() => props.options, (val, oval) => {
            initData()
        })

        function initData() {
            const {options} = props
            if (!options || !Object.keys(options).length) return
            const chart = echarts.init(refChart.value)
            chart.setOption(options, true)
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
