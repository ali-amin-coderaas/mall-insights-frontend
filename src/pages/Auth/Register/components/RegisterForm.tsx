import { Button } from "primereact/button";
import { useState } from "react";
import { registerUser } from "../../../../api/auth";
import InputField from "../../../../shared/components/InputField";
import { validateEmail } from "../../../../shared/utils/ValidateEmail";

const RegisterForm = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
	};

	const IsFormValid = () => {
		return firstName && validateEmail(email) && password.length >= 8;
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		if (IsFormValid()) {
			try {
				const response = await registerUser(
					firstName,
					lastName,
					email,
					password
				);
				console.log(response);
				setLoading(false);
				clearForm();
			} catch (error) {
				console.error(error);
			}
		}
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
				loading={loading}
			/>
		</form>
	);
};

export default RegisterForm;
