"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Thumbs } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

interface ProductImagesType {
  images: string[];
}

export default function ProductImagesSlider({ images }: ProductImagesType) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full">
      {/* main image */}
      <Swiper
        onSwiper={setMainSwiper}
        onSlideChange={(swiper) => {
          thumbsSwiper?.slideTo(swiper.activeIndex);
        }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="mb-4"
      >
        {images?.map((img) => (
          <SwiperSlide key={img}>
            <div className="min-h-65 sm:min-h-80 md:min-h-60 lg:min-h-70">
              <Image
                src={img}
                fill
                alt="product image"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* thumbnails */}
      <Swiper onSwiper={setThumbsSwiper} breakpoints={{0: {slidesPerView :4 , spaceBetween: 3}, 768: {slidesPerView: 2.2, spaceBetween: 1}, 1280: {slidesPerView: 3.2, spaceBetween: 3}}}>
        {images?.map((img, index) => (
          <SwiperSlide
            className="w-23 hover:border-4 hover:border-[#337ab7] border-4 border-transparent transition-all"
            key={img}
            onClick={() => mainSwiper?.slideTo(index)}
          >
            <div className="min-h-25 sm:min-h-35 md:min-h-25 lg:min-h-31.5 cursor-pointer">
              <Image
                src={img}
                fill
                alt="product image"
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
