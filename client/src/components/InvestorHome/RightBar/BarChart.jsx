import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.fieldName),
    datasets: [
      {
        label: "Field Count",
        data: data.map((item) => item.count),
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {  // Updated from xAxes
        title: {
          display: true,
          text: 'Field Names'
        }
      },
      y: {  // Updated from yAxes
        title: {
          display: true,
          text: 'Count'
        },
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;