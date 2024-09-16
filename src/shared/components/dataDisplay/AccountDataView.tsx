import { Button } from "primereact/button";
import {
	DataViewLayoutOptions,
	DataView as PrimeDataView,
} from "primereact/dataview";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import React, { useState } from "react";
import GridItemTemplate from "../../../pages/Accounts/components/AccountTemplates";
import ListItemTemplate from "../../../pages/Accounts/components/listAccountTemplate";
import { Account } from "../../../pages/Accounts/types/accountInterfaces";
import { useToast } from "../../context/ToastContext";
import useApi from "../../hooks/useApi";
import { Data } from "../../types/ApiResponseInterfaces";
import { CreateDialogProps, Field } from "../../types/dataTableInterfaces";

export interface DataViewProps<T> {
	dialogFields: Field[];
	endpoint: string;
	createDialog: React.ComponentType<CreateDialogProps<T>>;
}

const AccountDataView = <T,>({
	dialogFields,
	endpoint,
	createDialog: CreateDialog,
}: DataViewProps<T>) => {
	const {
		data,
		isLoading,
		currentPage,
		totalItems,
		pageSize,
		searchQuery,
		setCurrentPage,
		setPageSize,
		setSearchQuery,
	} = useApi<Data<T>>(endpoint);

	const { createItemMutation } = useApi<T>(endpoint);

	const [dialogVisible, setDialogVisible] = useState(false);
	const [layout, setLayout] = useState<"list" | "grid">("grid"); // 'list' or 'grid' layout
	const { showToast } = useToast();

	const handleCreate = () => {
		setDialogVisible(true);
	};

	const handleDialogHide = () => {
		setDialogVisible(false);
	};

	const handleFilterInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};

	const handleCreateDialogSubmit = async (itemData: T) => {
		try {
			await createItemMutation.mutateAsync(itemData);
		} catch (error) {
			console.error("Error while creating item:", error);
		}
		showToast("success", "Created", "Item created successfully");
		setDialogVisible(false);
	};

	// const itemTemplate = GridItemTemplate;

	const itemTemplate = (account: Account, layout: string, index: number) => {
		if (!account) {
			return;
		}

		if (layout === "list") return ListItemTemplate(account, index);
		else if (layout === "grid") return GridItemTemplate(account);
	};

	const header = (
		<div className="flex flex-wrap gap-2 align-items-center justify-content-between">
			<InputText
				type="search"
				onInput={handleFilterInputChange}
				value={searchQuery}
				placeholder="Search..."
			/>
			<Button
				label="New"
				icon="pi pi-plus"
				severity="success"
				rounded
				onClick={handleCreate}
			/>
			<div className="flex justify-content-end">
				<DataViewLayoutOptions
					layout={layout}
					onChange={(e: any) => setLayout(e.value)}
				/>
			</div>
			{/* <DataViewLayoutOptions
				layout={layout}
				onChange={(e) => setLayout(e.value)}
			/> */}
		</div>
	);

	const footer = (
		<Paginator
			template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
			first={(currentPage - 1) * pageSize}
			totalRecords={totalItems}
			rows={pageSize}
			onPageChange={(e) => {
				setCurrentPage(e.page + 1);
				setPageSize(e.rows);
			}}
			rowsPerPageOptions={[5, 10, 25]}
		/>
	);

	return (
		<div>
			<div className="card">
				<PrimeDataView
					value={data?.items || []}
					// layout={layout}
					itemTemplate={itemTemplate}
					header={header}
					footer={footer}
				/>
			</div>
			{CreateDialog && (
				<CreateDialog
					isLoading={createItemMutation.isPending}
					fields={dialogFields}
					visible={dialogVisible}
					onHide={handleDialogHide}
					onSubmit={handleCreateDialogSubmit}
				/>
			)}
		</div>
	);
};

export default AccountDataView;
