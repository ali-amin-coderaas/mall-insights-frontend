export type AccountId = number;

export type Account = {
	id: AccountId;
	name: string;
	isActive: number;
	createdAt: Date;
	updatedAt: Date;
	accountType: string;
};

export type AccountAnalytics = {
	accountType: string;
	count: number;
};
