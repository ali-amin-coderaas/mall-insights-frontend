import { Chart } from "primereact/chart";
import React from "react";

const PieChart = ({ data, options }) => {
	return (
		<div className="card">
			<Chart type="pie" data={data} options={options} />
		</div>
	);
};

export default PieChart;
