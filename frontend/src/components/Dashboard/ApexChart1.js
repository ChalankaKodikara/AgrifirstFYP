import React from "react";
import Chart from 'react-apexcharts'

class ApexChart2 extends React.Component {
    constructor(props) {
        super(props);
        const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 30))

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
                colors: ["#1c9757", "#53df97"],
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
                    type: 'month',
                    categories: Array.from({length: 10}, (item, i) => `${new Date(0, i).toLocaleString('en-US', {month: 'long'})}, 2022`)
                    
                },
                tooltip: {
                    x: {
                        format: 'MMMM'
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

export default ApexChart2
