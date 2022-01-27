<template>
<div class="pie">
    <apexchart  type="donut" width="450" :options="chartOptions" :series="series"></apexchart>
</div>
  
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
    props: ['series','labels','ititle'],
    data(){
        return {
            items: null,
            arrValue: [44, 55, 41],
            // series: this.list.count,
            chartOptions: {
                colors : ['#A5978B', '#8D5B4C', '#FF9800', '#43BCCD' ,'#1B998B' ,'#90EE7E','#1B998B','#4CAF50'],
                chart: {
                    type: 'donut',
                },
                theme: {
                    mode: 'light', 
                    palette: 'palette4', 
                    monochrome: {
                        enabled: false,
                        color: '#255aee',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                },
                labels: this.labels,
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 270,
                        expandOnClick: true,
                        offsetX: 0,
                        offsetY: 0,
                        customScale: 1,
                        dataLabels: {
                            offset: 0,
                            minAngleToShowLabel: 10
                        }, 
                        donut: {
                            size: '50%',
                            background: 'transparent',
                            labels: {
                                show: true,                              
                                value: {
                                    show: true,
                                    fontSize: '30px',
                                    fontFamily: 'Prompt',
                                    fontWeight: 800,
                                    color: undefined,
                                    offsetY: 16,
                                    formatter: function (val) {
                                        return val
                                    }
                                },
                                total: {
                                    show: true,
                                    fontSize: '20px',
                                    fontWeight: 800,
                                    fontFamily: 'Prompt',
                                    label: 'ทั้งหมด',
                                    color: '#1976d2'
                                    
                                }
                            },
                                                 
                        },
                    }
                },
                title: {
                    text: this.ititle,
                    style: {
                        fontSize:  '20px',
                        fontFamily: 'Prompt',
                        color: '#1976d2',
                    }
                },
                fill: {
                    type: 'gradient',
                },
                dataLabels: {
                    
                    formatter(val, opts) {
                        //  const name = opts.w.globals.labels[opts.seriesIndex]
                        //  return [name, val.toFixed(0)]
                        // return [val.toFixed(0)]
                        return [opts.w.globals.labels[opts.seriesIndex],opts.w.globals.series[opts.seriesIndex]]
                    },
                    style: {
                        fontSize: '18px',
                        colors: ['#333333'],
                        fontFamily: 'Prompt'
                    },
                    
                    dropShadow: {
                        enabled: false,
                        top: 3,
                        left: 3,
                        blur: 1,
                        color: '#fff',
                        opacity: 0.9
                    }
                },
                legend: {
                    show: false,
                    fontSize: '20px',
                    formatter(val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                    },
                    
                },
                responsive: [{
                    breakpoint: 800,
                    options: {
                        chart: {
                            width: 800
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }],
                
            },
        }
    },
    components: {
        'apexchart': VueApexCharts,
    },
    mounted() {        
        // this.arrValue = this.list.count //[1,2,3,4,5]
    }
}
</script>

<style scope>
.pie {
    margin-top: 20px;
}
</style>