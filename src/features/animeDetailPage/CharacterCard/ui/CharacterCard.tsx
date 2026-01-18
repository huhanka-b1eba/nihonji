import React from "react";
import type { AnimeCharacter } from "entities/anime/model/anime.ts";
import { pickImage } from "shared/utils/animeHelpers.ts";
import cls from "./CharacterCard.module.scss";

type Props = {
  c: AnimeCharacter | any;
  posterFallback?: string;
  onOpenImage?: (src: string | null, caption?: string | null) => void;
};

// NOTE: больше похоже на виджет/сущность
export const CharacterCard: React.FC<Props> = ({ c, posterFallback, onOpenImage }) => {
  const charObj = c.character || c;
  const name = charObj?.name ?? "—";
  const thumb = pickImage(charObj, posterFallback);
  const role = c.role || charObj?.role || "—";
  const va = c.voice_actors || [];

  const handleClick = () => {
    if (!thumb) return;
    onOpenImage?.(thumb, name);
  };

  return (
    <div className={cls.card}>
      {/* NOTE: похоже на фичу */}
      <button
        type="button"
        className={cls.thumbButton}
        onClick={handleClick}
        aria-label={`Open ${name} image`}
      >
        <img className={cls.thumb} src={thumb} alt={name} />
      </button>

      <div className={cls.info}>
        <div className={cls.name}>{name}</div>
        <div className={cls.role}>{role}</div>
        {va.length > 0 && (
          <div className={cls.va}>
            {va
              .slice(0, 2)
              .map((v: any) => v.person?.name || v.name)
              .join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};
