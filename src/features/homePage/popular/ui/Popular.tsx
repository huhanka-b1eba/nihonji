import {SwiperSlide} from "swiper/react";
import "swiper/css";
import {AnimeCard} from "../../../../entities/anime";
import type {Anime} from "../../../../entities/anime/model/anime.ts";
import {SwiperBlock} from "../../../../shared/ui/SwiperBlock";
import {Section} from "../../../../shared/ui/Section";

interface PopularProps {
    animeList: Anime[];
    className?: string;
}

export const Popular = ({animeList, className}: PopularProps) => {
    return (
        <Section title="Популярные в этом сезоне" className={className}>
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

