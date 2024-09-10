import {
	APIResponse,
	Data,
	SingleItemResponse,
} from "../shared/types/ApiResponseInterfaces";
import api from "./api";
import { makeGetRequest } from "./utils/axiosFunctions";
import {
	formatSingleItemResponse,
} from "./utils/responseHelper";

class ApiService {
	endpoint: string;

	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	async getAll<T>(
		page: number,
		pageSize: number,
		searchQuery: string,
		sortBy: string,
		order: string
	) {
		try {
			const response = await makeGetRequest<APIResponse<T>>(this.endpoint, {
				params: {
					page: page,
					pageSize: pageSize,
					q: searchQuery,
					sortBy: sortBy,
					order: order,
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async getById<T>(id: number): Promise<T> {
		try {
			// Pass in the type `SingleItemResponse<T>` for the expected response structure
			const response = await makeGetRequest<SingleItemResponse<T>>(
				`${this.endpoint}/${id}`
			);

			// Return the `items` field from the response data
			return response.data.items;
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

	async update<T>(id: number, data: T): Promise<Data<T>> {
		try {
			const response = await api.put(`${this.endpoint}/${id}`, data);
			return formatSingleItemResponse<T>(response);
		} catch (error) {
			throw error;
		}
	}

	async create<T>(data: T): Promise<Data<T>> {
		try {
			const response = await api.post(this.endpoint, data);
			return formatSingleItemResponse<T>(response);
		} catch (error) {
			throw error;
		}
	}

	async getAnalytics<T>() {
		try {
			const response = await makeGetRequest<APIResponse<T>>(this.endpoint);
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
}

export default ApiService;
