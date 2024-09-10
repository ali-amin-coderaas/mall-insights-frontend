export interface Shop {
	id: number; // not editable
	accountId: number; // not editable
	name: string;
	businessName: string;
	email: string;
	businessAddress: string;
	internalAddress: string;
	taxInformation: string;
	isActive: number; // not editable
	createdAt: Date; // not editable
	updatedAt: Date; // not editable
	industry: string;
}


export type ShopAnalytics = {
	industry: string;
	count: number;
}