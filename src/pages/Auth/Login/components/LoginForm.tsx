import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../../api/auth";
import { Endpoints } from "../../../../api/Endpoints";
import InputField from "../../../../shared/components/InputField";
import { useAuth } from "../../../../shared/hooks/useAuth";
import { Links } from "../../../../shared/Links";
import { LoginResponseData } from "../../../../shared/types/loginInterfaces";
import { validateEmail } from "../../../../shared/utils/ValidateEmail";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const IsFormValid = () => {
		return validateEmail(email) && password.length >= 8;
	};

	const clearForm = () => {
		setPassword("");
		setEmail("");
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const data: LoginResponseData = await loginUser(email, password);
			if (data && data.token) {
				login(data.token);
				navigate(Links.AccountLinks.AccountsPage());
				clearForm();
				setLoading(false);
			} else {
				console.error("Token not received in response:", data);
			}
		} catch (error) {
			console.error(error);
		}

		clearForm();
	};

	return (
		<form
			className="flex flex-column align-items-center justify-content-center gap-3 py-5"
			onSubmit={handleSubmit}
		>
			<InputField
				label={"Email"}
				id="email"
				type="email"
				value={email}
				autoComplete="email"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
			/>

			<InputField
				label={"Password"}
				id="password"
				type="password"
				value={password}
				autoComplete="current-password"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword(e.target.value)
				}
			/>
			<Button
				label="Login"
				icon="pi pi-user"
				className="w-10rem mx-auto"
				type="submit"
				disabled={!IsFormValid()}
				loading={loading}
			/>
		</form>
	);
}
