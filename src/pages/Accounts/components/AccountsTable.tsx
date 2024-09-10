import { Endpoints } from "../../../api/Endpoints";
import DataTableComponent from "../../../shared/components/DataTableComponent";
import DialogComponent from "../../../shared/components/DialogComponent";
import { Column } from "../../../shared/types/dataTableInterfaces";

const AccountsTable = () => {
	const endpoint = Endpoints.accounts();

	const createAccountFields = [
		{
			name: "name",
			label: "Name",
			type: "text",
		},
	];

	const columns: Column[] = [
		{
			field: "id",
			header: "ID",
			body: (rowData) => rowData.id,
		},
		{
			field: "name",
			header: "Name",
			body: (rowData) => rowData.name,
		},
		{
			field: "accountType",
			header: "Account Type",
			body: (rowData) => rowData.accountType,
		},
	];

	return (
		<DataTableComponent
			endpoint={endpoint}
			columns={columns}
			createDialog={DialogComponent}
			dialogFields={createAccountFields}
		/>
	);
};

export default AccountsTable;
