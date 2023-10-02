
import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

// example Chart.js React line chart from
// https://upmostly.com/tutorials/how-to-use-chart-js-with-react

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const LineChart = () => {
  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default LineChart;