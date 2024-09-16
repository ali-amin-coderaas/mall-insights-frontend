import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import {
	AuthContextType,
	AuthProviderProps,
} from "../types/authContextInterfaces";
const defaultAuthContextValue: AuthContextType = {
	isLoggedIn: false,
	login: () => {},
	logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(
	defaultAuthContextValue
);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
		const token = Cookies.get("jwtToken");
		return token !== null;
	});

	useEffect(() => {
		const token = Cookies.get("jwtToken");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const login = (token: string) => {
		Cookies.set("jwtToken", token);
		setIsLoggedIn(true);
	};

	const logout = () => {
		Cookies.remove("jwtToken");
		setIsLoggedIn(false);
	};

	console.log("Authentication state:", isLoggedIn);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
