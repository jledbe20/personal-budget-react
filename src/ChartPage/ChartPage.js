import React, { useState, useEffect } from "react";
import { Chart } from 'chart.js/auto';
import { Pie } from "react-chartjs-2";
import { ArcElement, CategoryScale, LinearScale } from 'chart.js';
import { fetchBudgetData } from "../Data/Data";

Chart.register(ArcElement, CategoryScale, LinearScale);

export default function PieChart() {
    const [chartData, setChartData] = useState(null);
    // const testChartData = {
    //     labels: ['eating out', 'rent', 'grocery'],
    //     datasets: [{
    //       data: [400, 800, 445],
    //       backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    //       borderColor: ['#FF6384', '#36A2EB', '#FFCE56',],
    //       borderWidth: 1
    //     }]
    //   };
      
      
    useEffect(() => {
        const fetchAPI = async () => {
            const budgetData = await fetchBudgetData();
            if (budgetData && budgetData.budget_items) {
                console.log("data changed hands! ", budgetData)
                setChartData({
                    labels: budgetData.budget_items.map(item => item.item),
                    datasets: [{
                        data: budgetData.budget_items.map(item => item.cost),
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
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40',
                            '#FFCD56'
                        ],
                        borderWidth: 1
                    }]
                }); 
            }            
        };

        fetchAPI();
        
    }, []);

    if (!chartData) return <div>Loading...</div>;
    // console.log("test data: \t", testChartData)
    console.log("actual data: \t", chartData)

    const options = {
        plugins: {
          legend: {
            display: true,
            labels: {
            //   color: 'black',
              font: {
                size: 18
              }
            }
          }
        }
      };
      
      
    return (
        <div className="chartDiv" style={{ width: 650, textAlign: "center" }}>
            <h1 style={{ fontFamily: "monospace" }}>
                Budget Distribution
            </h1>
            <Pie data={chartData} options={options} width={50} height={50} />
        </div>
    );
}
