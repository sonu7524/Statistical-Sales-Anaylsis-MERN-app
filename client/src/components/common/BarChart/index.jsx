import React from "react";
import { Bar } from "react-chartjs-2";
import "./styles.css";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        responsive: true,
        interaction: {
            intersect: false,
            mode: "index",
        },
    };
    const dataSet = {
        labels: chartData.map((item) => item.priceRange),
        datasets: [
          {
            label: 'Sales Count',
            data: chartData.map((item) => item.count), // Use map to extract the count values
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };
    return (
        <div className="line-chart">
            <Bar className="line-chart" data={dataSet} options={options} />
        </div>
    );
}

export default BarChart;