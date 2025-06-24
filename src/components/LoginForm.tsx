import { useAuthContext } from "@contexts/AuthContext";
import { LoginRequest } from "@interfaces/auth/LoginRequest";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: ""
    });
    const { login } = useAuthContext();
    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            await login(formData);
            navigate("/dashboard");
            setSuccessMessage("Sesión iniciada con éxito");
        } catch (error) {
            setError(`Error al iniciar sesión: ${(error as Error).message}`);
        }
    }


    return (
        <section className="login-section bg-secondary rounded-2xl p-8 w-fullshadow-md flex flex-col items-center px-20">
            <h1 className="title mb-10">Ingresar a Uber</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-8" >
                <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-600 rounded-md p-2 bg-transparent" />
                </div>
                <div className="w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-600 rounded-md p-2 bg-transparent"
                    />
                </div>
                <button id="loginSubmit" className="bg-primary text-white w-full font-bold mx-6 py-2 px-4 rounded-full cursor-pointer mt-5" type="submit">
                    Iniciar Sesión
                </button>
            </form>

            <div className="flex items-center justify-center gap-2 my-10">
                <div className="flex-grow h-[1px] bg-gray-500"></div>
                <span className="text-gray-500">o</span>
                <div className="flex-grow h-[1px] bg-gray-500"></div>
            </div>

            <button id="LoginGoogle" className="bg-white text-black w-full flex justify-center items-center gap-4 mx-6 py-2 px-4 rounded-lg cursor-pointer shadow-sm" onClick={() => { alert("WAZAAAA ALERT :bbbb") }}>
                Ingresar con Google
            </button>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {successMessage && <div style={{ color: "blue" }}>{successMessage}</div>}
        </section>
    );
}