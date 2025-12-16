import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import { classNames } from "shared/lib/classNames/classNames";
import { type ReactNode, useRef, useState } from "react";
import cls from "./SwiperBlock.module.scss";

interface SwiperBlockProps {
  className?: string;
  children: ReactNode;
}

export const SwiperBlock = ({ children, className }: SwiperBlockProps) => {
  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className={classNames(cls.SwiperBlock, {}, [className])}>
      <button className={classNames(cls.navBtn, { [cls.hidden]: isBeginning }, [cls.prevBtn])} />
      <button className={classNames(cls.navBtn, { [cls.hidden]: isEnd }, [cls.nextBtn])} />

      <Swiper
        className={cls.bgSwiper}
        speed={800}
        modules={[Navigation]}
        navigation={{
          nextEl: `.${cls.nextBtn}`,
          prevEl: `.${cls.prevBtn}`,
        }}
        spaceBetween={20}
        slidesOffsetBefore={isBeginning ? 85 : 0}
        breakpoints={{
          1520: {
            slidesPerView: 6.2,
            spaceBetween: 20,
            slidesOffsetBefore: 85,
          },

          1280: {
            slidesPerView: 4.2,
            spaceBetween: 18,
            slidesOffsetBefore: 40,
          },

          1024: {
            slidesPerView: 3.5,
            spaceBetween: 0,
            slidesOffsetBefore: 40,
          },

          768: {
            slidesPerView: 3.2,
            spaceBetween: 14,
            slidesOffsetBefore: 40,
          },

          460: {
            slidesPerView: 2.3,
            spaceBetween: 14,
            slidesOffsetBefore: 40,
          },

          0: {
            slidesPerView: 1.8,
            spaceBetween: 12,
            slidesOffsetBefore: 30,
          },
        }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => {
          setIsBeginning(s.isBeginning);
          setIsEnd(s.isEnd);
        }}
      >
        {children}
      </Swiper>
    </div>
  );
};
