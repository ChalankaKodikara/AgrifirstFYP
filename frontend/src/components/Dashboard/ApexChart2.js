import React from "react";
import Chart from 'react-apexcharts'

class ApexChart1 extends React.Component {
    constructor(props) {
        super(props);
        const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 30))

        this.state = {
            series: [{
                name: 'Healthy Plant',
                data: arr.map((a) => a + Math.floor(Math.random() * 40))
            },
            {
                name: 'Disease Detected',
                data: arr
            }],
            options: {
                toolbar: {
                    show: false
                },
                chart: {
                    type: 'area',
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false,
                    },
                    foreColor: '#000'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'date',
                    categories: Array.from({ length: 20 }, (_, i) => `2022-03-${i + 19}`)
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy'
                    },
                },
            },


        };
    }

    render() {
        return (
            <div id="chart" className="w-full">
                <Chart options={this.state.options} series={this.state.series} type="area" width="100%" />
            </div>
        );
    }
}

export default ApexChart1
