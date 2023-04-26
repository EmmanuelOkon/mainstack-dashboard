import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

function DoughChart({ chartData }) {
  return (
    <div className="w-full">
      <Doughnut data={chartData} />
    </div>
  );
}

export default DoughChart;
