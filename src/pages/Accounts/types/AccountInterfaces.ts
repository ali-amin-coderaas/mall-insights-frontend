export type AccountId = number;

export interface Account {
	accountid: AccountId;
	name: string;
	isActive: number;
	accountType: string; //TODO: check type
	createdAt: string;
	updatedAt: string;
}
