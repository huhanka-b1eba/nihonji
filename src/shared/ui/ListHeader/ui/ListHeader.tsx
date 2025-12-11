import {classNames} from "../../../lib/classNames/classNames.ts";
import {ArrowDownWideNarrow, ArrowUpWideNarrow, SlidersHorizontal} from "lucide-react";
import cls from "./ListHeader.module.scss";

interface ListHeaderProps {
    className?: string;
    title: string;
    sortName: string;
    sortBool: "asc" | "desc";
    setSortBool: React.Dispatch<React.SetStateAction<"asc" | "desc">>
}


export const ListHeader = ({className, title, sortName, sortBool, setSortBool}: ListHeaderProps) => {
    const toggleSort = () => {
        setSortBool(prev => (prev === "asc" ? "desc" : "asc"));
    };

    return (
        <div className={classNames(cls.ListHeader, {}, [className])}>
            <div className={cls.topRow}>
                <h2 className={cls.title}>{title}</h2>

                <div className={cls.controls}>
                    <div className={cls.controlItem} onClick={toggleSort}>
                        {sortBool === "desc" ? (
                            <ArrowUpWideNarrow />
                        ) : (
                            <ArrowDownWideNarrow />

                        )}
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


