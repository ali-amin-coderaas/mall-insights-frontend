import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Endpoints } from "../../../api/Endpoints";
import DialogComponent from "../../../shared/components/DialogComponent";
import { useToast } from "../../../shared/context/ToastContext";
import useApi from "../../../shared/hooks/useApi";
import { Links } from "../../../shared/Links";
import { Account } from "../types/accountInterfaces";

interface AccountPageHeaderProps {
	loading: boolean;
	account: Account | undefined;
	disabled?: boolean;
	fields?: any;
	[rest: string]: any;
}

const AccountPageHeader: React.FC<AccountPageHeaderProps> = ({
	loading,
	account,
	disabled = true,
	fields,
	...rest
}) => {
	const navigate = useNavigate();
	const { accountId } = useParams();
	const { deleteItemMutation, updateItemMutation } = useApi<Partial<Account>>(
		Endpoints.accounts()
	);
	const { showToast } = useToast();
	const [editDialogVisible, setEditDialogVisible] = useState(false);
	const [editableAccount, setEditableAccount] = useState({});

	const SkeletonLabelTemplate = (
		<div className="flex flex-column gap-2">
			<Skeleton width="5rem" height="1rem" />
			<Skeleton width="16rem" height="1.5rem" />
		</div>
	);

	const accountTypes = [
		{ label: "Personal", value: "Personal", severity: "primary" },
		{ label: "Business", value: "Business", severity: "warning" },
		{ label: "Non-Profit", value: "Non-Profit", severity: "success" },
	];

	const deleteAccount = async () => {
		try {
			await deleteItemMutation.mutateAsync({ id: Number(accountId) });
			navigate(Links.AccountLinks.AccountsPage());
		} catch (error) {
			throw error;
		}
	};

	const editAccount = async (formData: Partial<Account>) => {
		try {
			const updatedFields = { ...editableAccount, ...formData };

			await updateItemMutation.mutateAsync({
				id: Number(accountId),
				updatedData: updatedFields,
			});
			setEditDialogVisible(false);
			showToast("success", "account updated", "account updated successfully");
		} catch (error) {
			console.error("Error updating account:", error);
			showToast("error", "Update failed", "Unable to update account");
		}
	};

	const confirmDeleteDialog = () => {
		confirmDialog({
			message: "Are you sure you want to delete this account?",
			header: "Confirm",
			icon: "pi pi-exclamation-triangle",
			defaultFocus: "reject",
			accept: () => {
				deleteAccount();
				showToast("success", "Account deleted", "Account deleted successfully");
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
						<label htmlFor="account-name" className="text-sm font-regular">
							Account name
						</label>
						<p className="font-bold m-0">{account?.name}</p>
					</div>
				)}
				{loading ? (
					SkeletonLabelTemplate
				) : (
					<div>
						<label htmlFor="account-type" className="text-sm font-regular">
							Account type
						</label>
						<div>
							<Tag value={account?.accountType} />
						</div>
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
			name: "accountType",
			label: "Type",
			type: "dropdown",
			options: accountTypes,
		},
	];

	return (
		<div {...rest}>
			<Card title={title}></Card>

			<DialogComponent
				onSubmit={editAccount}
				visible={editDialogVisible}
				isLoading={updateItemMutation.isPending}
				fields={updateFields}
				forUpdate
				initialValue={account}
				onHide={() => setEditDialogVisible(false)}
			/>
			<ConfirmDialog />
		</div>
	);
};

export default AccountPageHeader;
