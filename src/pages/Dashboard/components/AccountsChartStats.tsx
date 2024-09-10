import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import ApiService from "../../../api/ApiService";
import { Endpoints } from "../../../api/Endpoints";
import PieChart from "./charts/PieChart";
import { AccountAnalytics } from "../../Accounts/types/accountInterfaces";

export default function AccountChartStats({ ...rest }) {
	const [accountStats, setAccountStats] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchStats = async () => {
		setLoading(true);
		try {
			const apiService = new ApiService(Endpoints.accountsAnalytics());
			const accountStatsData = await apiService.getAnalytics<AccountAnalytics>();

			const accountData = accountStatsData.items.reduce(
				(acc: { [key: string]: number }, { accountType, count }) => {
					acc[accountType] = count;
					return acc;
				},
				{}
			);

			setAccountStats(accountData);
		} catch (error) {
			console.error("Error fetching stats:", error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchStats();
	}, []);

	const chartOptions = {
		maintainAspectRatio: false,
		aspectRatio: 0.8,
		plugins: {
			legend: {
				position: "right",
			},
			tooltip: {
				callbacks: {
					// TODO Fix typing
					label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
				},
			},
		},
	};

	return !loading ? (
		<div {...rest} className="surface-50 border-round shadow-2 p-3 w-full">
			<div className="flex justify-content-between align-items-center">
				<h2 className="m-0">Account Stats</h2>
				<Button
					icon="pi pi-refresh"
					rounded
					className="surface-500 border-none"
					size="small"
					onClick={fetchStats}
					tooltip="Refresh"
					tooltipOptions={{
						position: "bottom",
						showOnDisabled: true,
						showDelay: 300,
					}}
				/>
			</div>
			<PieChart
				data={{
					labels: Object.keys(accountStats),
					datasets: [
						{
							data: Object.values(accountStats),
							backgroundColor: ["#F97316", "#3B82F6", "#22C55E"],
						},
					],
				}}
				options={chartOptions}
			/>
		</div>
	) : (
		<Skeleton width="100%" height="20rem"></Skeleton>
	);
}
