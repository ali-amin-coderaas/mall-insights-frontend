import { Chart } from "primereact/chart";


type BarChartProps = {
	data?: object 
	options?: object
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
	return (
		<div className="card">
			<Chart type="bar" data={data} options={options} />
		</div>
	);
};

export default BarChart;
