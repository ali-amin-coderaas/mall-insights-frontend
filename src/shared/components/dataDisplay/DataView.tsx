import { Button } from "primereact/button";
import {
	DataViewLayoutOptions,
	DataView as PrimeDataView,
} from "primereact/dataview";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import useApi from "../../hooks/useApi";
import { Data } from "../../types/ApiResponseInterfaces";
import { CreateDialogProps, Field } from "../../types/dataTableInterfaces";

export interface DataViewProps<T> {
	createDialog: React.ComponentType<CreateDialogProps<T>>;
	dialogFields: Field[];
	endpoint: string;
	listItemTemplate: (product: T) => JSX.Element;
	gridItemTemplate: (product: T) => JSX.Element;
}

export default function DataView<T>({
	listItemTemplate,
	gridItemTemplate,
	dialogFields,
	endpoint,
	createDialog: CreateDialog,
}: DataViewProps<T>) {
	const [layout, setLayout] = useState("grid");
	const [dialogVisible, setDialogVisible] = useState(false);
	const layoutValue = layout as "list" | "grid";

	const {
		data,
		currentPage,
		isLoading,
		totalItems,
		pageSize,
		searchQuery,
		setCurrentPage,
		setPageSize,
		setSearchQuery,
	} = useApi<Data<T>>(endpoint);

	const { createItemMutation } = useApi<T>(endpoint);
	const { showToast } = useToast();

	const itemTemplate = (item: T, layout?: string | "list" | "grid") => {
		if (!item) {
			return;
		}

		if (layout === "list") return listItemTemplate(item);
		else if (layout === "grid") return gridItemTemplate(item);
	};

	const handleFilterInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};

	const handleCreate = () => {
		setDialogVisible(true);
	};

	const handleDialogHide = () => {
		setDialogVisible(false);
	};
	const handleCreateDialogSubmit = async (data: T) => {
		try {
			await createItemMutation.mutateAsync(data);
		} catch (error) {
			console.log(
				"🚀 ~ file: DataTableComponent.tsx:71 ~ handleCreateDialogSubmit ~ error:",
				error
			);
		}

		showToast("success", "Created", "Item created successfully");
		setDialogVisible(false);
	};

	const header = () => {
		return (
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
						layout={layoutValue}
						onChange={(e) => setLayout(e.value)}
					/>
				</div>
			</div>
		);
	};
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
		<div className="card">
			<PrimeDataView
				value={data?.items}
				itemTemplate={itemTemplate}
				layout={layoutValue}
				header={header()}
				footer={footer}
				loading={isLoading}
			/>
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
}
