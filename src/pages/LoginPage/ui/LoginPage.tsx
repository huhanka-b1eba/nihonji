import React from "react";
import { useAuth } from "app/providers/auth/AuthProvider";
import { AuthForm } from "widgets/AuthForm";
import { useNavigate } from "react-router-dom";
import cls from "./LoginPage.module.scss";
import { useTranslation } from "react-i18next";

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
    navigate("/");
  };

  return (
    <div className={cls.page}>
      <h1 className={cls.pageTitle}>{t("auth.login.title")}</h1>

      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        submitLabel={t("auth.login.submit")}
        switchLink={{
          to: "/registration",
          text: t("auth.login.switch"),
        }}
      />
    </div>
  );
};

export default LoginPage;
