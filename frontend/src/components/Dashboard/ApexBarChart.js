import React from "react";
import Chart from "react-apexcharts";

const defaultPlants = {
  legends: [
    "Corn_(maize)",
    "Tomato",
    "Potato",
    "Grape",
    "Pepper bell",
    "Strawberry",
    "Apple",
  ],
  data: [2, 5, 4, 1, 7, 1, 4],
};

const defaultDisease = {
  legends: [
    "Apple Black rot",
    "Apple scab",
    "Potato Early blight",
    "Grape Black rot",
    "Tomato Septoria leaf spot",
    "Tomato Target Spot",
    "Corn Common rust",
    "Strawberry Leaf scorch",
    "Pepper_bell Bacterial spot",
  ],
  data: [2, 2, 4, 1, 4, 1, 2, 1, 7],
};

class ApexBarChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Fungal Diseases",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "Bacterial Diseases",
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: "Viral Diseases",
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: "Nematode Infestations",
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: "Mycoplasma Diseases",
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: "Rice Diseases",
          data: [25, 12, 19, 32, 25, 24, 10],
        },
      ],
      options: {
        colors: [
          "#020969",
          "#09316C",
          "#10596F",
          "#188273",
          "#1FAA76",
          "#26D279",
          "#2DFA7C",
        ],
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          foreColor: "#000",
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#000"],
        },
        xaxis: {
          categories: [
            "Cabbage",
            "Potato",
            "Sweet potatoes",
            "Tomato",
            "Corn",
            "Garlic",
            "Green beans",
          ],
          labels: {
            formatter: function (val) {
              return val;
            },
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val;
            },
          },
        },
        fill: {
          opacity: 1,
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          offsetX: 40,
        },
      },
    };
  }

  render() {
    return (
      <div id="chart" className="w-full">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          width="100%"
        />
      </div>
    );
  }
}

export default ApexBarChart;
