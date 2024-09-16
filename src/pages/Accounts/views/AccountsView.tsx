import { Endpoints } from "../../../api/Endpoints";
import DataView from "../../../shared/components/dataDisplay/DataView";
import DialogComponent from "../../../shared/components/DialogComponent";
import { gridAccount, listAccount } from "../components/AccountTemplates";

const AccountsView = () => {
	const createAccountFields = [
		{
			name: "name",
			label: "Name",
			type: "text",
		},
	];
	return (
		<DataView
			createDialog={DialogComponent}
			dialogFields={createAccountFields}
			endpoint={Endpoints.accounts()}
			listItemTemplate={listAccount}
			gridItemTemplate={gridAccount}
		/>
	);
};

export default AccountsView;
