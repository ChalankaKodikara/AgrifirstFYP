import React from "react";
import Chart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [14, 23, 21, 17, 15, 10, 12],
      options: {
        labels: [
          "Corn",
          "Tomato",
          "Potato",
          "Carrot",
          "Bell peper",
          "Strawberry",
          "Pairs",
        ],
        plotOptions: {
          pie: {
            donut: {
              size: "70%",
            },
          },
        },
        chart: {
          type: "donut",
          foreColor: "#000",
        },
        stroke: {
          width: 5,
          colors: ["#fff"],
        },
        innerRadius: "2%",
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div id="chart" className="w-full">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
        />
      </div>
    );
  }
}

export default PieChart;
