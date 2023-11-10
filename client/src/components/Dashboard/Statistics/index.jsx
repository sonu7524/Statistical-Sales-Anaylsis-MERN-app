import BarChart from "../../common/BarChart";
import { useState, useEffect } from "react";
import { getChartData } from "../../../functions/getStatisticsData";
import "./styles.css";

export default function StatisticalComponent({ selectedMonth }) {
    let [chartData, setChartData] = useState([]);
    let [salesData, setSalesData] = useState([]);
    useEffect(() => {
        if(selectedMonth){
          fetchDataFromAPI();
        }
      }, [selectedMonth]);
      async function fetchDataFromAPI () {
        const data = await getChartData(selectedMonth === "All" ? "01" : selectedMonth);
        console.log(data);
        setChartData(data.barChartData);
        setSalesData([data.totalSaleAmount, data.totalSoldItems, data.totalNotSoldItems]);
      };
      
    return (
        <div className="statistics">
            <div className="bar-chart">
                <h3>Bar Graph</h3>
                <BarChart chartData={chartData} />
            </div>
            <div className="statistics-count">
                <h2>Sales Count</h2>
                <tr>
                    <td className="sales-label">Total Sales:</td>
                    <td className="sales-data">${salesData[0]?.totalSaleAmount.toFixed(2)}</td>
                </tr>
                <tr>
                    <td className="sales-label">Total Sold Items:</td>
                    <td className="sales-data">{salesData[1]?.totalSoldItems}</td>
                </tr>
                <tr>
                    <td className="sales-label">Total Not Sold Items:</td>
                    <td className="sales-data">{salesData[2]?.totalNotSoldItems}</td>
                </tr>
            </div>
        </div>
    )
}