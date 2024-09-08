import { Toast } from "primereact/toast";
import { createContext, useCallback, useContext, useRef } from "react";

interface ToastContextProps {
	showToast: (
		severity: "success" | "info" | "warn" | "error",
		summary: string,
		detail: string,
		life?: number
	) => void;
	toastRef: React.RefObject<Toast>;
}

// Creating the Toast context with proper types
const ToastContext = createContext<ToastContextProps>({
	showToast: () => {},
	toastRef: { current: null },
});

export const useToast = () => {
	return useContext(ToastContext);
};

export const ToastProvider = ({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element => {
	const toastRef = useRef<Toast | null>(null);

	const showToast = useCallback(
		(
			severity: "success" | "info" | "warn" | "error",
			summary: string,
			detail: string,
			life: number = 3000
		): void => {
			if (toastRef.current) {
				toastRef.current.show({ severity, summary, detail, life });
			}
		},
		[toastRef]
	);

	return (
		<ToastContext.Provider value={{ showToast, toastRef }}>
			<Toast ref={toastRef} position="bottom-right" />
			{children}
		</ToastContext.Provider>
	);
};
