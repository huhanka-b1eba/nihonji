import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Footer.module.scss";
import { useTranslation } from "react-i18next";

interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  const { t } = useTranslation();

  return (
    <footer className={classNames(cls.Footer, {}, [className])}>
      <div className="container">
        <div className={cls.footerInner}>
          <div className={cls.about}>
            <h3 className={cls.logo}>Nihonji</h3>
            <p className={cls.desc}>{t("footer.description")}</p>
          </div>

          <nav className={cls.nav}>
            <a href="/">{t("footer.nav.home")}</a>
            <a href="/catalog">{t("footer.nav.catalog")}</a>
          </nav>

          {/* NOTE: вынесла бы в отдельный массив socialsLinks и проходилась бы по нему, проще добавить новую ссылку в будущем */}
          <div className={cls.socials}>
            <a href="#" aria-label="YouTube">
              YouTube
            </a>
            <a href="#" aria-label="Telegram">
              Telegram
            </a>
            <a href="#" aria-label="VK">
              VK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
