import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	// baseURL: "https://recipes-expressjs-i6wd.onrender.com",
	baseURL: "http://localhost:8080",

	headers: {
		"Content-Type": "application/json",
	},
});

export const setupInterceptors = (logout: () => void): void => {
	api.interceptors.request.use(
		(config) => {
			const token = Cookies.get("jwtToken");
			if (token && config.headers) {
				config.headers.authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error: AxiosError) => {
			return Promise.reject(error);
		}
	);

	api.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			if (error.response?.status === 401 || error.response?.status === 403) {
				Cookies.remove("jwtToken");
				logout();
			}
			return Promise.reject(error);
		}
	);
};

export default api;
