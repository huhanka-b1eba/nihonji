import { classNames } from "shared/lib/classNames/classNames";
import { Link } from "react-router";
import { useMultiAnimeNews } from "entities/news/hooks/useMultiAnimeNews";
import { ANIME_IDS } from "shared/config/newsConfig/newsIds";
import cls from "./News.module.scss";
import { useTranslation } from "react-i18next";

interface NewsProps {
  className?: string;
}

export const News = ({ className }: NewsProps) => {
  const { news, isLoading, error } = useMultiAnimeNews(ANIME_IDS);
  const { t } = useTranslation();

  const homeNews = news.slice(0, 10);

  // NOTE: ошибка должна быть залогировано на уровне работы с данными в useMultiAnimeNews, тут рендер "Ooops..." должен быть на этот случай
  if (error) console.error(error);

  return (
    <div className={classNames(cls.News, {}, [className])}>
      <div className="container">
        <div className={cls.bg} />

        <div className={cls.headerRow}>
          <h2>{t("news.title")}</h2>
          <Link to="/news">
            <div className={cls.viewAll}>{t("news.viewAll")}</div>
          </Link>
        </div>

        {isLoading && <div className={cls.loading}>{t("news.loading")}</div>}

        <div className={cls.newsGrid}>
          <div className={cls.bigNewsWrapper}>
            {homeNews.slice(0, 2).map((item) => (
              <a href={item.forum_url} key={item.mal_id + item.title}>
                <div className={cls.bigItem}>
                  <img
                    src={
                      item.images?.jpg?.image_url || "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={item.title}
                  />
                  <div className={cls.content}>
                    <div className={cls.title}>{item.title}</div>

                    <div className={cls.date}>{item.date?.slice(0, 10)}</div>

                    <div className={cls.author}>{item.author_username}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className={cls.smallColumn}>
            {homeNews.slice(2, 6).map((item) => (
              <a href={item.forum_url} key={item.mal_id + item.title}>
                <div className={cls.smallItem}>
                  <img
                    src={item.images?.jpg?.image_url || "https://placehold.co/300x200"}
                    alt={item.title}
                  />
                  <div className={cls.content}>
                    <div className={cls.title}>{item.title}</div>

                    <div className={cls.date}>{item.date?.slice(0, 10)}</div>

                    <div className={cls.author}>{item.author_username}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className={cls.smallColumn}>
            {homeNews.slice(6, 10).map((item) => (
              <a href={item.forum_url} key={item.mal_id + item.title}>
                <div className={cls.smallItem}>
                  <img
                    src={item.images?.jpg?.image_url || "https://placehold.co/300x200"}
                    alt={item.title}
                  />
                  <div className={cls.content}>
                    <div className={cls.title}>{item.title}</div>

                    <div className={cls.date}>{item.date?.slice(0, 10)}</div>

                    <div className={cls.author}>{item.author_username}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
