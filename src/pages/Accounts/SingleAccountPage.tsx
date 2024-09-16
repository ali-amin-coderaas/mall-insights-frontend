import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import AccountPageHeader from "./components/AccountPageHeader";
import { Account } from "./types/accountInterfaces";
import ShopsView from "./views/ShopsView";

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
			<ShopsView accountId={Number(accountId)} className="w-full" />
		</div>
	);
};

export default SingleAccountPage;
