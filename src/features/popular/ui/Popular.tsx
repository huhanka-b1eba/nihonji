import cls from './Popular.module.scss';
import {classNames} from "../../../shared/lib/classNames/classNames.ts";
import {Star} from "lucide-react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import {Navigation} from "swiper/modules";
import {useRef, useState} from "react";

// TODO: Вынести
interface Anime {
    id: number;
    title: string;
    rating: number;
    img: string;
}

interface PopularProps {
    animeList: Anime[];
    className?: string;
}

export const Popular = ({animeList, className}: PopularProps) => {
    const swiperRef = useRef<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className={classNames(cls.Popular, {}, [className])}>
            <div className="container">
                <h2 className={cls.sectionTitle}>Популярные в этом сезоне</h2>
                <button className={classNames(cls.navBtn, {[cls.hidden]: isBeginning}, [cls.prevBtn])}></button>
                <button className={classNames(cls.navBtn, {[cls.hidden]: isEnd}, [cls.nextBtn])}></button>

            </div>
            <Swiper
                className={cls.bgSwiper}
                speed={800}
                slidesPerView={6.2}
                modules={[Navigation]}
                navigation={{
                    nextEl: `.${cls.nextBtn}`,
                    prevEl: `.${cls.prevBtn}`,
                }}
                initialSlide={0}
                spaceBetween={20}
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => {
                    setIsBeginning(!!s.isBeginning);
                    setIsEnd(!!s.isEnd);
                }}
            >
                {animeList.map(anime => (
                    <SwiperSlide key={anime.id} >
                        <div className={cls.animeCard}>
                            <img className={cls.animeImg} src={anime.img} alt={anime.title} />
                            <h3 className={cls.animeName}>{anime.title}</h3>
                            <p className={cls.animeRating}><Star />{anime.rating}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

