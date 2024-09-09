export interface Column {
	field: string;
	header: string;
	body: body;
}

export interface Field {
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
	fields?: Field[] | undefined;
	forUpdate?: boolean | undefined;
	initialValue?: {} | undefined;
}

type body = (rowData: any) => JSX.Element;

export interface DataTableProps {
	columns: Column[];
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
		fields: Field[] | undefined;
		forUpdate?: boolean | undefined;
		initialValue?: {} | undefined;
	}) => JSX.Element;
	fields: Field[];
	endpoint: string;
}
