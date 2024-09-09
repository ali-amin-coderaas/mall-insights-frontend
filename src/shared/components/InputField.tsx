import { InputText } from "primereact/inputtext";

// Define props extending only the necessary attributes
interface InputField
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
	id: string;
	label: string;
	value?: string;
}

const InputField: React.FC<InputField> = ({ id, label, value, ...rest }) => {
	return (
		<div className="flex justify-content-center align-items-center gap-2 flex-wrap md:flex-nowrap text-center">
			<label htmlFor={id} className="w-6rem">
				{label}
			</label>
			<InputText id={id} value={value} {...rest} />
		</div>
	);
};

export default InputField;
