"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderItem } from "./slider.types";
import { sliderArr } from "./slider.data";
import { swiperOptions } from "./swiper.options";
import Link from "next/link";

export default function MainSlider() {
  return (
    <div className="relative">
      <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <FaChevronLeft />
      </div>

      <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <FaChevronRight />
      </div>
      <Swiper {...swiperOptions}>
        {sliderArr.map((slide: SliderItem) => {
          return (
            <SwiperSlide key={slide.btn1Color}>
              <div
                className="h-100 flex items-center justify-center"
                style={{
                  backgroundImage: 'url("/images/home-slider.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
                  <div className="container mx-auto h-full flex flex-col justify-center">
                    <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                      {slide.h2}
                    </h2>
                    <p className="font-medium">{slide.p}</p>
                    <div className="flex gap-2 mt-4">
                      <Link
                        className={`bg-white border-2 border-white/50 ${slide.btn1Color} inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200`}
                        href="/products"
                      >
                        {slide.btn1}
                      </Link>
                      <Link
                        className="bg-transparent border-2 border-white/50 text-white inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform duration-200"
                        href="/deals"
                      >
                        {slide.btn2}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
