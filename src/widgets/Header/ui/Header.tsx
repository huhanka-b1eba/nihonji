import { Link } from "react-router";
import { LogOut, Minimize, Search, User } from "lucide-react";
import { useAuth } from "app/providers/auth/AuthProvider.tsx";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";
import cls from "./Header.module.scss";
import { LangSwitcher } from "shared/ui/LangSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const modalRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        open &&
        modalRef.current &&
        !modalRef.current.contains(target) &&
        avatarRef.current &&
        !avatarRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleNavigateToProfile = () => {
    setOpen(false);
    navigate("/profile");
  };

  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  return (
    <div className={cls.header}>
      <div className={cls.headerInner}>
        <div>
          <div className={cls.left}>
            <Link to="/" className={cls.logo}>
              Nihonji
            </Link>
            <div className={cls.links}>
              <Link to="/novelty" className={cls.navLink}>
                {t("header.links.novelty")}
              </Link>
              <Link to="/popular" className={cls.navLink}>
                {t("header.links.popular")}
              </Link>
              <Link to="/catalog" className={cls.navLink}>
                {t("header.links.catalog")}
              </Link>
            </div>
          </div>
        </div>
        <div className={cls.right}>
          <div className={cls.toggles}>
            <Link to="/search" className={cls.search}>
              <Search />
            </Link>
            <LangSwitcher className={cls.toggleLang} />
            <ThemeSwitcher className={cls.toggleTheme} />
          </div>
          {user && (
            <>
              <div
                ref={avatarRef}
                className={cls.userAvatar}
                onClick={() => setOpen((prev) => !prev)}
              >
                <Minimize />
              </div>
              {open && (
                <div ref={modalRef} className={cls.modal}>
                  <button onClick={handleNavigateToProfile}>
                    <User />
                    <span>{t("header.profile")}</span>
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut />
                    <span>{t("header.logout")}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
