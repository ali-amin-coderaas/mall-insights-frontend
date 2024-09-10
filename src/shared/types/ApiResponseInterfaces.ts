export interface APIResponse<T> {
	status: Status;
	data: Data<T>;
	error: null;
	meta: Meta;
}

export interface Data<T> {
	items: T[];
	pagination?: Pagination | null;
	links?: string | null;
}


export interface SingleItemResponse<T> {
	status: Status;
	data: SingleItem<T>;
	error: null;
	meta: Meta;
}

export interface SingleItem<T> {
	items: T;
	pagination?: Pagination | null;
	links?: string | null;
}

export interface Pagination {
	currentPage: number;
	pageSize: number;
	totalItems: number;
	totalPages: number;
}

export interface Meta {
	version: string;
	api: string;
	environment: string;
	executionTime: string;
}

export interface Status {
	code: number;
	message: string;
	timestamp: Date;
	path: string;
	method: string;
	requestId: string;
}
