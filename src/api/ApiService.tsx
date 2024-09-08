import api from "./api";

class ApiService {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	async getAll(
		page: number,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	) {
		try {
			const response = await api.get(`${this.endpoint}`, {
				params: {
					page: page,
					pageSize: pageSize,
					q: searchQuery,
					sortBy: sortBy,
					order: order,
				},
			});

			return {
				status: response.data.status,
				data: {
					items: response.data.data.items,
					pagination: {
						totalItems: response.data.data.pagination.totalItems,
						currentPage: parseInt(
							response.data.data.pagination.currentPage,
							10
						),
						pageSize: parseInt(response.data.data.pagination.pageSize, 10),
						totalPages: response.data.data.pagination.totalPages,
					},
					links: null,
				},
				error: response.data.error || null,
				meta: response.data.meta,
			};
		} catch (error) {
			throw error;
		}
	}

	async getById<T>(id: number): Promise<{ data: T }> {
		try {
			const response = await api.get(`${this.endpoint}/${id}`);
			return {
				data: response.data,
			};
		} catch (error) {
			throw error;
		}
	}

	async softDelete(id: number): Promise<void> {
		try {
			await api.delete(`${this.endpoint}/${id}`);
		} catch (error) {
			throw error;
		}
	}

	async update<T>(id: number, data: T): Promise<T> {
		try {
			const response = await api.put(`${this.endpoint}/${id}`, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async create<T>(data: T): Promise<{ data: T[] }> {
		try {
			const response = await api.post(`${this.endpoint}/`, data);
			return { data: response.data.data.items };
		} catch (error) {
			throw error;
		}
	}

	async getAnalytics() {
		try {
			const response = await api.get(`${this.endpoint}`);
			return response.data;
		} catch (error: any) {
			console.error("Error fetching account stats:", error);
			throw new Error(
				`Failed to fetch account stats: ${
					error.response?.data?.message || error.message
				}`
			);
		}
	}

	// async getShopStats() {
	// 	try {
	// 		console.log(
	// 			"🚀 ~ file: ApiService.tsx:106 ~ ApiService ~ getShopStats ~ this.endpoint:",
	// 			this.endpoint
	// 		);
	// 		const response = await api.get(`${this.endpoint}/shops/industry`);
	// 		return response.data;
	// 	} catch (error: any) {
	// 		console.error("Error fetching shop stats:", error);
	// 		throw new Error(
	// 			`Failed to fetch shop stats: ${
	// 				error.response?.data?.message || error.message
	// 			}`
	// 		);
	// 	}
	// }
}

export default ApiService;
