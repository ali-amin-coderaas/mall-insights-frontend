import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../api/Endpoints";
import useApi from "../../shared/hooks/useApi";
import AccountPageHeader from "./components/AccountPageHeader";
import ShopsTable from "./components/ShopsTable";

const AccountPage = () => {
	const { accountId } = useParams();
	const { isLoading, getItemById } = useApi(Endpoints.accounts());
	const [account, setAccount] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = (await getItemById(Number(accountId))) as {
					data: { items: object };
				};
				if (!account) {
					navigate(`${Endpoints.accounts()}`);
					throw new Error("Account not found");
				}
				setAccount(account.data.items);
			} catch (error) {
				throw error;
			}
		};
		fetchAccount();
	}, [accountId]);

	return (
		<div className=" flex flex-column gap-4 align-items-center ">
			<h1>Account Information</h1>
			<AccountPageHeader
				loading={isLoading}
				account={account}
				setAccount={setAccount}
				fields={["name"]}
				className="w-full"
			/>
			<ShopsTable className="w-full" accountId={Number(accountId)} />
		</div>
	);
};

export default AccountPage;
