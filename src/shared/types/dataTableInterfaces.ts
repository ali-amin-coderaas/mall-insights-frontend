export interface ColumnProps {
	field: string;
	header: string;
	body: body;
}

export interface FieldProps {
	name: string;
	label: string;
	type: string;
	value?: string;
	options?: { label: string; value: string }[];
	props?: any;
}

export interface CreateDialogProps {
	onSubmit: any;
	visible: any;
	onHide: any;
	fields?: FieldProps[] | undefined;
	forUpdate?: boolean | undefined;
	initialValue?: {} | undefined;
}

type body = (rowData: any) => JSX.Element;

export interface DataTableProps {
	columns: ColumnProps[];
	createDialog: ({
		onSubmit,
		visible,
		onHide,
		fields,
		forUpdate,
		initialValue,
	}: {
		onSubmit: any;
		visible: any;
		onHide: any;
		fields: FieldProps[] | undefined;
		forUpdate?: boolean | undefined;
		initialValue?: {} | undefined;
	}) => JSX.Element;
	fields: FieldProps[];
	endpoint: string;
}
