import {
	makeDeleteRequest,
	makeGetRequest,
	makePostRequest,
	makePutRequest,
} from "./axiosFunctions";

export async function handleRequest<T>(
	method: "GET" | "POST" | "PUT" | "DELETE",
	url: string,
	data?: unknown,
	params?: unknown
): Promise<T> {
	try {
		switch (method) {
			case "GET":
				const getResponse = await makeGetRequest<T>(url, { params });
				return getResponse;
			case "POST":
				const postResponse = await makePostRequest<T>(url, data);
				return postResponse;
			case "PUT":
				const putResponse = await makePutRequest<T>(url, data);
				return putResponse;
			case "DELETE":
				await makeDeleteRequest(url);
				return {} as T; // For DELETE, return an empty object or relevant data
			default:
				throw new Error("Unsupported request method");
		}
	} catch (error) {
		console.error(`Error during ${method} request to ${url}:`, error);
		throw error;
	}
}
