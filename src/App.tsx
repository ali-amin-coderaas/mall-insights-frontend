import "primeicons/primeicons.css";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-purple/theme.css";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/reset.css";
import "./assets/css/index.css";
import AllRoutes from "./routes/Routes.tsx";
import { AuthProvider } from "./shared/context/AuthContext.tsx";
import "/node_modules/primeflex/primeflex.css";

function App() {
	return (
		<PrimeReactProvider>
			<AuthProvider>
				<BrowserRouter>
					<AllRoutes />
				</BrowserRouter>
			</AuthProvider>
		</PrimeReactProvider>
	);
}

export default App;
