import { classNames } from "shared/lib/classNames/classNames";
import {
    ArrowDownWideNarrow,
    ArrowUpWideNarrow,
    SlidersHorizontal,
} from "lucide-react";
import cls from "./ListHeader.module.scss";
import { useEffect, useRef, useState } from "react";


type SortDir = "asc" | "desc";

interface ListHeaderProps {
    className?: string;
    title: string;
    sortName: string;
    sortBool: SortDir;
    setSortBool: React.Dispatch<React.SetStateAction<SortDir>>;
}


const ANIME_TYPES = [
    "tv",
    "movie",
    "ova",
    "special",
    "ona",
    "music",
    "cm",
    "pv",
    "tv_special",
];

const ANIME_STATUS = ["airing", "complete", "upcoming"];

interface AnimeFilters {
    type: string[];
    status: string[];
    rating: string[];
    sfw: boolean;

    minScore?: number;
    maxScore?: number;

    genres: number[];
    genresExclude: number[];
    producers: number[];

    letter?: string;
    startDate?: string;
    endDate?: string;

    orderBy: string;
    sort: SortDir;
}


export const ListHeader = ({
                               className,
                               title,
                               sortName,
                               sortBool,
                               setSortBool,
                           }: ListHeaderProps) => {
    const filterModal = useRef<HTMLDivElement | null>(null);
    const [openFilterModal, setOpenFilterModal] = useState(false);

    const [filters, setFilters] = useState<AnimeFilters>({
        type: [],
        status: [],
        rating: [],
        sfw: true,

        genres: [],
        genresExclude: [],
        producers: [],

        orderBy: "score",
        sort: "desc",
    });


    const toggleSort = () => {
        setSortBool((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const toggleArrayValue = (key: keyof AnimeFilters, value: string) => {
        setFilters((prev) => {
            const arr = prev[key] as string[];
            return {
                ...prev,
                [key]: arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value],
            };
        });
    };

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

                    <div
                        className={cls.controlItem}
                        onClick={() => setOpenFilterModal(true)}
                    >
                        <SlidersHorizontal />
                        <span>Фильтр</span>
                    </div>
                </div>
            </div>

            {openFilterModal && (
                <div className={cls.filterOverlay}>
                    <div className={cls.filterModal} ref={filterModal}>
                        <div className={cls.header}>
                            <h2>Фильтры</h2>
                            <button
                                className={cls.closeBtn}
                                onClick={() => setOpenFilterModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className={cls.section}>
                            <span className={cls.sectionTitle}>Type</span>
                            <div className={cls.options}>
                                {ANIME_TYPES.map((type) => (
                                    <label key={type} className={cls.option}>
                                        <input
                                            type="checkbox"
                                            checked={filters.type.includes(type)}
                                            onChange={() => toggleArrayValue("type", type)}
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
                                            type="checkbox"
                                            checked={filters.status.includes(status)}
                                            onChange={() => toggleArrayValue("status", status)}
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
                                        type: [],
                                        status: [],
                                        rating: [],
                                        sfw: true,
                                        genres: [],
                                        genresExclude: [],
                                        producers: [],
                                        orderBy: "score",
                                        sort: "desc",
                                    })
                                }
                            >
                                Сбросить
                            </button>
                            <button className={cls.apply}>Применить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
