import { SwiperSlide } from "swiper/react";
import "swiper/css";
import { AnimeCard } from "entities/anime";
import type { Anime } from "entities/anime/model/anime.ts";
import { SwiperBlock } from "shared/ui/SwiperBlock";
import { Section } from "shared/ui/Section";
import { Link } from "react-router";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface PopularProps {
  animeList: Anime[];
  className?: string;
}

// NOTE: больше на виджет похож
export const Popular = ({ animeList, className }: PopularProps) => {
  const { t } = useTranslation();

  const slides = useMemo(
    () =>
      animeList.map((anime) => (
        <SwiperSlide key={anime.mal_id}>
          <Link to={`/anime/${anime.mal_id}`}>
            <AnimeCard anime={anime} />
          </Link>
        </SwiperSlide>
      )),
    [animeList]
  );

  return (
    <Section title={t("sections.popularSeason")} className={className}>
      <SwiperBlock>{slides}</SwiperBlock>
    </Section>
  );
};
