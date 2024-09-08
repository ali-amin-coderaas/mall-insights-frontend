import AccountsChartStats from "./components/AccountsChartStats";
import ShopChartStats from "./components/ShopsChartStats";

const DashboardPage = () => {
	return (
		<div className="flex gap-4 justify-content-between flex-wrap md:flex-nowrap">
			<AccountsChartStats />
			<ShopChartStats />
		</div>
	);
};

export default DashboardPage;
