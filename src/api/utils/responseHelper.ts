import { APIResponse, Data } from "../../shared/types/ApiResponseInterfaces";

export const formatApiResponse = <T>(response: any): APIResponse<T> => {
	return {
		status: response.data.status,
		data: {
			items: response.data.data.items, // Assume items is of type T[]
			pagination: {
				totalItems: response.data.data.pagination.totalItems,
				currentPage: parseInt(response.data.data.pagination.currentPage, 10),
				pageSize: parseInt(response.data.data.pagination.pageSize, 10),
				totalPages: response.data.data.pagination.totalPages,
			},
			links: response.data.data.links || null,
		},
		meta: response.data.meta,
		error: response.data.error,
	};
};

export const formatSingleItemResponse = <T>(response: any): Data<T> => {
	return {
		items: [response.data.data], // Single item response for getById and create
	};
};
