import {SwiperBlock} from "../../../../shared/ui/SwiperBlock";
import {SwiperSlide} from "swiper/react";
import {AnimeCard} from "../../../../entities/anime";
import type {Anime} from "../../../../entities/anime/model/anime.ts";
import {Section} from "../../../../shared/ui/Section";

interface NoveltyProps {
    className?: string;
    animeList: Anime[];
}


export const Novelty = ({animeList, className}: NoveltyProps) => {
    return (
        <Section title="Предстоящий сезон" className={className}>
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

