export type AccountId = number;

export interface Account {
	id: AccountId;
	name: string;
	isActive: number;
	createdAt: Date;
	updatedAt: Date;
	accountType: string;
}
