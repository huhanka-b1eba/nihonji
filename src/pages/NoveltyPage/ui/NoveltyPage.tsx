import React, { useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AnimeList } from "widgets/AnimeList";
import { ListHeader } from "shared/ui/ListHeader";
import { type GetAnimeArgs, useGetAnimeQuery } from "entities/anime/api/animeApi";
import { Loader } from "shared/ui/Loader";
import type { Anime } from "entities/anime/model/anime";
import cls from "./NoveltyPage.module.scss";
import {useTranslation} from "react-i18next";

interface NoveltyPageProps {
  className?: string;
}

const PAGE_LIMIT = 24;

export const NoveltyPage: React.FC<NoveltyPageProps> = ({ className }) => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<Anime[]>([]);
  const [sortBool, setSortBool] = useState<"asc" | "desc">("asc");
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { t } = useTranslation();
  const [filters, setFilters] = useState<GetAnimeArgs>({
    type: undefined,
    status: undefined,
    sfw: true,
    sort: "desc",
  });

  const {
    data: rawData,
    error,
    isLoading,
    isFetching,
  } = useGetAnimeQuery(
    {
      ...filters,
      order_by: "popularity",
      status: "airing",
      sort: sortBool,
      page,
      limit: PAGE_LIMIT,
    },
    { refetchOnMountOrArgChange: false }
  );

  useEffect(() => {
    setPage(1);
    setAllItems([]);
  }, [sortBool, filters]);

  useEffect(() => {
    if (!rawData || !Array.isArray(rawData)) {
      return;
    }

    const isKids = (a: any) => {
      const raw = (a?.rating ?? "").toString().trim();
      if (!raw) return false;

      const r = raw.toUpperCase();

      if (/^G(\s|-|$)/.test(r)) return true;

      if (/^PG(\s|-)/.test(r) && !/^PG-13/.test(r)) return true;

      return false;
    };

    setAllItems((prev) => {
      const pageItems = (rawData as Anime[]).filter((a) => !isKids(a));

      if (page === 1) return pageItems;

      const existingIds = new Set(prev.map((a) => String(a.mal_id ?? a.title)));
      const toAdd = pageItems.filter((a) => !existingIds.has(String(a.mal_id ?? a.title)));
      return prev.concat(toAdd);
    });
  }, [rawData, page]);

  console.log(rawData);

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
            if (!isFetching && !isLoading && hasMore) {
              setPage((p) => p + 1);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    io.observe(sentinel);
    observerRef.current = io;

    return () => {
      io.disconnect();
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = null;
    };
  }, [isFetching, isLoading, hasMore]);

  const handleLoadMore = () => {
    if (!isFetching && hasMore) setPage((p) => p + 1);
  };

  return (
    <div className={classNames(cls.NoveltyPage, {}, [className])}>
      <div className="container">
        <ListHeader
            title={t("novelty.title")}
            sortName={
              sortBool === "asc"
                  ? t("novelty.sort.oldFirst")
                  : t("novelty.sort.newFirst")
            }
            sortBool={sortBool}
            setSortBool={setSortBool}
            onApply={setFilters}
            value={filters}
        />



        {error && allItems.length === 0 && (
            <div className={cls.error}>{t("novelty.error")}</div>
        )}


        {allItems.length > 0 && <AnimeList items={allItems} />}

        <AnimeList
            items={allItems}
            isLoading={isLoading}
            skeletonCount={12}
            emptyText={t("catalog.empty")}
        />



        <div ref={sentinelRef} style={{ height: 1, width: "100%" }} />

        {!isLoading && allItems.length > 0 && hasMore && (
          <div className={cls.loadMoreWrap}>
            <button
                className={cls.loadMoreBtn}
                onClick={handleLoadMore}
                disabled={isFetching}
            >
              {isFetching
                  ? t("novelty.loading.fetching")
                  : t("novelty.loadMore")}
            </button>
          </div>
        )}

        {!isLoading && !hasMore && allItems.length > 0 && (
            <div className={cls.endMessage}>
              {t("novelty.end")}
            </div>
        )}
      </div>
    </div>
  );
};
