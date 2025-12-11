import cls from "./NewsPage.module.scss";
import { classNames } from "../../../shared/lib/classNames/classNames";
import { Loader } from "../../../shared/ui/Loader";
import { useMultiAnimeNews } from "../../../entities/news/hooks/useMultiAnimeNews";
import {ANIME_IDS} from "../../../shared/config/newsConfig/newsIds.ts";

interface NewsPageProps {
    className?: string;
}


export const NewsPage = ({ className }: NewsPageProps) => {
    const { news, isLoading, error } = useMultiAnimeNews(ANIME_IDS);

    return (
        <div className={classNames(cls.NewsPage, {}, [className])}>
            <div className="container">
                <h1 className={cls.title}>Новости</h1>

                {isLoading && (
                    <div className={cls.center}><Loader /></div>
                )}

                {error && (
                    <div className={cls.error}>
                        Не удалось загрузить новости. Попробуйте позже.
                    </div>
                )}

                {!isLoading && !error && news.length === 0 && (
                    <div className={cls.empty}>Новостей пока нет.</div>
                )}

                <div className={cls.grid}>
                    {news.map((n: any) => {
                        const img = n.images?.jpg?.image_url ?? "https://placehold.co/300x200?text=No+Image";

                        return (
                            <article key={n.mal_id + n.title} className={cls.card}>
                                <div className={cls.imageWrap}>
                                    <img src={img} alt={n.title} className={cls.image} />
                                </div>

                                <div className={cls.content}>
                                    <h3 className={cls.newsTitle}>{n.title}</h3>

                                    <p className={cls.meta}>
                                        <span>{n.date?.slice(0, 10)}</span>
                                        {" • "}
                                        <a
                                            href={n.author_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className={cls.author}
                                        >
                                            {n.author_username}
                                        </a>
                                    </p>

                                    <p className={cls.excerpt}>
                                        {n.excerpt || "Без описания."}
                                    </p>

                                    <a
                                        href={n.forum_url || n.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={cls.readMore}
                                    >
                                        Читать далее →
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
