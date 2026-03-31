import BrandCard from "@/components/Brands/BrandCard/BrandCard";
import { getAllBrands } from "@/services/brands.service";
import { BrandsResponseType } from "@/types/response.types";
import Link from "next/link";

export default async function Brands() {
  const brands: BrandsResponseType = await getAllBrands()
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4! py-12! sm:py-16!">
          <nav className="flex items-center gap-2 text-sm font-medium text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[16px] bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <svg
                width="38"
                height="30"
                viewBox="0 0 38 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.3848 2.29102L34.0684 11.0977C35.6914 12.7441 35.6914 15.3809 34.0684 17.0273L24.9043 26.3027C24.3594 26.8535 23.4688 26.8594 22.918 26.3145C22.3672 25.7695 22.3613 24.8789 22.9062 24.3281L32.0703 15.0469C32.6094 14.502 32.6094 13.6172 32.0703 13.0723L23.3809 4.27148C22.8359 3.7207 22.8418 2.83008 23.3926 2.28516C23.9434 1.74023 24.834 1.74609 25.3789 2.29688L25.3848 2.29102ZM3.75781 13.4473V5.625C3.75781 3.55664 5.43945 1.875 7.50781 1.875H15.3301C16.3262 1.875 17.2812 2.26758 17.9844 2.9707L26.4219 11.4082C27.8867 12.873 27.8867 15.2461 26.4219 16.7109L18.5996 24.5332C17.1348 25.998 14.7617 25.998 13.2969 24.5332L4.85938 16.0957C4.15625 15.3926 3.76367 14.4375 3.76367 13.4414L3.75781 13.4473ZM12.1953 8.4375C12.1953 7.94022 11.9978 7.46331 11.6461 7.11168C11.2945 6.76004 10.8176 6.5625 10.3203 6.5625C9.82303 6.5625 9.34612 6.76004 8.99449 7.11168C8.64286 7.46331 8.44531 7.94022 8.44531 8.4375C8.44531 8.93478 8.64286 9.41169 8.99449 9.76333C9.34612 10.115 9.82303 10.3125 10.3203 10.3125C10.8176 10.3125 11.2945 10.115 11.6461 9.76333C11.9978 9.41169 12.1953 8.93478 12.1953 8.4375Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Top Brands
              </h1>
              <p className="text-white/80 font-medium mt-1">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4! py-10!">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands?.data?.map((brand)=> (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}
