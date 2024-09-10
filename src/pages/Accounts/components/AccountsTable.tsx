import { Link } from "react-router-dom";
import { Endpoints } from "../../../api/Endpoints";
import DataTableComponent from "../../../shared/components/DataTableComponent";
import DialogComponent from "../../../shared/components/DialogComponent";
import { Column } from "../../../shared/types/dataTableInterfaces";

const AccountsTable = () => {
	const endpoint = Endpoints.accounts();

	console.log(
		"🚀 ~ file: AccountsTable.tsx:9 ~ AccountsTable ~ endpoint:",
		endpoint
	);

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
			body: (rowData) => (
				<Link to={`${endpoint}/${rowData.id}`} className="text-primary ">
					{rowData.name}{" "}
				</Link>
			),
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
