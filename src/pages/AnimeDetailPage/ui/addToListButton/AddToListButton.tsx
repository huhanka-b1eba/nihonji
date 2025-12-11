import React, { useEffect, useState } from "react";
import cls from "./AddToListButton.module.scss";
import { ChevronDown } from "lucide-react";

type Props = {
    animeId: string;
};

type ListStatus = "none" | "watched" | "planned";

export const AddToListButton: React.FC<Props> = ({ animeId }) => {
    const storageKey = `myList:${animeId}`;
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<ListStatus>("none");

    useEffect(() => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved === "watched" || saved === "planned") setStatus(saved as ListStatus);
            else setStatus("none");
        } catch {
            setStatus("none");
        }
    }, [storageKey]);

    const apply = (s: ListStatus) => {
        try {
            if (s === "none") localStorage.removeItem(storageKey);
            else localStorage.setItem(storageKey, s);
        } catch {
        } finally {
            setStatus(s);
            setOpen(false);
        }
    };

    return (
        <div className={cls.wrapper}>
            <button
                className={cls.btn}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
                type="button"
            >
                {status === "watched" ? "Watched" : status === "planned" ? "Planned" : "Add to List"}
                <span className={cls.arrow}><ChevronDown /></span>
            </button>

            {open && (
                <div className={cls.dropdown} role="menu">
                    <button className={cls.item} onClick={() => apply("watched")} role="menuitem">Отметить как просмотрено</button>
                    <button className={cls.item} onClick={() => apply("planned")} role="menuitem">Добавить в планы</button>
                    <button className={cls.item} onClick={() => apply("none")} role="menuitem">Удалить из списка</button>
                </div>
            )}
        </div>
    );
};

export default AddToListButton;
