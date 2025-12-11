import React from "react";
import cls from "./PosterCard.module.scss";
import { Heart, Search } from "lucide-react";
import AddToListButton from "../addToListButton/AddToListButton";

type Props = {
    poster?: string;
    title?: string;
    animeId: string;
    onOpenImage?: (src: string | null, caption?: string | null) => void;
    className?: string;
};

export const PosterCard: React.FC<Props> = ({ poster, title, animeId, onOpenImage, className }) => {
    const handleClick = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (!poster) return;
        onOpenImage?.(poster, title ?? null);
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

                {/* overlay (лупа) */}
                <div className={cls.zoomOverlay}>
                    <Search />
                </div>
            </div>

            <div className={cls.actions}>
                <AddToListButton animeId={animeId} />
                <button className={cls.like} aria-label="Like"><Heart /></button>
            </div>
        </div>
    );
};

export default PosterCard;
