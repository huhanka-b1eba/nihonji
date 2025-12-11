import React from "react";
import cls from "./AnimeList.module.scss";
import { AnimeCard } from "../../../entities/anime";
import type { Anime } from "../../../entities/anime/model/anime";
import {Link} from "react-router";

type Props = {
    items: Anime[];
};

export const AnimeList: React.FC<Props> = ({ items }) => {
    if (!items || items.length === 0) return <div className={cls.empty}>Нет данных.</div>;

    return (
        <div className={cls.wrapper}>
            <div className={cls.grid}>
                {items.map((item) => (
                    <Link to={`/anime/${item.mal_id}`}>
                        <AnimeCard key={String(item.mal_id ?? item.title)} anime={item} />
                    </Link>
                ))}
            </div>
        </div>
    );
};
