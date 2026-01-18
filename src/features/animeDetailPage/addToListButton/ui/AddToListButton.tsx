// NOTE: путь до этой компоненты должен быть features/anime/ui/AddToListButton/AddToListButton.tsx+index.ts+AddToListButton.module.scss
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import cls from "./AddToListButton.module.scss";

type Props = {
  animeId: string;
};

type ListStatus = "none" | "watched" | "planned";

const getStatus = (storageKey: string): ListStatus => {
  try {
    const saved = localStorage.getItem(storageKey);
    return (saved === 'watched' || saved === 'planned')
      ? saved as ListStatus
      : 'none';
  } catch (error) {
    return 'none';
  }
};

export const AddToListButton: React.FC<Props> = ({ animeId }) => {
  const storageKey = `myList:${animeId}`;

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<ListStatus>("none");

  useEffect(() => {
    // NOTE: в отдельную утилю можно вынести
    setStatus(getStatus(storageKey))
    // try {
    //   const saved = localStorage.getItem(storageKey);
    //   if (saved === "watched" || saved === "planned") setStatus(saved);
    //   else setStatus("none");
    // } catch {
    //   setStatus("none");
    // }
  }, [storageKey]);

  // TODO: буквы не жалеем
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
        type="button"
        style={{
          background:
            status === "watched" ? "#1ab003" : status === "planned" ? "#ff9f43" : "#2ea3ff",
        }}
      >
        <span className={cls.label}>
          {status === "watched" ? "Completed" : status === "planned" ? "Planned" : "Add to List"}
        </span>

        <span className={cls.arrowSection}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>

      {/* TODO: Вынести каждую из кнопок в отдельные фичи и подключать там, где нужно. Возможно, в таком случае AddToListButton должен быть не Button, а каким-нибудь CardActions, если здесь несколько фича-действий объединяется просто  */}
      {open && (
        <div className={cls.dropdown} role="menu">
          <button className={cls.item} onClick={() => apply("watched")} role="menuitem">
            Отметить как просмотрено
          </button>
          <button className={cls.item} onClick={() => apply("planned")} role="menuitem">
            Добавить в планы
          </button>
          <button className={cls.item} onClick={() => apply("none")} role="menuitem">
            Удалить из списка
          </button>
        </div>
      )}
    </div>
  );
};

export default AddToListButton;
