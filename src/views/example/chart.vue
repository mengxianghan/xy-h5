<template>
    <x-container>
        <x-chart :options="options"></x-chart>
    </x-container>
</template>

<script>
import XContainer from '@/components/XContainer'
import XChart from '@/components/XChart'

export default {
    name: 'chart',
    components: {XChart, XContainer},
    setup() {
        const options = {
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
            options
        }
    }
}
</script>

<style lang="scss"
       scoped>

</style>
