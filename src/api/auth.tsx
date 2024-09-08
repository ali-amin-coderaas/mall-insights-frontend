import { LoginResponseData } from "../shared/types/loginInterfaces";
import api from "./api";
import { Endpoints } from "./Endpoints";

export const loginUser = async (
	email: string,
	password: string
): Promise<LoginResponseData> => {
	try {
		const response = await api.post(
			Endpoints.login(),
			JSON.stringify({ email, password })
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const registerUser = async (
	first_name: string,
	last_name: string,
	email: string,
	password: string
) => {
	try {
		const response = await api.post(Endpoints.register(), {
			first_name,
			last_name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};
