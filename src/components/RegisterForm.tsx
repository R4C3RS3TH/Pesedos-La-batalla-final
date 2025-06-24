import { useAuthContext } from "@contexts/AuthContext";
import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

/*
interface RegisterFormProps {
    formData: RegisterRequest;
    setFormData: (value: RegisterRequest) => void;
    setVehicleRegister: (value: boolean) => void;
}
*/

export default function RegisterForm() {//props: RegisterFormProps) {
    const { register } = useAuthContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterRequest>({
        email: "",
        password: "",
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(formData);
        await register(formData);
        navigate("/dashboard");
    }

    return (
        <section className="home-section rounded-2xl p-8 w-full max-w-xl shadow-md">
            <h1 className="text-2xl font-bold">Registrarse a Uber</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-600 bg-transparent rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-600 bg-transparent rounded-md p-2"
                    />
                </div>
                <button
                    id="registerSubmit"
                    className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
                    type="submit"
                >
                    Registrarse
                </button>
            </form>
        </section>
    );
}
