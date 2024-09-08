import { Navigate } from "react-router-dom";
import { useAuth } from "../shared/hooks/useAuth";

/**
 * A protected route that only renders the wrapped component if the user is logged in.
 *
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isLoggedIn } = useAuth();

	return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
