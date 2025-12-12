import React from "react";
import cls from "./RegistrationPage.module.scss";
import { useAuth } from "app/providers/auth/AuthProvider";
import {AuthForm} from "widgets/AuthForm";
import {useNavigate} from "react-router-dom";

export const RegisterPage: React.FC = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async ({ email, password }: { email: string; password: string }) => {
        await register(email, password);
        navigate('/')
    };

    return (
        <div className={cls.page}>
            <h1 className={cls.pageTitle}>Регистрация</h1>

            <AuthForm
                mode="register"
                onSubmit={handleRegister}
                submitLabel="Зарегистрироваться"
                switchLink={{ to: "/login", text: "Уже есть аккаунт?" }}
            />
        </div>
    );
};

export default RegisterPage;
