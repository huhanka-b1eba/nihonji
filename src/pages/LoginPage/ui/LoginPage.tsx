import React from "react";
import cls from "./LoginPage.module.scss";
import { useAuth } from "app/providers/auth/AuthProvider";
import {AuthForm} from "widgets/AuthForm";
import {useNavigate} from "react-router-dom";

export const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }: { email: string; password: string }) => {
        await login(email, password);
        navigate('/')
    };

    return (
        <div className={cls.page}>
            <h1 className={cls.pageTitle}>Вход</h1>

            <AuthForm
                mode="login"
                onSubmit={handleLogin}
                submitLabel="Войти"
                switchLink={{ to: "/registration", text: "Нет аккаунта? Зарегистрироваться" }}
            />
        </div>
    );
};

export default LoginPage;
