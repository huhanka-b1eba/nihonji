import { classNames } from "shared/lib/classNames/classNames";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type GetAnimeArgs } from "entities/anime/api/animeApi.ts";
import cls from "./ListHeader.module.scss";
import { useTranslation } from "react-i18next";

type SortDir = "asc" | "desc";

interface ListHeaderProps {
  className?: string;
  title: string;
  sortName: string;
  sortBool: SortDir;
  setSortBool: React.Dispatch<React.SetStateAction<SortDir>>;
  onApply: (filters: GetAnimeArgs) => void;
  value: GetAnimeArgs;
}

const ANIME_TYPES = ["tv", "movie", "ova", "special", "ona", "music", "cm", "pv", "tv_special"];

const ANIME_STATUS = ["airing", "complete", "upcoming"];

export const ListHeader = ({
  className,
  title,
  sortName,
  sortBool,
  setSortBool,
  onApply,
  value,
}: ListHeaderProps) => {
  const filterModal = useRef<HTMLDivElement | null>(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const { t } = useTranslation();

  const [filters, setFilters] = useState<GetAnimeArgs>({
    type: undefined,
    status: undefined,
    sfw: true,
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!filterModal.current) return;
      if (!filterModal.current.contains(e.target as Node)) {
        setOpenFilterModal(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setFilters(value);
  }, [value]);

  const toggleSort = () => {
    setSortBool((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const setRadio = (key: "type" | "status", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value,
    }));
  };

  const toApply = () => {
    onApply(filters);
    setOpenFilterModal(false);
  };

  return (
    <div className={classNames(cls.ListHeader, {}, [className])}>
      <div className={cls.topRow}>
        <h2 className={cls.title}>{title}</h2>

        <div className={cls.controls}>
          <div className={cls.controlItem} onClick={toggleSort}>
            {sortBool === "desc" ? <ArrowUpWideNarrow /> : <ArrowDownWideNarrow />}
            <span>{sortName}</span>
          </div>

          <div className={cls.controlItem} onClick={() => setOpenFilterModal(true)}>
            <SlidersHorizontal />
            <span>{t("common.filter")}</span>
          </div>
        </div>
      </div>

      {openFilterModal && (
        <div className={cls.filterOverlay}>
          <div className={cls.filterModal} ref={filterModal}>
            <div className={cls.header}>
              <h2>{t("common.filters")}</h2>
              <button className={cls.closeBtn} onClick={() => setOpenFilterModal(false)}>
                ✕
              </button>
            </div>

            <div className={cls.section}>
              <span className={cls.sectionTitle}>Type</span>
              <div className={cls.options}>
                {ANIME_TYPES.map((type) => (
                  <label key={type} className={cls.option}>
                    <input
                      type="radio"
                      name="anime-type"
                      checked={filters.type === type}
                      onChange={() => setRadio("type", type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={cls.section}>
              <span className={cls.sectionTitle}>Status</span>
              <div className={cls.options}>
                {ANIME_STATUS.map((status) => (
                  <label key={status} className={cls.option}>
                    <input
                      type="radio"
                      name="anime-status"
                      checked={filters.status === status}
                      onChange={() => setRadio("status", status)}
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={cls.footer}>
              <button
                className={cls.reset}
                onClick={() =>
                  setFilters({
                    type: undefined,
                    status: undefined,
                    sfw: true,
                    sort: "desc",
                  })
                }
              >
                Сбросить
              </button>

              <button className={cls.apply} onClick={toApply}>
                Применить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
