import { createBrowserRouter } from "react-router-dom";
import App from "src/App";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import DashboardPage from "@pages/DashboardPage";
import NotFoundPage from "@pages/NotFoundPage";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "auth",
				children: [
					{
						path: "login",
						element: <LoginPage />
					},
					{
						path: "register",
						element: <RegisterPage />
					}],
			},
			{
				path: "/",
				element: <ProtectedRoute />,
				children: [
					{
						path: "dashboard",
						element: <DashboardPage />
					},],
			},
			{
				path: "*",
				element: <NotFoundPage />
			},
		],
	},
]);
