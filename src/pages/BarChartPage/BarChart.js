import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  PointElement,  // Added for 'point' element
  BarController  // Added for 'bar' controller
} from 'chart.js';
import { fetchBudgetData } from '../Data/Data';

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,  // Register 'point' element
  BarController  // Register 'bar' controller
);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // This will hold the titles of the budget items
    datasets: [
      {
        label: 'Budget Values',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
        data: [], // This will hold the values of the budget items
      },
    ],
  });

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const data = await fetchBudgetData();
        setChartData({
          labels: data.map(item => item.title), // Use the title as the label
          datasets: [
            {
              label: 'Budget Values',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              data: data.map(item => item.value), // Use the value for the bar lengths
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAPI();
  }, []);

  return (
    <div>
      <h2>Budget Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
