import { useAuthContext } from "@contexts/AuthContext";
import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
    formData: RegisterRequest;
    setFormData: (value: RegisterRequest) => void;
    setVehicleRegister: (value: boolean) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
    const { register } = useAuthContext();
    const navigate = useNavigate();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        props.setFormData({
            ...props.formData,
            [e.target.name]: e.target.value,
        });
        if (e.target.name === "isDriver") {
            props.setFormData({
                ...props.formData,
                isDriver: e.target.value === "true",
            });
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(props.formData);

        if (props.formData.isDriver) {
            props.setVehicleRegister(true);
        } else {
            await register(props.formData);
            navigate("/dashboard");
        }
    }

    return (
        <section className="home-section rounded-2xl p-8 w-full max-w-xl shadow-md">
            <h1 className="text-2xl font-bold">Registrarse a Uber</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={props.formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-600 rounded-md p-2 bg-transparent"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={props.formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-600 rounded-md p-2 bg-transparent"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" id="email" value={props.formData.email} onChange={handleChange} className="w-full border border-gray-600 bg-transparent rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={props.formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-600 bg-transparent rounded-md p-2"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
                    <input type="text" name="phone" id="phone" value={props.formData.phone} onChange={handleChange} className="w-full border border-gray-600 rounded-md p-2 bg-transparent" />
                </div>
                <div>
                    <label htmlFor="isDriver" className="block text-sm font-medium text-gray-700 mb-1">¿Eres Conductor?</label>
                    <input
                        type="radio"
                        name="isDriver"
                        id="driver"
                        value="true"
                        checked={props.formData.isDriver}
                        onChange={handleChange}
                        className=""
                    />{" "}
                    Sí
                    <input
                        type="radio"
                        name="isDriver"
                        id="passenger"
                        value="false"
                        checked={!props.formData.isDriver}
                        onChange={handleChange}
                        className=""
                    />{" "}
                    No
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
