import cls from './News.module.scss';
import { classNames } from "../../../../shared/lib/classNames/classNames";
import { Link } from "react-router";
import { useMultiAnimeNews } from "../../../../entities/news/hooks/useMultiAnimeNews";
import { ANIME_IDS } from "../../../../shared/config/newsConfig/newsIds";

interface NewsProps {
    className?: string;
}

export const News = ({ className }: NewsProps) => {
    const { news, isLoading, error } = useMultiAnimeNews(ANIME_IDS);

    const homeNews = news.slice(0, 10);

    if (error) console.error(error)

    return (
        <div className={classNames(cls.News, {}, [className])}>
            <div className="container">

                <div className={cls.bg}></div>

                <div className={cls.headerRow}>
                    <h2>Новости Nihonji</h2>
                    <Link to="/news">
                        <div className={cls.viewAll}>Смотреть все →</div>
                    </Link>
                </div>

                {isLoading && <div className={cls.loading}>Загрузка...</div>}

                <div className={cls.newsGrid}>

                    <div className={cls.bigNewsWrapper}>
                        {homeNews.slice(0, 2).map((item) => (
                            <a href={item.forum_url}  key={item.mal_id + item.title}>
                                <div className={cls.bigItem}>
                                    <img
                                        src={item.images?.jpg?.image_url || "https://placehold.co/600x400?text=No+Image"}
                                        alt={item.title}
                                    />
                                    <div className={cls.content}>
                                        <div className={cls.title}>{item.title}</div>

                                        <div className={cls.date}>
                                            {item.date?.slice(0, 10)}
                                        </div>

                                        <div className={cls.author}>
                                            {item.author_username}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className={cls.smallColumn}>
                        {homeNews.slice(2, 6).map((item) => (
                            <a href={item.forum_url}  key={item.mal_id + item.title}>
                                <div className={cls.smallItem}>
                                    <img
                                        src={item.images?.jpg?.image_url || "https://placehold.co/300x200"}
                                        alt={item.title}
                                    />
                                    <div className={cls.content}>
                                        <div className={cls.title}>{item.title}</div>

                                        <div className={cls.date}>
                                            {item.date?.slice(0, 10)}
                                        </div>

                                        <div className={cls.author}>
                                            {item.author_username}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className={cls.smallColumn}>
                        {homeNews.slice(6, 10).map((item) => (
                            <a href={item.forum_url}  key={item.mal_id + item.title}>
                                <div className={cls.smallItem}>
                                        <img
                                            src={item.images?.jpg?.image_url || "https://placehold.co/300x200"}
                                            alt={item.title}
                                        />
                                        <div className={cls.content}>
                                            <div className={cls.title}>{item.title}</div>

                                            <div className={cls.date}>
                                                {item.date?.slice(0, 10)}
                                            </div>

                                            <div className={cls.author}>
                                                {item.author_username}
                                            </div>
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
