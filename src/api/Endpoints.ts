import { AccountId } from "../pages/Accounts/types/accountInterfaces";

export class Endpoints {
	//Homepage
	static home = () => "/";

	//Auth
	static login = () => "/auth/login";
	static register = () => "/auth/register";

	//Accounts
	static accounts = () => "/accounts";
	static singleAccount = (accountId: AccountId) => `/accounts/${accountId}`;

	//Shops
	static shops = (accountId: AccountId) => `/accounts/${accountId}/shops`;
	static singleShop = (shopId: number) =>
		`/accounts/:accountId/shops/${shopId}`;

	//analytics
	static accountsAnalytics = () => `/analytics/accounts/type`;
	static shopsAnalytics = () => `/analytics/shops/industry`;
}
