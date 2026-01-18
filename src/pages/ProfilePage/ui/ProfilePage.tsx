import React, { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useAuth } from "app/providers/auth/AuthProvider";
import { auth } from "shared/lib/firebase/firebase";
import { sendEmailVerification } from "firebase/auth";
import { Mail, CheckCircle, XCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cls from "./ProfilePage.module.scss";
import {useTranslation} from "react-i18next";

interface ProfilePageProps {
  className?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ className }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const capitalizeFirst = (value: string) =>
      value.charAt(0).toUpperCase() + value.slice(1);

  const handleResend = async () => {
    // NOTE: setMessage ничего не возвращает, return лучше отдельной строкой ниже сделать, иначе путаешь ts
    if (!auth.currentUser) {
      setMessage(t("profile.messages.userNotFound"));
      return;
    }

    setMessage(null);
    setLoadingResend(true);

    try {
      await sendEmailVerification(auth.currentUser);
      if (auth.currentUser.emailVerified)
        setMessage(t("profile.messages.emailVerified"));
      else
        setMessage(t("profile.messages.emailNotVerified"));
    } catch (err: any) {
      setMessage(String(err?.message ?? t("profile.messages.sendError")));
    } finally {
      setLoadingResend(false);
    }
  };

  const handleCheckNow = async () => {
    // NOTE: setMessage ничего не возвращает, return лучше отдельной строкой ниже сделать, иначе путаешь ts
    if (!auth.currentUser) {
      setMessage(t("profile.messages.userNotFound"));
      return;
    }
    
    setMessage(null);
    setLoadingCheck(true);
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified)
        setMessage(t("profile.messages.emailVerified"));
      else
        setMessage(t("profile.messages.emailNotVerified"));
    } catch (err: any) {
      setMessage(String(err?.message ?? t("profile.messages.checkError")));
    } finally {
      setLoadingCheck(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err: any) {
      setMessage(String(err?.message ?? t("profile.messages.logoutError")));
    }
  };

  if (!user) {
    return (
      <div className={classNames(cls.ProfilePage, {}, [className])}>
        <header className={cls.hero}>
          <div className={cls.heroBg} />
          <div className={cls.heroPanel}>
            <div className={cls.container}>
              <div className={cls.centerCard}>
                <div className={cls.empty}>
                  {t("profile.notAuthorized")}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }

  const rawName =
      user.displayName ?? user.email?.split("@")[0] ?? "user";

  const displayName = capitalizeFirst(rawName);

  return (
    <div className={classNames(cls.ProfilePage, {}, [className])}>
      <header className={cls.hero}>
        <div className={cls.heroBg} />
        <div className={cls.heroPanel}>
          <div className={cls.container}>
            <div className={cls.profileCard}>
              <div className={cls.leftBlock}>
                <div className={cls.info}>
                  <h1 className={cls.title}>{displayName}</h1>

                  <div className={cls.emailRow}>
                    <div className={cls.email}>
                      <Mail className={cls.icon} />
                      <span className={cls.email}>{user.email}</span>
                    </div>

                    {user.emailVerified ? (
                      <span className={cls.verified}>
                        <CheckCircle className={cls.verifiedIcon} /> {t("profile.status.verified")}
                      </span>
                    ) : (
                      <span className={cls.notVerified}>
                        <XCircle className={cls.notVerifiedIcon} /> {t("profile.status.notVerified")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={cls.actions}>
                {!user.emailVerified && (
                  <div className={cls.verifRow}>
                    <button
                      className={cls.ghostBtn}
                      onClick={handleResend}
                      disabled={loadingResend}
                    >
                      {loadingResend ? t("profile.verification.sending") : t("profile.verification.send")}
                    </button>

                    <button
                      className={cls.ghostBtn}
                      onClick={handleCheckNow}
                      disabled={loadingCheck}
                    >
                      {loadingCheck ? t("profile.verification.checking") : t("profile.verification.check")}
                    </button>
                  </div>
                )}

                <button className={cls.logoutBtn} onClick={handleLogout}>
                  <LogOut className={cls.btnIcon} /> {t("profile.logout")}
                </button>

                {message && <div className={cls.message}>{message}</div>}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default ProfilePage;
