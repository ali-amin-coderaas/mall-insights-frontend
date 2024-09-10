import { APIResponse, Data } from "../shared/types/ApiResponseInterfaces";
import api from "./api";
import {
	formatApiResponse,
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
	): Promise<APIResponse<T>> {
		try {
			const response = await api.get(this.endpoint, {
				params: {
					page: page,
					pageSize: pageSize,
					q: searchQuery,
					sortBy: sortBy,
					order: order,
				},
			});
			return formatApiResponse<T>(response);
		} catch (error) {
			throw error;
		}
	}

	async getById<T>(id: number): Promise<Data<T>> {
		try {
			const response = await api.get(`${this.endpoint}/${id}`);
			return formatSingleItemResponse<T>(response);
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
			const response = await api.get<Data<T>>(this.endpoint);
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
