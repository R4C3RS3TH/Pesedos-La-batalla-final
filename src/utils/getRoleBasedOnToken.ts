import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	role: string;
}

export function getRoleBasedOnToken() {
	const token = localStorage.getItem("token");
	if (!token) throw new Error("Token not found");
	const decodedToken = jwtDecode<DecodedToken>(token);
	return decodedToken.role;
}
