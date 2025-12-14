import React, { useEffect, useRef, useState } from "react";
import cls from "./CatalogPage.module.scss";
import type { Anime } from "entities/anime/model/anime.ts";
import {type GetAnimeArgs, useGetAnimeQuery} from "entities/anime/api/animeApi.ts";
import { classNames } from "shared/lib/classNames/classNames.ts";
import { Loader } from "shared/ui/Loader";
import { AnimeList } from "widgets/AnimeList";
import { ListHeader } from "shared/ui/ListHeader";
import {SearchInput} from "shared/ui/SearchInput/ui/SearchInput.tsx";

const PAGE_LIMIT = 24;

const SORT_OPTIONS = [
    { value: "popularity", label: "По популярности" },
    { value: "score", label: "По рейтингу" },
    { value: "rank", label: "По месту в топе" },
    { value: "favorites", label: "По добавлениям в избранное" },
];

const CatalogPage: React.FC = () => {
    const [page, setPage] = useState(1);
    const [allItems, setAllItems] = useState<Anime[]>([]);
    const [sort, setSort] = useState();
    const [sortBool, setSortBool] = useState<"asc" | "desc">("asc");
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const [filters, setFilters] = useState<GetAnimeArgs>({
        type: undefined,
        status: undefined,
        sfw: true,
    });

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const {
        data: rawData,
        isLoading,
        isFetching,
        error,
    } = useGetAnimeQuery(
        {
            ...filters,
            q: debouncedQuery || undefined,
            order_by: "popularity",
            sort: sortBool,
            page,
            limit: PAGE_LIMIT,
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        setPage(1);
        setAllItems([]);
    }, [sort, sortBool, debouncedQuery, filters]);

    useEffect(() => {
        if (!rawData || !Array.isArray(rawData)) return;

        setAllItems((prev) => {
            if (page === 1) return (rawData as Anime[]);

            const existing = new Set(prev.map((a) => a.mal_id));
            const newOnes = (rawData as Anime[]).filter((a) => !existing.has(a.mal_id));
            return [...prev, ...newOnes];
        });
    }, [rawData, page]);

    const lastFetchedCount = Array.isArray(rawData) ? rawData.length : 0;
    const hasMore = lastFetchedCount === PAGE_LIMIT;

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting && !isFetching && !isLoading && hasMore) {
                        setPage((p) => p + 1);
                    }
                });
            },
            { rootMargin: "200px", threshold: 0.1 }
        );

        io.observe(sentinel);
        observerRef.current = io;

        return () => io.disconnect();
    }, [isFetching, isLoading, hasMore]);

    return (
        <div className={classNames(cls.CatalogPage, {}, [])}>
            <div className="container">
                <ListHeader
                    title="Каталог аниме"
                    sortName={SORT_OPTIONS.find((s) => s.value === sort)?.label ?? "Сортировать"}
                    sortBool={sortBool}
                    setSortBool={setSortBool}
                    onApply={setFilters}
                    value={filters}
                />

                <div className={cls.filters}>
                    <SearchInput
                        initialValue={query}
                        debounceMs={600}
                        placeholder="Поиск аниме..."
                        onChange={(v) => setQuery(v)}
                        onDebounced={(v) => {
                            setDebouncedQuery(v);
                            setPage(1);
                            setAllItems([]);
                        }}
                    />
                </div>

                {error && <div className={cls.error}>Ошибка загрузки каталога</div>}

                {allItems.length > 0 && <AnimeList items={allItems} />}

                {(isFetching || isLoading) && (
                    <div className={cls.center}>
                        <Loader />
                    </div>
                )}

                <div ref={sentinelRef} style={{ height: 1 }} />

                {!isLoading && !hasMore && (
                    <div className={cls.endMessage}>Показаны все результаты</div>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
