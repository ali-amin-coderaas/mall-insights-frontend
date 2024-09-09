export class Links {
	static HomePage = () => "/dashboard";

	//Account Links
	static AccountLinks = class {
		static AccountsPage = () => `/accounts`;
		// static SingleAccountPage = () => `/accounts/:accountId`;
		static SingleAccountPage = (accountId: number) => `/accounts/${accountId}`;
	};

	//Shop Links
	static ShopLinks = class {
		static ShopsPage = () => `/accounts/:accountId/shops`;
		// static SingleShopPage = () => `/accounts/:accountId/shops/:shopId`;
		static SingleShopPage = (shopId: number) =>
			`/accounts/:accountId/shops/${shopId}`;
	};

	//Auth Links
	static AuthLinks = class {
		static LoginPage = () => "/login";
		static RegisterPage = () => "/register";
	};
}
