import { AuthResponse } from "@interfaces/auth/AuthResponse";
import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import Api from "@services/api";

export async function register(registerRequest: RegisterRequest) {
    const api = await Api.getInstance();
    const response = await api.post<RegisterRequest, AuthResponse>(
        registerRequest,
        {
            url: "/auth/register",
        });
    api.authorization = response.data.token;
    return response;
}
