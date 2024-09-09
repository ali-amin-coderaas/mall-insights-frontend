import { Endpoints } from "../../../api/Endpoints";
import DataTableComponent from "../../../shared/components/DataTableComponent";
import DialogComponent from "../../../shared/components/DialogComponent";

const AccountsTable = () => {
	const endpoint = Endpoints.accounts();

	const createAccountFields = [
		{
			name: "name",
			label: "Name",
			type: "text",
		},
	];

	return (
		<DataTableComponent
			endpoint={endpoint}
			columns={
				[
					//TODO: Add columns
				]
			}
			createDialog={DialogComponent}
			dialogFields={createAccountFields}
		/>
	);
};

export default AccountsTable;
