import { Navigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";

/**
 * A public route that only renders the wrapped component if the user is not logged in.
 *
 */
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isLoggedIn } = useAuth();

	return !isLoggedIn ? children : <Navigate to="/" />;
};

export default PublicRoute;
