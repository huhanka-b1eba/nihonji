import { SwiperBlock } from "shared/ui/SwiperBlock";
import { SwiperSlide } from "swiper/react";
import { AnimeCard } from "entities/anime";
import type { Anime } from "entities/anime/model/anime.ts";
import { Section } from "shared/ui/Section";
import { useTranslation } from "react-i18next";
import {Link} from "react-router";

interface NoveltyProps {
  className?: string;
  animeList: Anime[];
}

export const Novelty = ({ animeList, className }: NoveltyProps) => {
  const { t } = useTranslation();

  return (
    <Section title={t("novelty.title")} className={className}>
      <SwiperBlock>
        {animeList.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
              <Link to={`/anime/${anime.mal_id}`}>
                  <AnimeCard anime={anime} />
              </Link>
          </SwiperSlide>
        ))}
      </SwiperBlock>
    </Section>
  );
};
