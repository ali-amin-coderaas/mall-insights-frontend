import { Chart } from "primereact/chart";

type pieChartProps = {
	data?: object;
	options?: object;
};

const PieChart: React.FC<pieChartProps> = ({ data, options }) => {
	return (
		<div className="card">
			<Chart type="pie" data={data} options={options} />
		</div>
	);
};

export default PieChart;
