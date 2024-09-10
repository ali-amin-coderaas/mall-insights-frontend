import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { CreateDialogProps } from "../types/dataTableInterfaces";

// Constrain T to be an object where keys are strings and values can be anything
const DialogComponent = <T extends Record<string, any>>({
	onSubmit,
	visible,
	onHide,
	fields,
	forUpdate,
	initialValue,
	children,
	...rest
}: CreateDialogProps<T>): React.ReactElement => {
	const [formData, setFormData] = useState<T>(initialValue || {} as T);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const val = e.target.value;
		setFormData((prev) => ({ ...prev, [fieldName]: val }));
	};

	const handleDropChange = (
		e: DropdownChangeEvent,
		fieldName: string
	) => {
		const val = e.value;
		setFormData((prev) => ({ ...prev, [fieldName]: val }));
	};

	const handleSubmit = () => {
		onSubmit(formData);
	};

	const dialogFooter = (
		<div className="flex justify-content-end">
			<Button label="Cancel" icon="pi pi-times" onClick={onHide} outlined />
			<Button label="Save" icon="pi pi-check" onClick={handleSubmit} />
		</div>
	);

	useEffect(() => {
		if (forUpdate && initialValue) setFormData(initialValue);
	}, [initialValue, forUpdate]);

	return (
		<Dialog
			visible={visible}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header={forUpdate ? "Edit" : "Create"}
			modal
			className="p-fluid"
			footer={dialogFooter}
			onHide={onHide}
			{...rest}
		>
			{fields?.map((field, index) => {
				if (field.type === "dropdown") {
					return (
						<div key={index} className="field">
							<label htmlFor={field.name}>{field.label}</label>
							<Dropdown
								options={field.options}
								value={formData[field.name]}
								onChange={(e) => handleDropChange(e, field.name)}
								key={index}
								{...field.props}
							/>
						</div>
					);
				}
				if (field.type === "text" || field.type === "email") {
					return (
						<div key={index} className="field">
							<label htmlFor={field.name}>{field.label}</label>
							<InputText
								id={field.name}
								value={formData[field.name] || ""}
								onChange={(e) => handleInputChange(e, field.name)}
								type={field.type || "text"}
							/>
						</div>
					);
				}
			})}
			{children}
		</Dialog>
	);
};

export default DialogComponent;
