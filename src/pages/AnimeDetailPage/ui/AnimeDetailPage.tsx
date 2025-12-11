import React, { useEffect, useMemo, useState } from "react";
import cls from "./AnimeDetailPage.module.scss";
import { classNames } from "../../../shared/lib/classNames/classNames.ts";
import { useParams } from "react-router";
import { Navigate } from "react-router-dom";
import {
    useGetAnimeByIdQuery,
    useGetAnimeCharactersQuery,
    useGetAnimePictureQuery,
    useGetAnimeStaffQuery,
} from "../../../entities/anime/api/animeApi.ts";
import { Loader } from "../../../shared/ui/Loader";
import {Star, Trophy, Play, Search} from "lucide-react";

import type { AnimeCharacter, AnimeStaff } from "../../../entities/anime/model/anime";
import { toYouTubeEmbedUrl, toYouTubeWatchUrl, formatDate, joinNames, pickImage } from "../../../shared/utils/animeHelpers";

import PosterCard from "./PosterCard/PosterCard.tsx";
import SectionHeader from "./SectionHeader/SectionHeader";
import CharacterCard from "./CharacterCard/CharacterCard";
import StaffCard from "./StaffCard/StaffCard";

type ViewSection = "overview" | "characters" | "staff";

interface AnimeDetailPageProps {
    className?: string;
}

export const AnimeDetailPage: React.FC<AnimeDetailPageProps> = ({ className }) => {
    const { id } = useParams<{ id?: string }>();

    const { data, error, isLoading } = useGetAnimeByIdQuery(id ?? "", { skip: !id });
    const { data: picturesData } = useGetAnimePictureQuery(id ?? "", { skip: !id });
    const { data: charactersData } = useGetAnimeCharactersQuery(id ?? "", { skip: !id });
    const { data: staffData } = useGetAnimeStaffQuery(id ?? "", { skip: !id });

    const [activeSection, setActiveSection] = useState<ViewSection>("overview");

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
    const [modalImageCaption, setModalImageCaption] = useState<string | null>(null);


    const pictures = useMemo(() => {
        if (!picturesData) return [];
        if (Array.isArray(picturesData)) return picturesData;
        return [];
    }, [picturesData]);

    const allCharacters = useMemo<AnimeCharacter[]>(() => {
        if (!charactersData) return [];
        if (Array.isArray(charactersData)) return charactersData;
        return [];
    }, [charactersData]);


    const staff = useMemo<AnimeStaff[]>(() => {
        if (!staffData) return [];

        if (Array.isArray(staffData)) return staffData as AnimeStaff[];

        if (Array.isArray((staffData as any).data)) return (staffData as any).data;

        return [];
    }, [staffData]);

    const previewChars = allCharacters.slice(0, 7);
    const previewStaff = staff.slice(0, 7);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsImageModalOpen(false);
                setModalImageSrc(null);
                setModalImageCaption(null);
            }
        };
        if (isImageModalOpen) {
            window.addEventListener("keydown", handler);
        }
        return () => {
            window.removeEventListener("keydown", handler);
        };
    }, [isImageModalOpen]);

    if (!id) return <Navigate to="/" replace />;

    const openImageModal = (src: string | null, caption?: string | null) => {
        if (!src) return;
        setModalImageSrc(src);
        setModalImageCaption(caption ?? null);
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
        setModalImageSrc(null);
        setModalImageCaption(null);
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.AnimeDetailPage, {}, [className])}>
                <div className={cls.center}><Loader /></div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className={classNames(cls.AnimeDetailPage, {}, [className])}>
                <div className={cls.center}>Не удалось загрузить данные. Попробуйте позже.</div>
            </div>
        );
    }

    const poster =
        data?.images?.webp?.large_image_url ||
        data?.images?.jpg?.large_image_url ||
        data?.images?.jpg?.image_url ||
        data?.images?.jpg?.small_image_url ||
        "";

    const trailerRaw = data?.trailer?.embed_url || data?.trailer?.url || null;
    const embedSrc = toYouTubeEmbedUrl(trailerRaw, {
        autoplay: 1,
        enablejsapi: 1,
        origin: typeof window !== "undefined" ? window.location.origin : undefined,
    });
    const watchUrl = toYouTubeWatchUrl(trailerRaw);

    return (
        <div className={classNames(cls.AnimeDetailPage, {}, [className])}>
            <header className={cls.hero}>
                <div className={cls.heroBg} />
                <div className={cls.heroPanel}>
                    <div className={cls.container}>
                        <PosterCard poster={poster} title={data.title} animeId={String(id)} onOpenImage={openImageModal} />
                        <div className={cls.headMeta}>
                            <h1 className={cls.title}>{data.title}</h1>
                            <p className={cls.subTitle}>
                                {data.title_english ? `${data.title_english} — ` : ""}
                                {data.title_japanese ? <span className={cls.jp}>{data.title_japanese}</span> : null}
                            </p>
                            <p className={cls.synopsisShort}>
                                {data.synopsis ? (data.synopsis.length > 360 ? data.synopsis.slice(0, 360) + "..." : data.synopsis) : "Описание отсутствует."}
                            </p>

                            <nav className={cls.tabs}>
                                <button className={activeSection === "overview" ? cls.tabActive : cls.tab} onClick={() => setActiveSection("overview")}>Overview</button>
                                <button className={activeSection === "characters" ? cls.tabActive : cls.tab} onClick={() => setActiveSection("characters")}>Characters</button>
                                <button className={activeSection === "staff" ? cls.tabActive : cls.tab} onClick={() => setActiveSection("staff")}>Staff</button>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <main className={cls.content}>
                <div className={cls.layout}>
                    <aside className={cls.sidebar}>
                        <div className={cls.metricCard}><Trophy /> {data.popularity ?? "—"} Most Popular</div>
                        <div className={cls.metricCard}><Star /> {data.rank ?? "—"} Highest Rated</div>

                        <ul className={cls.infoList}>
                            <li><strong>Airing: </strong> Ep {data.episodes ?? "—"}</li>
                            <li><strong>Duration: </strong> {data.duration ?? "—"}</li>
                            <li><strong>Source:</strong> {data.source ?? "—"}</li>
                            <li><strong>Season / Year:</strong> {data.season ?? "—"} {data.year ?? ""}</li>
                            <li><strong>Aired:</strong> {formatDate((data.aired as any)?.from)} — {formatDate((data.aired as any)?.to)}</li>
                            <li><strong>Broadcast:</strong> {data.broadcast?.string ?? "—"}</li>
                            <li><strong>Rating:</strong> {data.rating ?? "—"}</li>
                            <li><strong>Genres:</strong> {joinNames(data.genres)}</li>
                            <li><strong>Studios:</strong> {joinNames(data.studios)}</li>
                            <li><strong>Producers:</strong> {joinNames(data.producers)}</li>
                        </ul>
                    </aside>

                    <div className={cls.mainColumn}>
                        {activeSection === "overview" && (
                            <>
                                <section className={cls.section}>
                                    <SectionHeader title="Pictures" />
                                    {pictures.length > 0 ? (
                                        <div className={cls.picturesRow}>
                                            {pictures.map((pic: any, idx: number) => {
                                                const url = typeof pic === "string" ? pic : pic?.jpg?.large_image_url ||  pic?.jpg?.image_url || pic?.image_url ||  pic?.webp?.image_url || pic?.large_image_url || "";
                                                const caption = pic?.title || pic?.caption || data.title || "";
                                                const key = pic?.id ?? (url ? `pic-${encodeURIComponent(String(url))}` : `pic-${idx}`);
                                                return (
                                                    <div key={String(key)} className={cls.pictureItem}>
                                                        {url ? (
                                                            <div className={cls.zoomContainer} onClick={() => openImageModal(url, caption)}>
                                                                <img
                                                                    src={url}
                                                                    alt={caption || `picture-${idx}`}
                                                                    className={cls.pictureImg}
                                                                />
                                                                <div className={cls.zoomOverlay}><Search /></div>
                                                            </div>
                                                        ) : (
                                                            <div className={cls.picturePlaceholder}>No preview</div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : <div className={cls.empty}>No pictures available.</div>}
                                </section>

                                <section className={cls.section}>
                                    <SectionHeader title="Characters" onShowAll={() => setActiveSection("characters")} />
                                    <div className={cls.charactersGrid}>
                                        {previewChars.length > 0 ? previewChars.map((c: any, idx: number) => {
                                            const charObj = c.character || c;
                                            const key = charObj?.mal_id ?? charObj?.id ?? `char-${charObj?.name ?? idx}-${idx}`;
                                            return <CharacterCard key={String(key)} c={c} posterFallback={poster} onOpenImage={openImageModal} />;
                                        }) : <div className={cls.empty}>Characters data not available.</div>}
                                    </div>
                                </section>

                                {(embedSrc || watchUrl) && (
                                    <section className={cls.section}>
                                        <SectionHeader title="Trailer" />
                                        <div className={cls.trailerFrame}>
                                            {embedSrc ? <iframe title="trailer" src={embedSrc} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : <a href={watchUrl || trailerRaw || "#"} target="_blank" rel="noreferrer" className={cls.trailerLink}><Play /> Watch trailer</a>}
                                        </div>
                                    </section>
                                )}

                                <section className={cls.section}>
                                    <SectionHeader title="Staff" onShowAll={() => setActiveSection("staff")} />
                                    <div className={cls.staffRow}>
                                        {previewStaff.map((s: any, idx: number) => {
                                            const person = s.person || s;
                                            const key = person?.mal_id ?? person?.id ?? `staff-${person?.name ?? idx}-${idx}`;
                                            return <StaffCard key={String(key)} s={s} posterFallback={poster} onOpenImage={openImageModal} />;
                                        })}
                                        {previewStaff.length === 0 && <div className={cls.empty}>No staff available.</div>}
                                    </div>
                                </section>
                            </>
                        )}

                        {activeSection === "characters" && (
                            <section className={cls.section}>
                                <SectionHeader title="All Characters" />
                                <div className={cls.charList}>
                                    {allCharacters.length > 0 ? allCharacters.map((c: any, idx: number) => {
                                        const charObj = c.character || c;
                                        const name = charObj?.name || `Character ${idx}`;
                                        const thumb = pickImage(charObj, poster);
                                        const role = c.role || charObj?.role || "";
                                        const vas = c.voice_actors || [];
                                        const key = charObj?.mal_id ?? charObj?.id ?? `char-all-${idx}-${name}`;
                                        return (
                                            <div className={cls.charCard} key={String(key)}>
                                                <div className={cls.charThumbWrapper} onClick={() => openImageModal(thumb, name)}>
                                                    <img src={thumb} alt={name} className={cls.charThumb} />
                                                    <div className={cls.zoomOverlay}><Search size={18} /></div>
                                                </div>

                                                <div className={cls.charInfo}>
                                                    <div className={cls.charName}>{name}</div>
                                                    <div className={cls.charRole}>{role}</div>

                                                    {vas.length > 0 && (
                                                        <div className={cls.charVA}>
                                                            {vas.map((v: any) => v.person?.name || v.name).join(", ")}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }) : <div className={cls.empty}>No characters available.</div>}
                                </div>
                            </section>
                        )}

                        {activeSection === "staff" && (
                            <section className={cls.section}>
                                <SectionHeader title="All Staff" />
                                <div className={cls.modalList}>
                                    {staff.length > 0 ? staff.map((s: any, idx: number) => {
                                        const person = s.person || s;
                                        const name = person?.name || s.name || `Staff ${idx}`;
                                        const img = pickImage(person, poster);
                                        const pos = s.positions?.join?.(", ") ?? s.role ?? "—";
                                        const key = person?.mal_id ?? person?.id ?? `staff-all-${idx}-${name}`;

                                        return (
                                            <div className={cls.staffOverlayCard} key={String(key)}>
                                                <div className={cls.staffOverlayImgWrap}>
                                                    <button
                                                        type="button"
                                                        className={cls.staffThumbBtn}
                                                        onClick={() => openImageModal(img, name)}
                                                        aria-label={`Open ${name} image`}
                                                    >
                                                        <img src={img} alt={name} className={cls.staffOverlayImg} />
                                                        <div className={cls.zoomOverlay}><Search size={16} /></div>
                                                    </button>

                                                    <div className={cls.staffOverlayGradient} />

                                                    <div className={cls.staffOverlayText}>
                                                        <div className={cls.staffOverlayName}>{name}</div>
                                                        <div className={cls.staffOverlayPos}>{pos}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) : <div className={cls.empty}>No staff available.</div>}
                                </div>

                            </section>
                        )}
                    </div>
                </div>
            </main>

            {isImageModalOpen && modalImageSrc && (
                <div
                    className={cls.imageModal}
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) closeImageModal();
                    }}
                >
                    <div className={cls.imageModalInner}>
                        <button className={cls.imageModalClose} onClick={closeImageModal} aria-label="Close image">✕</button>
                        <img src={modalImageSrc} alt={modalImageCaption ?? "image"} className={cls.imageModalImg} />
                        {modalImageCaption && <div className={cls.imageModalCaption}>{modalImageCaption}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

