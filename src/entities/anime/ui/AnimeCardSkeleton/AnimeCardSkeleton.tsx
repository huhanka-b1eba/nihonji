import { Skeleton } from "shared/ui/Skeleton";
import cls from "./AnimeCardSkeleton.module.scss";

export const AnimeCardSkeleton = () => {
  return (
    <div className={cls.card}>
      <Skeleton height={400} width={260} radius={5} />
      <div className={cls.meta}>
        <Skeleton height={14} />
        <Skeleton height={14} width="60%" />
      </div>
    </div>
  );
};
