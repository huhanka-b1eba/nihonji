import {SwiperBlock} from "../../../../shared/ui/SwiperBlock";
import {SwiperSlide} from "swiper/react";
import {AnimeCard} from "../../../../entities/anime";
import type {Anime} from "../../../../entities/anime/model/anime.ts";
import {Section} from "../../../../shared/ui/Section";


interface AllTimeFavoritesProps {
    className?: string;
    animeList: Anime[];
}


export const AllTimeFavorites = ({animeList, className}: AllTimeFavoritesProps) => {
    return (
        <Section title="Популярны всегда" className={className}>
            <SwiperBlock>
                {animeList.map((anime) => (
                    <SwiperSlide key={anime.id}>
                        <AnimeCard anime={anime} />
                    </SwiperSlide>
                ))}
            </SwiperBlock>
        </Section>
    );
};

