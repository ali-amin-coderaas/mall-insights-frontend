import { AccountId } from "../pages/Accounts/types/AccountInterfaces";

export class Endpoints {
	//Homepage
	static home = () => "/";

	//Auth Endpoints
	static login = () => "/auth/login";
	static register = () => "/auth/register";

	//Account Endpoints
	static accounts = () => "/accounts";

	//Shop Endpoints
	static shops = (accountId: AccountId) => `/accounts/${accountId}/shops`;

	//analytics
	static accountsAnalytics = () => `/stats/accounts/type`;
	static shopsAnalytics = () => `/stats/shops/industry`;
}
