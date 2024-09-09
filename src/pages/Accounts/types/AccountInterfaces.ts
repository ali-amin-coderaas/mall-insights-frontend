export type AccountId = number;

export type Account = {
	id: AccountId;
	name: string;
	isActive: number;
	createdAt: Date;
	updatedAt: Date;
	accountType: string;
};
