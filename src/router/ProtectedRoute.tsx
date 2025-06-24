import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "src/contexts/AuthContext";

export function ProtectedRoute() {
	const authContext = useAuthContext();
	const location = useLocation();

	if (authContext.isLoading) return null;

	if (!authContext.session)
		return <Navigate to={`/auth/login?from=${location.pathname}`} replace />;

	return <Outlet />;
}
