import { Route, Routes } from "react-router-dom";
import AccountsPage from "../pages/Accounts/AccountsPage";
import AccountPage from "../pages/Accounts/SingleAccountPage";
import LoginPage from "../pages/Auth/Login/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import ShopPage from "../pages/Shops/SingleShopPage";
import Root from "../shared/components/layout/Root";
import { Links } from "../shared/Links";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RegisterPage from "../pages/Auth/Register/RegisterPage";

const AllRoutes = () => {
	return (
		<Routes>
			<Route element={<Root />}>
				<Route
					path={Links.HomePage()}
					element={
						<ProtectedRoute>
							<div>Welcome My User</div>
						</ProtectedRoute>
					}
				/>
				<Route
					path={Links.DashboardPage()}
					element={
						<ProtectedRoute>
							<DashboardPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path={Links.AuthLinks.LoginPage()}
					element={
						<PublicRoute>
							<LoginPage />
						</PublicRoute>
					}
				/>
				<Route
					path={Links.AuthLinks.RegisterPage()}
					element={
						<PublicRoute>
							<RegisterPage />
						</PublicRoute>
					}
				/>

				<Route path={Links.AccountLinks.AccountsPage()}>
					<Route
						index
						element={
							<ProtectedRoute>
								<AccountsPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path={Links.AccountLinks.SingleAccountPage()}
						element={
							<ProtectedRoute>
								<AccountPage />
							</ProtectedRoute>
						}
					/>

					<Route
						path={Links.ShopLinks.SingleShopPage()}
						element={
							<ProtectedRoute>
								<ShopPage />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route path="*" element={<div>404-page not found</div>} />
			</Route>
		</Routes>
	);
};

export default AllRoutes;
