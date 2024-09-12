export interface AuthContextType {
	isLoggedIn: boolean;
	login: (token: string) => void;
	logout: () => void;
}

export interface AuthProviderProps {
	children: React.ReactNode;
}
