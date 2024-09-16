import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL: "https://recipes-expressjs-i6wd.onrender.com",
	// baseURL: "http://localhost:8080",

	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Sets up the Axios interceptors for the API client.
 *
 * @param logout - the logout function to call when an unauthorized response is received
 */
export const setupInterceptors = (logout: () => void) => {
	// Add Bearer token to all requests
	api.interceptors.request.use(
		(config) => {
			// Get the token from the cookies
			const token = Cookies.get("jwtToken");

			// If the token is present, add it to the headers
			if (token && config.headers) {
				config.headers.authorization = `Bearer ${token}`;
			}

			return config;
		},
		(error: AxiosError) => {
			// If there is an error in the request, reject the promise
			return Promise.reject(error);
		}
	);

	// Handle responses
	api.interceptors.response.use(
		(response: AxiosResponse) => {
			// If the response is successful, return the response
			return response;
		},
		(error: AxiosError) => {
			// If the response is unauthorized or forbidden, logout the user
			if (error.response?.status === 401 || error.response?.status === 403) {
				Cookies.remove("jwtToken");
				logout();
			}

			// If there is an error in the response, reject the promise
			return Promise.reject(error);
		}
	);
};

export default api;
