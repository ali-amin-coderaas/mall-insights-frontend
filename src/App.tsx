import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-purple/theme.css";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/index.css";
import "./assets/css/reset.css";
import AllRoutes from "./routes/Routes.tsx";
import { AuthProvider } from "./shared/context/AuthContext.tsx";
import { ToastProvider } from "./shared/context/ToastContext.tsx";
import "/node_modules/primeflex/primeflex.css";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<PrimeReactProvider>
				<ToastProvider>
					<AuthProvider>
						<BrowserRouter>
							<AllRoutes />
						</BrowserRouter>
					</AuthProvider>
				</ToastProvider>
			</PrimeReactProvider>
		</QueryClientProvider>
	);
}

export default App;
