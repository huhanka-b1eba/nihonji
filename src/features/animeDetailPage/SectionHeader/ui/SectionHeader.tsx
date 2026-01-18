import cls from "./SectionHeader.module.scss";
import { useTranslation } from "react-i18next";

type Props = {
  title: string;
  onShowAll?: () => void;
  showAllLabel?: string;
};

export const SectionHeader = ({ title, onShowAll, showAllLabel }: Props) => {
  const { t } = useTranslation();

  return (
    <div className={cls.header}>
      <h3>{title}</h3>
      {/* TODO: тоже можно в фичу ShowAllButton */}
      {onShowAll && <button onClick={onShowAll}>{showAllLabel ?? t("common.showAll")}</button>}
    </div>
  );
};
