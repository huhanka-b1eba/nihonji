import { Star } from "lucide-react";
import { classNames } from "shared/lib/classNames/classNames.ts";
// NOTE: чаще всего используют styles для импорта модульных стилей: import styles from "./AnimeCard.module.scss";
import cls from "./AnimeCard.module.scss";
import type { Anime } from "../../model/anime.ts";

interface AnimeCardProps {
  anime: Anime;
  className?: string;
}

// TODO: компонент всегда должен что-то возвращать, лучше проверяй наличие img выше и не заходи сюда,
//  либо придумай заглушку на случай, если img нет, ну или return null
export const AnimeCard = ({ anime, className }: AnimeCardProps) => {
  const img =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    anime.images?.webp?.large_image_url ||
    anime.images?.webp?.image_url ||
    "";

  if (img) {
    return (
      <div className={classNames(cls.AnimeCard, {}, [className])}>
        <div className={cls.imgWrapper}>
          <img className={cls.animeImg} src={img} alt={anime.title} />
        </div>

        <h3 className={cls.animeName}>{anime.title_english || anime.title}</h3>

        <p className={cls.animeRating}>
          <Star />
          {anime.score ? anime.score.toFixed(1) : "N/A"}
        </p>
      </div>
    );
  }
};
