import React from "react";
import cls from "./SectionHeader.module.scss";

type Props = {
    title: string;
    onShowAll?: () => void;
    showAllLabel?: string;
};

export const SectionHeader: React.FC<Props> = ({ title, onShowAll, showAllLabel = "Show all" }) => {
    return (
        <div className={cls.header}>
            <h3 className={cls.title}>{title}</h3>
            {onShowAll && <button className={cls.showAll} onClick={onShowAll}>{showAllLabel}</button>}
        </div>
    );
};

export default SectionHeader;
