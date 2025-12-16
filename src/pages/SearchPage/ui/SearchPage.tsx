import React, { useEffect, useRef, useState } from "react";
import type { Anime } from "entities/anime/model/anime.ts";
import { useGetAnimeQuery } from "entities/anime/api/animeApi.ts";
import { classNames } from "shared/lib/classNames/classNames.ts";
import { Loader } from "shared/ui/Loader";
import { AnimeList } from "widgets/AnimeList";
import { SearchInput } from "shared/ui/SearchInput/ui/SearchInput.tsx";
import cls from "./SearchPage.module.scss";
import { useTranslation } from "react-i18next";

interface SearchPageProps {
  className?: string;
}

const PAGE_LIMIT = 24;
const DEBOUNCE_MS = 500;

export const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<Anime[]>([]);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setPage(1);
    setAllItems([]);
  }, [debouncedQuery]);

  const {
    data: rawData,
    error,
    isLoading,
    isFetching,
  } = useGetAnimeQuery(
    debouncedQuery
      ? {
          q: debouncedQuery,
          page,
          limit: PAGE_LIMIT,
          order_by: "popularity",
          sfw: true,
        }
      : { q: "", page: 1, limit: PAGE_LIMIT },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const lastFetchedCount = Array.isArray(rawData) ? rawData.length : 0;
  const hasMore = lastFetchedCount === PAGE_LIMIT;

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isFetching && !isLoading && hasMore && debouncedQuery) {
              setPage((p) => p + 1);
            }
          }
        });
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    io.observe(sentinel);
    observerRef.current = io;

    return () => {
      io.disconnect();
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
  }, [isFetching, isLoading, hasMore, debouncedQuery]);

  useEffect(() => {
    if (!rawData || !Array.isArray(rawData)) return;

    setAllItems((prev) => {
      if (page === 1) {
        return rawData as Anime[];
      }

      const existing = new Set(prev.map((a) => a.mal_id));
      const newOnes = (rawData as Anime[]).filter((a) => !existing.has(a.mal_id));

      return [...prev, ...newOnes];
    });
  }, [rawData, page]);

  const showEmptyPrompt = !debouncedQuery && !query;

  return (
    <div className={classNames(cls.SearchPage, {}, [className])}>
      <div className="container">
        <div className={cls.header}>
          <h1 className={cls.title}>{t("search.title")}</h1>

          <div className={cls.searchRow}>
            <SearchInput
              initialValue={query}
              debounceMs={DEBOUNCE_MS}
              placeholder={t("search.input.placeholder")}
              onChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
              onDebounced={(v) => {
                setDebouncedQuery(v.trim());
                setPage(1);
                setAllItems([]);
              }}
            />
          </div>
        </div>

        {showEmptyPrompt && <div className={cls.hint}>{t("search.hint")}</div>}

        {!showEmptyPrompt && (
          <AnimeList
            items={allItems}
            isLoading={!!debouncedQuery && page === 1 && allItems.length === 0}
            skeletonCount={12}
            emptyText={t("search.noResults")}
          />
        )}

        {isFetching && !isLoading && allItems.length > 0 && (
          <div className={cls.fetching}>
            <Loader />
          </div>
        )}

        <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />

        {error && <div className={cls.error}>{t("search.error")}</div>}
      </div>
    </div>
  );
};
