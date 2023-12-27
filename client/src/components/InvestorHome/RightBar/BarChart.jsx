import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

const BarChart = ({ data }) => {
	const ChartData = {
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

	const chartOption = {
		scales: {
			x: {
				title: {
					display: true,
					text: "Field Names",
				},
			},
			y: {
				title: {
					display: true,
					text: "Count",
				},
			},
		},
	};

	return <Bar data={ChartData} options={chartOption} />;
};

export default BarChart;
