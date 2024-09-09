export interface ApiResponse<T> {
	data: ResponseData<T>;
}

export interface ResponseData<T> {
	items: T[];
	pagination: {
		totalItems: number;
		pageSize: number;
		currentPage: number;
		totalPages: number;
	};
	links: string | null;
}
