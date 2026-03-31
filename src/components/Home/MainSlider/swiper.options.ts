import { Pagination, Navigation } from "swiper/modules";

export const swiperOptions = {
  slidesPerView: 1,
  loop : true,
  pagination: {
    clickable: true,
    bulletClass:
      "swiper-pagination-bullet !size-3 !bg-white/50 !opacity-100 hover:scale-110! hover:bg-[#fffc]! transition-all duration-300",
    bulletActiveClass:
      "swiper-pagination-bullet-active bg-white! !w-8 !rounded-[6px]",
  },
  modules: [Pagination, Navigation],
  navigation: {
    nextEl: ".custom-next",
    prevEl: ".custom-prev",
  },
};