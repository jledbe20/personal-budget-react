import React, { useState, useEffect } from "react";
import { Chart, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie } from "react-chartjs-2";
import { fetchBudgetData } from "../Data/Data";

Chart.register(ArcElement, CategoryScale, LinearScale);

export default function PieChart() {
    const [chartData, setChartData] = useState({
      datasets: [],
    });

    useEffect(() => {
        const fetchAPI = async () => {
            const budgetData = await fetchBudgetData();
            console.log("data changed hands! ", budgetData)
            setChartData({
                labels: budgetData.map(item => item.title),
                datasets: [{
                    data: budgetData.map(item => item.value),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#FFCD56'
                    ],
                    borderColor: [
                        '#FFFFFF'
                    ],
                    borderWidth: 1
                }]
            });
        };

        fetchAPI();
    }, []);

    if (chartData && chartData.datasets.length === 0) return <div>Loading...</div>;

    const options = {
        plugins: {
            legend: {
                display: true,
                labels: {
                    font: {
                        size: 18
                    }
                }
            }
        }
    };

    return (
        <div className="chartDiv" style={{ width: 650, textAlign: "center" }}>
            <h1 style={{ fontFamily: "monospace" }}>Budget Distribution</h1>
            <Pie data={chartData} options={options} />
        </div>
    );
}
