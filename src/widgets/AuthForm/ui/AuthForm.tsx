import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "shared/ui/Input";
import cls from "./AuthForm.module.scss";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) return setError(t("authForm.errors.emailRequired"));
    if (password.length < 8) return setError(t("authForm.errors.passwordLength"));
    if (mode === "register" && password !== confirm)
      return setError(t("authForm.errors.passwordMismatch"));

    setLoading(true);
    try {
      await onSubmit({ email, password, confirm });
    } catch (err: any) {
      const msg = String(err?.message ?? err);
      if (msg.includes("email-already")) setError(t("authForm.errors.emailExists"));
      else if (msg.includes("invalid-email")) setError(t("authForm.errors.invalidEmail"));
      else setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cls.form} onSubmit={handleSubmit}>
      <Input
        label={t("authForm.fields.email.label")}
        type="email"
        value={email}
        placeholder={t("authForm.fields.email.placeholder")}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className={cls.field}>
        <label>{t("authForm.fields.password.label")}</label>
        <div className={cls.passwordRow}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder={t("authForm.fields.password.placeholder")}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className={cls.showBtn} onClick={() => setShowPassword((s) => !s)}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </div>

      {mode === "register" && (
        <div className={cls.field}>
          <label>{t("authForm.fields.confirm.label")}</label>
          <input
            type="password"
            value={confirm}
            placeholder={t("authForm.fields.confirm.placeholder")}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      )}

      {error && <div className={cls.error}>{error}</div>}

      <button className={cls.submit} type="submit" disabled={loading}>
        {loading
          ? mode === "register"
            ? t("authForm.submit.loadingRegister")
            : t("authForm.submit.loadingLogin")
          : mode === "register"
            ? t("authForm.submit.register")
            : t("authForm.submit.login")}
      </button>

      {switchLink && (
        <button type="button" className={cls.loginLink} onClick={() => navigate(switchLink.to)}>
          {switchLink.text}
        </button>
      )}
    </form>
  );
};
