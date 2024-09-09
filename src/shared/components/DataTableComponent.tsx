import { Button } from "primereact/button";
import { Column as PrimeColumn } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import useApi from "../hooks/useApi";
import { CreateDialogProps, Field } from "../types/dataTableInterfaces";
import { Column } from "./../types/dataTableInterfaces";

export interface DataTableProps {
	columns: Column[];
	createDialog: React.ComponentType<CreateDialogProps>;
	dialogFields: Field[];
	endpoint: string;
}

const DataTableComponent: React.FC<DataTableProps> = ({
	columns,
	createDialog: CreateDialog,
	dialogFields,
	endpoint,
}) => {
	const {
		data: items,
		isLoading,
		currentPage,
		totalItems,
		pageSize,
		searchQuery,
		setCurrentPage,
		setPageSize,
		setSearchQuery,
		createItem,
	} = useApi(endpoint, true);

	const skeletonBodyTemplate = <Skeleton width="100%" />;

	const [dialogVisible, setDialogVisible] = useState(false);
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
	const handleCreateDialogSubmit = (formData: Record<string, string>) => {
		const dataToSubmit = dialogFields.reduce(
			(acc: Record<string, string>, field: Field) => {
				acc[field.name] = formData[field.name] || "";
				return acc;
			},
			{}
		);

		createItem(dataToSubmit);
		showToast("success", "Created", "Item created successfully");
		setDialogVisible(false);
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
				<DataTable
					scrollable
					scrollHeight="600px"
					value={items as any}
					first={(currentPage - 1) * pageSize}
					header={header}
					footer={footer}
				>
					{columns.map((col: Column, index: number) => (
						<PrimeColumn
							sortable
							key={index}
							field={col.field}
							header={col.header}
							body={isLoading ? () => skeletonBodyTemplate : col.body}
						/>
					))}
				</DataTable>
			</div>
			{CreateDialog && (
				<CreateDialog
					fields={dialogFields}
					visible={dialogVisible}
					onHide={handleDialogHide}
					onSubmit={handleCreateDialogSubmit}
				/>
			)}
		</div>
	);
};

export default DataTableComponent;
