import React from "react";
import { AnimeCard } from "entities/anime";
import type { Anime } from "entities/anime/model/anime";
import { Link } from "react-router";
import cls from "./AnimeList.module.scss";
import { AnimeCardSkeleton } from "entities/anime/ui/AnimeCardSkeleton/AnimeCardSkeleton";

type Props = {
  items?: Anime[];
  isLoading?: boolean;
  skeletonCount?: number;
  emptyText?: string;
};

export const AnimeList: React.FC<Props> = ({
  items = [],
  isLoading = false,
  skeletonCount = 12,
  emptyText = "Нет данных.",
}) => {
  if (isLoading) {
    return (
      <div className={cls.wrapper}>
        <div className={cls.grid}>
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) {
    return <div className={cls.empty}>{emptyText}</div>;
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.grid}>
        {items.map((item) => (
          <Link key={String(item.mal_id ?? item.title)} to={`/anime/${item.mal_id}`}>
            <AnimeCard anime={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};
