import React from "react";
import { useAuth } from "app/providers/auth/AuthProvider";
import { AuthForm } from "widgets/AuthForm";
import { useNavigate } from "react-router-dom";
import cls from "./RegistrationPage.module.scss";
import { useTranslation } from "react-i18next";

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleRegister = async ({ email, password }: { email: string; password: string }) => {
    await register(email, password);
    navigate("/");
  };

  return (
    <div className={cls.page}>
      <h1 className={cls.pageTitle}>{t("auth.register.title")}</h1>

      <AuthForm
        mode="register"
        onSubmit={handleRegister}
        submitLabel={t("auth.register.submit")}
        switchLink={{
          to: "/login",
          text: t("auth.register.switch"),
        }}
      />
    </div>
  );
};

export default RegisterPage;
