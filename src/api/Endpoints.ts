import { AccountId } from "../pages/Accounts/types/accountInterfaces";

export class Endpoints {
	//Homepage
	static home = () => "/";

	//Auth
	static login = () => "/auth/login";
	static register = () => "/auth/register";

	//Accounts
	static accounts = () => "/accounts";

	//Shops
	static shops = (accountId: AccountId) => `/accounts/${accountId}/shops`;

	//analytics
	static accountsAnalytics = () => `/analytics/accounts/type`;
	static shopsAnalytics = () => `/analytics/shops/industry`;
}
