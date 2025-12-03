import cls from "./Section.module.scss";
import {classNames} from "../../../lib/classNames/classNames.ts";
import type {ReactNode} from "react";

interface SectionProps {
    title: string;
    children: ReactNode;
    className?: string;
}

export const Section = ({ title, children, className }: SectionProps) => {
    return (
        <div className={classNames(cls.section, {}, [className])}>
            <div className="container">
                <h2 className={cls.sectionTitle}>{title}</h2>
            </div>
            {children}
        </div>
    );
};
