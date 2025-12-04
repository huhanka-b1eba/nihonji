import {Swiper} from "swiper/react";
import {Navigation} from "swiper/modules";
import {classNames} from "../../../lib/classNames/classNames.ts";
import {type ReactNode, useRef, useState} from "react";
import cls from "./SwiperBlock.module.scss"

interface SwiperBlockProps {
    className?: string;
    children: ReactNode;
}


export const SwiperBlock = ({children, className}: SwiperBlockProps) => {
    const swiperRef = useRef<any>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className={classNames(cls.SwiperBlock, {}, [className])}>
            <button className={classNames(cls.navBtn, {[cls.hidden]: isBeginning}, [cls.prevBtn])}></button>
            <button className={classNames(cls.navBtn, {[cls.hidden]: isEnd}, [cls.nextBtn])}></button>

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
                {children}
            </Swiper>
        </div>
    );
};

