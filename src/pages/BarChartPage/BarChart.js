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

const pastelColors = [
  'rgba(119, 221, 119, 0.5)', // pastel green
  'rgba(119, 158, 203, 0.5)', // pastel blue
  'rgba(207, 166, 205, 0.5)', // pastel purple
  'rgba(253, 253, 150, 0.5)', // pastel yellow
  'rgba(255, 179, 71, 0.5)',  // pastel orange
  'rgba(255, 105, 97, 0.5)'   // pastel red
];

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
              // Map each item to a color, looping back to the start if there are more items than colors
              backgroundColor: data.map((_, index) => pastelColors[index % pastelColors.length]),
              borderColor: data.map((_, index) => pastelColors[index % pastelColors.length].replace('0.5', '1')),
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
    
           <div className="chartDiv" style={{ width: 1000, textAlign: "center" }}>
      <h2>Budget Bar Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
