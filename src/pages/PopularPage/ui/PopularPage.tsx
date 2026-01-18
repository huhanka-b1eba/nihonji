import React, { useEffect, useRef, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { AnimeList } from "widgets/AnimeList";
import { ListHeader } from "shared/ui/ListHeader";
import { type GetAnimeArgs, useGetAnimeQuery } from "entities/anime/api/animeApi";
import type { Anime } from "entities/anime/model/anime";
import cls from "./PopularPage.module.scss";
import { useTranslation } from "react-i18next";

interface PopularPageProps {
  className?: string;
}

// TODO: кажется, что в NoveltyPage идентичная, выносим в shared
const isKids = (a: Anime) => {
  const raw = (a?.rating ?? "").toString().trim().toUpperCase();
  if (!raw) return false;
  if (/^G(\s|-|$)/.test(raw)) return true;
  if (/^PG(\s|-)/.test(raw) && !/^PG-13/.test(raw)) return true;
  return false;
};

// TODO: у тебя такие 4 штуки, скорее всего везде в апи всегда одно значение будет, поэтому смело на уровень shared
const PAGE_LIMIT = 24;

export const PopularPage: React.FC<PopularPageProps> = ({ className }) => {
  const [page, setPage] = useState(1);
  const [allItems, setAllItems] = useState<Anime[]>([]);
  const [sortBool, setSortBool] = useState<"asc" | "desc">("asc");
  const { t } = useTranslation();

  // NOTE: работа с фильтрами везде тоже выглядит одинаковой, давай подумаем как можно сделать абстрактный хук, который будет применен везде ?
  const [filters, setFilters] = useState<GetAnimeArgs>({
    type: undefined,
    status: undefined,
    sfw: true,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const {
    data: rawData,
    error,
    isLoading,
    isFetching,
  } = useGetAnimeQuery(
    {
      ...filters,
      order_by: "popularity",
      sort: sortBool,
      page,
      limit: PAGE_LIMIT,
    },
    { refetchOnMountOrArgChange: false }
  );

  useEffect(() => {
    setPage(1);
    setAllItems([]);
  }, [filters, sortBool]);

  useEffect(() => {
    if (!rawData || !Array.isArray(rawData)) return;

    setAllItems((prev) => {
      const pageItems = (rawData as Anime[]).filter((a) => !isKids(a));

      if (page === 1) return pageItems;

      const ids = new Set(prev.map((a) => String(a.mal_id ?? a.title)));
      const toAdd = pageItems.filter((a) => !ids.has(String(a.mal_id ?? a.title)));

      return prev.concat(toAdd);
    });
  }, [rawData, page]);

  const hasMore = Array.isArray(rawData) && rawData.length === PAGE_LIMIT;

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && !isLoading && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px" }
    );

    io.observe(sentinel);
    observerRef.current = io;

    return () => io.disconnect();
  }, [isFetching, isLoading, hasMore]);

  return (
    <div className={classNames(cls.Popular, {}, [className])}>
      <div className="container">
        <ListHeader
          title={t("popular.title")}
          sortName={sortBool === "desc" ? t("popular.sort.most") : t("popular.sort.least")}
          sortBool={sortBool}
          setSortBool={setSortBool}
          onApply={setFilters}
          value={filters}
        />

        {error && allItems.length === 0 && <div className={cls.error}>{t("popular.error")}</div>}

        <AnimeList
          items={allItems}
          isLoading={isLoading}
          skeletonCount={12}
          emptyText={t("catalog.empty")}
        />

        <div ref={sentinelRef} style={{ height: 1 }} />

        {!isLoading && !hasMore && allItems.length > 0 && (
          <div className={cls.endMessage}>{t("popular.end")}</div>
        )}
      </div>
    </div>
  );
};
