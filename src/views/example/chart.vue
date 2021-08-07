<template>
    <x-container>
        <x-chart :option="option"></x-chart>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import XChart from '@/components/XChart'

export default {
    name: 'chart',
    components: {XChart, XContainer},
    setup() {
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        }

        return {
            option
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
