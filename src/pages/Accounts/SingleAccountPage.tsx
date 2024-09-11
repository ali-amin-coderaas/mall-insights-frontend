import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import AccountPageHeader from "./components/AccountPageHeader";
import ShopsTable from "./components/ShopsTable";
import { Account } from "./types/accountInterfaces";

const SingleAccountPage = () => {
	const { accountId } = useParams();
	const { getItemById } = useApi<Account>(Endpoints.accounts());

	const { error, isLoading, item: Account } = getItemById(Number(accountId));

	const navigate = useNavigate();

	if (error) {
		navigate(Endpoints.accounts());
		throw new Error("Account not found");
	}
	return (
		<div className=" flex flex-column gap-4 align-items-center ">
			<h1>Account Information</h1>
			<AccountPageHeader
				loading={isLoading}
				account={Account}
				fields={["name"]}
				className="w-full"
			/>
			<ShopsTable className="w-full" accountId={Number(accountId)} />
		</div>
	);
};

export default SingleAccountPage;
