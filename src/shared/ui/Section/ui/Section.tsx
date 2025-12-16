import type { ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Section.module.scss";

interface SectionProps {
  title: string;
  children?: ReactNode;
  className?: string;
}

export const Section = ({ title, children, className }: SectionProps) => (
  <div className={classNames(cls.section, {}, [className])}>
    <div className="container">
      <h2 className={cls.sectionTitle}>{title}</h2>
    </div>
    {children}
  </div>
);
