import { SwiperBlock } from "shared/ui/SwiperBlock";
import { SwiperSlide } from "swiper/react";
import { AnimeCard } from "entities/anime";
import type { Anime } from "entities/anime/model/anime.ts";
import { Section } from "shared/ui/Section";
import { useTranslation } from "react-i18next";

interface AllTimeFavoritesProps {
  className?: string;
  animeList: Anime[];
}

export const AllTimeFavorites = ({ animeList, className }: AllTimeFavoritesProps) => {
  const { t } = useTranslation();

  return (
    <Section title={t("sections.popularAllTime")} className={className}>
      <SwiperBlock>
        {animeList.map((anime) => (
          <SwiperSlide key={anime.mal_id}>
            <AnimeCard anime={anime} />
          </SwiperSlide>
        ))}
      </SwiperBlock>
    </Section>
  );
};
