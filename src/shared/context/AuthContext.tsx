import React, { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
	isLoggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

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
		const token = localStorage.getItem("jwtToken");
		return token !== null;
	});

	useEffect(() => {
		const token = localStorage.getItem("jwtToken");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const login = (token: string) => {
		localStorage.setItem("jwtToken", token);
		setIsLoggedIn(true);
	};

	const logout = () => {
		localStorage.removeItem("jwtToken");
		setIsLoggedIn(false);
	};

	console.log("Authentication state:", isLoggedIn);

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
