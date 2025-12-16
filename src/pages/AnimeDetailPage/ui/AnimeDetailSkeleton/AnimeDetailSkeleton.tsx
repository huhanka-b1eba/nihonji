import { classNames } from "shared/lib/classNames/classNames";
import { Skeleton } from "shared/ui/Skeleton";
import cls from "./AnimeDetailSkeleton.module.scss";

interface Props {
  className?: string;
}

export const AnimeDetailSkeleton = ({ className }: Props) => {
  return (
    <div className={classNames(cls.AnimeDetailSkeleton, {}, [className])}>
      {/* HERO */}
      <header className={cls.hero}>
        <div className={cls.heroBg} />

        <div className={cls.heroPanel}>
          <div className={cls.container}>
            {/* Poster */}
            <div className={cls.posterCard}>
              <Skeleton height={320} width="100%" />
              <div className={cls.actions}>
                <Skeleton height={40}></Skeleton>
                <Skeleton height={40}></Skeleton>
              </div>
            </div>

            {/* Meta */}
            <div className={cls.headMeta}>
              <Skeleton height={26} width="60%" />
              <Skeleton height={14} width="45%" />

              <div className={cls.synopsis}>
                <Skeleton height={14} />
                <Skeleton height={14} />
                <Skeleton height={14} width="85%" />
              </div>

              <div className={cls.tabs}>
                <Skeleton height={32} width={90} />
                <Skeleton height={32} width={110} />
                <Skeleton height={32} width={90} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className={cls.content}>
        <div className={cls.layout}>
          {/* SIDEBAR */}
          <aside className={cls.sidebar}>
            <Skeleton height={48} />
            <Skeleton height={48} />

            <ul className={cls.infoList}>
              {Array.from({ length: 8 }).map((_, i) => (
                <li key={i}>
                  <Skeleton height={14} width="40%" />
                  <Skeleton height={14} width="55%" />
                </li>
              ))}
            </ul>
          </aside>

          {/* MAIN */}
          <div className={cls.mainColumn}>
            {/* Pictures */}
            <section className={cls.section}>
              <Skeleton height={22} width="30%" />
              <div className={cls.picturesRow}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className={cls.pictureImg} />
                ))}
              </div>
            </section>

            {/* Characters */}
            <section className={cls.section}>
              <Skeleton height={22} width="35%" />
              <div className={cls.charactersGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className={cls.characterCard} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
