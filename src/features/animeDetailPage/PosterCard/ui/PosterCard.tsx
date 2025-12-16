import React, { useEffect, useState } from "react";
import { Heart, Search } from "lucide-react";
import cls from "./PosterCard.module.scss";
import AddToListButton from "../../addToListButton/ui/AddToListButton.tsx";

type Props = {
  poster?: string;
  title?: string;
  animeId: string;
  onOpenImage?: (src: string | null, caption?: string | null) => void;
  className?: string;
};

export const PosterCard: React.FC<Props> = ({ poster, title, animeId, onOpenImage, className }) => {
  const myLikeAnime = `myLikeAnime:${animeId}`;
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    try {
      const save = localStorage.getItem(myLikeAnime);
      setIsLike(Boolean(save === "1"));
    } catch {
      setIsLike(false);
    }
  }, [myLikeAnime]);

  const handleClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!poster) return;
    onOpenImage?.(poster, title ?? null);
  };

  const handleLike = (e?: React.MouseEvent) => {
    e?.stopPropagation();

    try {
      if (isLike) {
        localStorage.removeItem(myLikeAnime);
        setIsLike(false);
      } else {
        localStorage.setItem(myLikeAnime, "1");
        setIsLike(true);
      }
    } catch {
      setIsLike((v) => !v);
    }
  };

  return (
    <div className={`${cls.posterCard} ${className ?? ""}`}>
      <div
        className={`${cls.zoomContainer} ${cls.zoomUpper}`}
        onClick={handleClick}
        role={poster ? "button" : undefined}
        aria-label={poster ? `Open ${title}` : undefined}
      >
        {poster ? (
          <img className={cls.poster} src={poster} alt={title} />
        ) : (
          <div className={cls.placeholder}>No image</div>
        )}

        <div className={cls.zoomOverlay}>
          <Search />
        </div>
      </div>

      <div className={cls.actions}>
        <AddToListButton animeId={animeId} />
        <button
          className={`${cls.like} ${isLike ? cls.liked : ""}`}
          aria-pressed={isLike}
          aria-label={isLike ? "Unfavorite" : "Like"}
          onClick={handleLike}
          type="button"
        >
          <Heart />
        </button>
      </div>
    </div>
  );
};

export default PosterCard;
