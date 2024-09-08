import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Skeleton } from "primereact/skeleton";
import React, { useState } from "react";
import { useToast } from "../context/ToastContext";
import useApi from "../hooks/useApi";
import { DataTableProps, FieldProps } from "../types/dataTableInterfaces";
import { ColumnProps } from "./../types/dataTableInterfaces";

const DataTableComponent: React.FC<DataTableProps> = ({
	columns,
	createDialog: CreateDialog,
	fields,
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
		const dataToSubmit = fields.reduce(
			(acc: Record<string, string>, field: FieldProps) => {
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
					value={items}
					first={(currentPage - 1) * pageSize}
					header={header}
					footer={footer}
				>
					{columns.map((col: ColumnProps, index: number) => (
						<Column
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
					fields={fields}
					visible={dialogVisible}
					onHide={handleDialogHide}
					onSubmit={handleCreateDialogSubmit}
				/>
			)}
		</div>
	);
};

export default DataTableComponent;
