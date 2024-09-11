import { AxiosRequestConfig } from "axios";
import api from "../api";

// Reusable API request function
export async function makeGetRequest<T>(
	url: string,
	config?: AxiosRequestConfig
): Promise<T> {
	try {
		// Specify the response type `T` directly in the axios get method
		const response = await api.get<T>(url, config);
		return response.data; // Return the `data` field of the response
	} catch (error) {
		throw error;
	}
}

export async function makePostRequest<T>(
	url: string,
	data: any,
	config?: AxiosRequestConfig
): Promise<T> {
	try {
		const response = await api.post<T>(url, data, config);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function makePutRequest<T>(
	url: string,
	data: any,
	config?: AxiosRequestConfig
): Promise<T> {
	try {
		const response = await api.put<T>(url, data, config);
		return response.data;
	} catch (error) {
		throw error;
	}
}

export async function makeDeleteRequest(
	url: string,
	config?: AxiosRequestConfig
): Promise<void> {
	try {
		const response = await api.patch(url, config);
		return response.data;
	} catch (error) {
		throw error;
	}
}
