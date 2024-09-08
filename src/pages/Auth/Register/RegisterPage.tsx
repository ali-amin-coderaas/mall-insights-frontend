import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { Links } from "../../../shared/Links";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
	const navigate = useNavigate();

	return (
		<div className="card my-8 flex justify-content-center">
			<div className="flex flex-column md:flex-row gap-0 md:gap-8">
				<div className="w-full md:w-5">
					<RegisterForm />
				</div>
				<div className="w-full md:w-2">
					<Divider layout="vertical" className="hidden md:flex">
						<b>OR</b>
					</Divider>
					<Divider
						layout="horizontal"
						className="flex md:hidden"
						align="center"
					>
						<b>OR</b>
					</Divider>
				</div>
				<div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
					<Button
						label="Login"
						icon="pi pi-user-plus"
						severity="success"
						onClick={() => navigate(Links.AuthLinks.LoginPage())}
					/>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
