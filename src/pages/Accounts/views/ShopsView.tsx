import { Endpoints } from "../../../api/Endpoints";
import DataView from "../../../shared/components/dataDisplay/DataView";
import DialogComponent from "../../../shared/components/DialogComponent";
import { gridShop, listShop } from "../../Shops/components/ShopTemplates";
import { gridAccount, listAccount } from "../components/AccountTemplates";

const ShopsView = ({
	accountId,
	...rest
}: {
	accountId: number;
	[rest: string]: any;
}) => {
	const createAccountFields = [
		{
			name: "name",
			label: "Name",
			type: "text",
		},
		{
			name: "businessName",
			label: "Business Name",
			type: "text",
		},
		{
			name: "industtry",
			label: "Shop Industry",
			type: "dropdown",
			options: [
				{
					label: "Food",
					value: "Food",
				},
				{
					label: "Clothing",
					value: "Clothing",
				},
				{
					label: "Electronics",
					value: "Electronics",
				},
				{
					label: "Other",
					value: "Other",
				},
			],
		},
	];
	return (
		<div {...rest}>
			<DataView
				createDialog={DialogComponent}
				dialogFields={createAccountFields}
				endpoint={Endpoints.shops(accountId)}
				listItemTemplate={listShop}
				gridItemTemplate={gridShop}
			/>
		</div>
	);
};

export default ShopsView;
