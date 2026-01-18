import { classNames } from "shared/lib/classNames/classNames";
import cls from "./LangSwitcher.module.scss";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
  const { t } = useTranslation();

  const toggleLanguage = () => {
    // NOTE: ru/en тоже можно спрятать в какой-нибудь union, потому что могут прийти и попросить добавить больше языков
    const currentLang = i18n.language.startsWith("ru") ? "ru" : "en";
    const next = currentLang === "ru" ? "en" : "ru";

    i18n.changeLanguage(next);
  };

  return (
    <button onClick={toggleLanguage} className={classNames(cls.LangSwitcher, {}, [className])}>
      {t("general.lang")}
    </button>
  );
};
