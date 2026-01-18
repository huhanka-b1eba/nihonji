import cls from "./Intro.module.scss";
import { classNames } from "shared/lib/classNames/classNames.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// TODO: сделать index с импортами нужных изображений в assets
import bg1 from "shared/assets/img/homePage/bg-1.jpg";
import bg2 from "shared/assets/img/homePage/bg-2.jpg";
import bg3 from "shared/assets/img/homePage/bg-3.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface IntroProps {
  className?: string;
}

const bgImages = [bg2, bg1, bg3];

export const Intro = ({ className }: IntroProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (prevRef.current && nextRef.current && paginationRef.current) {
      setSwiperReady(true);
    }
  }, []);

  return (
    <section className={classNames(cls.Intro, {}, [className])}>
      <button ref={prevRef} className={classNames(cls.navBtn, {}, [cls.prevBtn])} />
      <button ref={nextRef} className={classNames(cls.navBtn, {}, [cls.nextBtn])} />

      {swiperReady && (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          className={cls.bgSwiper}
          loop
          autoplay={{ delay: 5000 }}
          speed={800}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            el: paginationRef.current,
            clickable: true,
            type: "bullets",
          }}
          onBeforeInit={(swiper) => {
            if (prevRef.current && nextRef.current) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          onInit={(swiper) => {
            swiper.navigation.update();
            swiper.pagination.update();
          }}
        >
          {bgImages.map((bgImage, i) => (
            <SwiperSlide key={i}>
              <div className={cls.bgSlide} style={{ backgroundImage: `url(${bgImage})` }} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className={cls.introMask} />

      <div className="container">
        <div className={cls.introContent}>
          <h1 className={cls.introTitle}>{t("intro.hello")} — Nihonji</h1>

          <p className={cls.introSubtitle}>{t("intro.subtitle")}</p>

          <div ref={paginationRef} className={cls.introPagination} />
        </div>
      </div>
    </section>
  );
};
