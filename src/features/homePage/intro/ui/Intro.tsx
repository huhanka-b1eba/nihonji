import cls from './Intro.module.scss';
import {classNames} from "../../../../shared/lib/classNames/classNames.ts";
import {Swiper, SwiperSlide} from "swiper/react";
import { Autoplay } from "swiper/modules";
import bg1 from "../../../../shared/assets/img/homePage/bg-1.jpg";
import bg2 from "../../../../shared/assets/img/homePage/bg-2.jpg";
import bg3 from "../../../../shared/assets/img/homePage/bg-3.jpg";
import "swiper/css";

interface IntroProps {
    className?: string;
}

const bgImages = [bg2, bg1, bg3];

export const Intro = ({className}: IntroProps) => {
    return (
        <section className={classNames(cls.Intro, {}, [className])}>
            <Swiper
                modules={[Autoplay]}
                className={cls.bgSwiper}
                loop
                autoplay={{delay: 5000}}
                speed={800}
            >
                {bgImages.map((bgImage, i) => (
                    <SwiperSlide key={i}>
                        <div
                            className={cls.bgSlide}
                            style={{ backgroundImage: `url(${bgImage})`}}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={cls.introMask}></div>

            <div className="container">
                <div className={cls.introContent}>
                    <h1 className={cls.introTitle}>
                        Аниме на каждый день — Nihonji
                    </h1>

                    <p className={cls.introSubtitle}>
                        Личный гид по аниме: находи тайтлы по настроению, жанру, рейтингу и рекомендациям.
                        Каждый день — что-то новое.
                    </p>
                </div>
            </div>
        </section>
    );
};

