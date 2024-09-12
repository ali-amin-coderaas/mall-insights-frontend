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

export interface CreateDialogProps<T> {
	onSubmit: (data: T) => void;
	visible: boolean;
	isLoading: boolean;
	onHide: () => void;
	fields?: Field[] | undefined;
	forUpdate?: boolean | undefined;
	initialValue?: T | undefined;
	children?: React.ReactNode;
}

type body = (rowData: any) => JSX.Element;
