import { AxiosRequestConfig } from "axios";
import api from "../api";

// Reusable API request function
export async function makeGetRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  try {
    // Specify the response type `T` directly in the axios get method
    const response = await api.get<T>(url, config);
    return response.data; // Return the `data` field of the response
  } catch (error) {
    throw error;
  }
}
