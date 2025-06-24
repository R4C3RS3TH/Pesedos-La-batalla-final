import { AuthResponse } from "@interfaces/auth/AuthResponse";
import { LoginRequest } from "@interfaces/auth/LoginRequest";
import Api from "@services/api";

export async function login(loginRequest: LoginRequest) {
    const api = await Api.getInstance();
    const response = await api.post<LoginRequest, AuthResponse>(
        loginRequest,
        {
            url: "/auth/login",
        });
    api.authorization = response.data.token;
    return response;
}