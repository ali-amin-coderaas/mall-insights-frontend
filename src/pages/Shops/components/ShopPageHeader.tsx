import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../../api/Endpoints";
import DialogComponent from "../../../shared/components/DialogComponent";
import { useToast } from "../../../shared/context/ToastContext";
import useApi from "../../../shared/hooks/useApi";
import { Links } from "../../../shared/Links";
import { Field } from "../../../shared/types/dataTableInterfaces";
import { Shop } from "../types/shopInterface";

interface ShopPageHeaderProps {
	loading: boolean;
	shop: Shop | undefined;
	setShop: React.Dispatch<React.SetStateAction<Shop | undefined>>;
	disabled?: boolean;
	fields?: Field[];
}

const ShopPageHeader: React.FC<ShopPageHeaderProps> = ({
	loading,
	shop,
	setShop,
	disabled = true,
	fields,
	...rest
}) => {
	const navigate = useNavigate();
	const { shopId } = useParams();
	const { deleteItem, updateItem } = useApi(Endpoints.shops(Number(shopId)));
	const { showToast } = useToast();
	const [editDialogVisible, setEditDialogVisible] = useState(false);
	const [editableShop, setEditableShop] = useState({});

	const SkeletonLabelTemplate = (
		<div className="flex flex-column gap-2">
			<Skeleton width="5rem" height="1rem" />
			<Skeleton width="16rem" height="1.5rem" />
		</div>
	);

	const shopTypes = [
		{ label: "Personal", value: "Personal", severity: "primary" },
		{ label: "Business", value: "Business", severity: "warning" },
		{ label: "Non-Profit", value: "Non-Profit", severity: "success" },
	];

	useEffect(() => {
		// Ensure we set the editable shop when the shop data is available
		if (shop) {
			const currentShop = shop; // Assuming we are editing the first shop for now
			setEditableShop(currentShop);
		}
	}, [shop]);

	const deleteShop = async () => {
		try {
			await deleteItem(Number(shopId));
			navigate(Links.ShopLinks.SingleShop(Number(shopId)));
			showToast("success", "shop deleted", "Shop deleted successfully");
		} catch (error) {
			showToast("error", "Delete failed", "Unable to delete shop");
		}
	};

	const editShop = async (formData: Partial<Shop>) => {
		try {
			const updatedFields = { ...editableShop, ...formData };

			await updateItem(Number(shopId), updatedFields);

			// Update the state with the modified shop data
			if (shop) {
				setShop(shop);
			}

			setEditDialogVisible(false);
			showToast("success", "shop updated", "Shop updated successfully");
		} catch (error) {
			console.error("Error updating shop:", error);
			showToast("error", "Update failed", "Unable to update shop");
		}
	};

	const confirmDeleteDialog = () => {
		confirmDialog({
			message: "Are you sure you want to delete this shop?",
			header: "Confirm",
			icon: "pi pi-exclamation-triangle",
			defaultFocus: "reject",
			accept: () => {
				deleteShop();
				showToast("success", "shop deleted", "shop deleted successfully");
			},
		});
	};

	const title = (
		<div className="flex justify-content-center sm:justify-content-between flex-wrap gap-4 align-items-center">
			<div className="flex gap-4 flex-wrap">
				{loading ? (
					SkeletonLabelTemplate
				) : (
					<div>
						<label htmlFor="shop-name" className="text-sm font-regular">
							shop name
						</label>
						<p className="font-bold m-0">{shop?.name}</p>
					</div>
				)}
				{loading ? (
					SkeletonLabelTemplate
				) : (
					<div>
						<label htmlFor="shop-type" className="text-sm font-regular">
							Industry
						</label>
						<div>{shop?.industry}</div>
					</div>
				)}
			</div>
			<div className="flex gap-2 flex-wrap">
				<Button
					label="Edit"
					icon="pi pi-pencil"
					rounded
					onClick={() => setEditDialogVisible(true)}
				/>
				<Button
					label="Delete"
					icon="pi pi-trash"
					severity="danger"
					rounded
					onClick={confirmDeleteDialog}
				/>
			</div>
		</div>
	);

	const updateFields = [
		{
			name: "name",
			label: "Name",
			type: "text",
		},
		{
			name: "shopType",
			label: "Type",
			type: "dropdown",
			options: shopTypes,
		},
	];

	return (
		<div {...rest}>
			<Card title={title}></Card>

			<DialogComponent
				onSubmit={editShop}
				visible={editDialogVisible}
				fields={updateFields}
				forUpdate
				initialValue={shop}
				onHide={() => setEditDialogVisible(false)}
			/>
			<ConfirmDialog />
		</div>
	);
};

export default ShopPageHeader;
