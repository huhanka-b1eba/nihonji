import React, { useState } from "react";
import cls from "./AuthForm.module.scss";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {Input} from "shared/ui/Input";

interface AuthFormProps {
    mode?: "register" | "login";
    onSubmit: (values: { email: string; password: string; confirm?: string }) => Promise<void> | void;
    submitLabel?: string;
    switchLink?: { to: string; text: string };
}

export const AuthForm: React.FC<AuthFormProps> = ({
                                                      mode = "register",
                                                      onSubmit,
                                                      submitLabel,
                                                      switchLink,
                                                  }) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email) return setError("Введите email");
        if (password.length < 8) return setError("Пароль должен содержать минимум 8 символов");
        if (mode === "register" && password !== confirm) return setError("Пароли не совпадают");

        setLoading(true);
        try {
            await onSubmit({ email, password, confirm });
        } catch (err: any) {
            const msg = String(err?.message ?? err);
            if (msg.includes("email-already")) setError("Этот email уже зарегистрирован");
            else if (msg.includes("invalid-email")) setError("Неверный email");
            else setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={cls.form} onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    value={email}
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className={cls.field}>
                    <label>Пароль</label>
                    <div className={cls.passwordRow}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Минимум 8 символов"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={cls.showBtn}
                            onClick={() => setShowPassword((s) => !s)}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>
                </div>

                {mode === "register" && (
                    <div className={cls.field}>
                        <label>Повторите пароль</label>
                        <input
                            type="password"
                            value={confirm}
                            placeholder="Введите пароль ещё раз"
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                    </div>
                )}

                {error && <div className={cls.error}>{error}</div>}

                <button className={cls.submit} type="submit" disabled={loading}>
                    {loading ? (mode === "register" ? "Создаём..." : "Вход...") : submitLabel ?? (mode === "register" ? "Зарегистрироваться" : "Войти")}
                </button>

                {switchLink && (
                    <button type="button" className={cls.loginLink} onClick={() => navigate(switchLink.to)}>
                        {switchLink.text}
                    </button>
            )}
        </form>
    );
};

export default AuthForm;
