import {classNames} from "../../../lib/classNames/classNames.ts";
import {ArrowDownWideNarrow, SlidersHorizontal} from "lucide-react";
import cls from "./ListHeader.module.scss";

interface ListHeaderProps {
    className?: string;
    title: string;
    sortName: string;
}


export const ListHeader = ({className, title, sortName}: ListHeaderProps) => {
    return (
        <div className={classNames(cls.ListHeader, {}, [className])}>
            <div className={cls.topRow}>
                <h2 className={cls.title}>{title}</h2>

                <div className={cls.controls}>
                    <div className={cls.controlItem}>
                        <ArrowDownWideNarrow />
                        <span>{sortName}</span>
                    </div>
                    <div className={cls.controlItem}>
                        <SlidersHorizontal />
                        <span>Фильтр</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

