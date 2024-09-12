import { useMutation } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../../api/auth";
import InputField from "../../../../shared/components/InputField";
import { Links } from "../../../../shared/Links";
import { validateEmail } from "../../../../shared/utils/ValidateEmail";

const RegisterForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
	};

	const IsFormValid = () => {
		return firstName && validateEmail(email) && password.length >= 8;
	};

	const RegisterMutation = useMutation({
		mutationFn: () => registerUser(firstName, lastName, email, password),
		onSuccess: (data) => {
			if (data && data.token) {
				navigate(Links.AccountLinks.AccountsPage());
				clearForm();
			} else {
				console.error("Token not received in response:", data);
			}
		},
		onSettled: () => {
			clearForm();
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		RegisterMutation.mutateAsync();
		clearForm();
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-column align-items-center justify-content-center gap-3 py-5"
		>
			<InputField
				label={"First Name"}
				id="firstName"
				type="text"
				value={firstName}
				autoComplete="on"
				onChange={(e) => setFirstName(e.target.value)}
			/>

			<InputField
				label={"Last Name"}
				id="lastName"
				type="text"
				value={lastName}
				autoComplete="on"
				onChange={(e) => setLastName(e.target.value)}
			/>

			<InputField
				label={"Email"}
				id="email"
				type="email"
				value={email}
				autoComplete="email"
				onChange={(e) => setEmail(e.target.value)}
			/>

			<InputField
				label={"Password"}
				id="password"
				type="password"
				value={password}
				autoComplete="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button
				label="Register"
				icon="pi pi-user"
				className="w-10rem mx-auto"
				type="submit"
				disabled={!IsFormValid()}
				loading={RegisterMutation.isPending}
			/>
		</form>
	);
};

export default RegisterForm;
