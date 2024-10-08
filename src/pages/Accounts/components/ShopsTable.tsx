import { Link } from "react-router-dom";
import { Endpoints } from "../../../api/Endpoints";
import DataTable from "../../../shared/components/dataDisplay/DataTable";
import DialogComponent from "../../../shared/components/DialogComponent";
import { Column, Field } from "../../../shared/types/dataTableInterfaces";
import { formatTimeStamp } from "../../../shared/utils/FormatTimeStamp";
import { AccountId } from "../types/accountInterfaces";

interface ShopsTableProps {
	accountId: AccountId;
	[rest: string]: any;
}

const ShopsTable: React.FC<ShopsTableProps> = ({ accountId, ...rest }) => {
	let endpoint = Endpoints.shops(accountId);

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
				<Link to={`${endpoint}/${rowData.id}`} className="text-primary">
					{rowData.name}
				</Link>
			),
		},
		{
			field: "businessName",
			header: "Business Name",
			body: (rowData) => rowData.businessName,
		},
		{
			field: "email",
			header: "Email",
			body: (rowData) => rowData.email,
		},
		{
			field: "createdAt",
			header: "Created On",
			body: (rowData) => formatTimeStamp(rowData.createdAt),
		},
		{
			field: "industry",
			header: "Industry",
			body: (rowData) => rowData.industry,
		},
	];

	const createFields: Field[] = [
		{ name: "name", label: "Name", type: "text" },
		{ name: "businessName", label: "Business Name", type: "text" },
		{ name: "email", label: "Email", type: "email" },
		{
			name: "industry",
			label: "Industry",
			type: "dropdown",
			options: [
				{ label: "Retail", value: "retail" },
				{ label: "Food", value: "food" },
				{ label: "Technology", value: "technology" },
				{ label: "Other", value: "other" },
			],
		},
	];

	return (
		<div {...rest}>
			<DataTable
				endpoint={endpoint}
				columns={columns}
				createDialog={DialogComponent}
				dialogFields={createFields}
			/>
		</div>
	);
};

export default ShopsTable;
