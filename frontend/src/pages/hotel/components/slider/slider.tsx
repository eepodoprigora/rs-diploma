import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import s from "./slider.module.scss";

interface SliderProps {
  images: string[];
}

export const Slider = ({ images }: SliderProps) => {
  return (
    <>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        modules={[Pagination]}
        pagination={{ clickable: true }}>
        {images.map((image) => (
          <SwiperSlide className={s["swiper-slide"]} key={image}>
            <img src={image} alt="Фото отеля" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
