"use client";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { ProductType } from "@/types/product.types";
export default function SwiperSimilarProduct({
  Products,
}: {
  Products: ProductType[];
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">
            You May Also <span className="text-emerald-600">Like</span>
          </h2>
        </div>
        <div className="flex space-x-2 justify-end">
          <button className="similar-prev h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition cursor-pointer">
            <FaChevronLeft />
          </button>
          <button className="similar-next h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-100 hover:text-primary-600 transition cursor-pointer">
            <FaChevronRight />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={16}
        navigation={{
          prevEl: ".similar-prev",
          nextEl: ".similar-next",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {Products?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <ProductCard product={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
