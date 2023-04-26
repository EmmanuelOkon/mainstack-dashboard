import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  return (
    <div className="w-full">
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;
