"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaAppleWhole,
  FaArrowLeft,
  FaCarrot,
  FaCartShopping,
  FaLemon,
  FaSeedling,
} from "react-icons/fa6";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] text-primary-200 text-4xl animate-[floatRotate_6s_ease-in-out_infinite]">
          <FaAppleWhole />
        </div>
        <div className="absolute top-[20%] right-[10%] text-primary-200 text-3xl animate-[floatRotate_8s_ease-in-out_infinite_1s]">
          <FaCarrot />
        </div>
        <div className="absolute bottom-[25%] left-[8%] text-primary-200 text-3xl animate-[floatRotate_7s_ease-in-out_infinite_0.5s]">
          <FaLemon />
        </div>
        <div className="absolute bottom-[15%] right-[15%] text-primary-200 text-4xl animate-[floatRotate_9s_ease-in-out_infinite_2s]">
          <FaSeedling />
        </div>
        <div className="absolute top-[50%] left-[15%] text-primary-100 text-2xl animate-[floatRotate_5s_ease-in-out_infinite_1.5s]">
          <FaAppleWhole />
        </div>
        <div className="absolute top-[40%] right-[5%] text-primary-100 text-2xl animate-[floatRotate_6s_ease-in-out_infinite_0.8s]">
          <FaCarrot />
        </div>
        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-primary-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-primary-100/30 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 max-w-xl w-full">
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-primary-100/50 rounded-[32px] blur-2xl"></div>
            <div className="relative w-64 h-52 sm:w-72 sm:h-60">
              <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary-50/80 via-transparent to-primary-100/40"></div>
                <FaCartShopping className="relative w-18.75 h-15 sm:w-22.5 sm:h-18 text-primary-400/80" />
              </div>
              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white shadow-lg"></div>
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/40">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      404
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-400"></div>
                <div className="w-8 h-4 border-b-[3px] border-primary-400 rounded-b-full"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-primary-400"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            Oops! Nothing Here
          </h1>
          <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-md mx-auto">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 rounded-[16px] font-bold text-lg transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-1"
            href="/"
          >
            <svg
              width="22.5"
              height="18"
              className="group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.01116 0.20155C7.72288 -0.0656372 7.27757 -0.0656372 6.99163 0.20155L1.74163 5.07655C1.51663 5.28749 1.44163 5.61327 1.55413 5.89921C1.66663 6.18514 1.94085 6.37499 2.25022 6.37499H2.62522V10.5C2.62522 11.3273 3.29788 12 4.12522 12H10.8752C11.7026 12 12.3752 11.3273 12.3752 10.5V6.37499H12.7502C13.0596 6.37499 13.3362 6.18514 13.4487 5.89921C13.5612 5.61327 13.4862 5.28514 13.2612 5.07655L8.01116 0.20155ZM7.12522 7.49999H7.87522C8.49632 7.49999 9.00022 8.00389 9.00022 8.62499V10.875H6.00022V8.62499C6.00022 8.00389 6.50413 7.49999 7.12522 7.49999Z"
                fill="currentColor"
              />
            </svg>
            Go to Homepage
          </Link>
          <button
            onClick={() => router.back()}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-4 px-8 rounded-[16px] font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:-translate-y-1 cursor-pointer"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </button>
        </div>
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
          <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              className="px-5 py-2.5 rounded-xl bg-primary-50 text-primary-700 font-semibold text-sm hover:bg-primary-100 transition-colors"
              href="/products"
            >
              All Products
            </Link>
            <Link
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
              href="/categories"
            >
              Categories
            </Link>
            <Link
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
              href="/deals"
            >
              Today&apos;s Deals
            </Link>
            <Link
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
              href="/contact"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
