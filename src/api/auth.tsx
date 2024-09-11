import Cookies from "js-cookie";
import { LoginResponseData } from "../shared/types/loginInterfaces";
import api from "./api";
import { Endpoints } from "./Endpoints";
import { makePostRequest } from "./utils/axiosFunctions";

/**
 * Logs in a user with the given credentials.
 *
 * @param email - The email address of the user to log in.
 * @param password - The password of the user to log in.
 * @returns A promise that resolves with the login response data if the request is successful.
 * @throws An error if the request fails.
 */
export const loginUser = async (
	email: string,
	password: string
): Promise<LoginResponseData> => {
	try {
		// Make a POST request to the login endpoint with the email and password as JSON.
		// The response will contain the user's token, which we'll store in a cookie.
		const response = await makePostRequest<LoginResponseData>(
			Endpoints.login(),
			{ email, password }
		);

		// Store the user's token in a cookie.
		Cookies.set("jwtToken", response.token);

		// Return the response data, which should contain the user's token.
		return response;
	} catch (error) {
		throw error;
	}
};

export const registerUser = async (
	first_name: string,
	last_name: string,
	email: string,
	password: string
): Promise<LoginResponseData> => {
	try {
		const response = await makePostRequest<LoginResponseData>(
			Endpoints.register(),
			{
				first_name,
				last_name,
				email,
				password,
			}
		);
		return response;
	} catch (error) {
		throw error;
	}
};
