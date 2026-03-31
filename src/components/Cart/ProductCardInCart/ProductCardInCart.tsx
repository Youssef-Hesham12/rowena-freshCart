"use client";
import Image from "next/image";
import Link from "next/link";
import { ProductCardInCartProps } from "./productCardInCartProps.type";
import ProductCount from "./ProductCount";
import { HiMiniXMark } from "react-icons/hi2";
import { useState } from "react";
import DeleteProductButton from "./DeleteProductButton";

export default function ProductCardInCart({ product }: ProductCardInCartProps) {
  const totalPrice = product.count * product.price;
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div
      className={`relative bg-white rounded-[16px] shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 ${isLoading ? "opacity-60" : ""}`}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 rounded-[16px] flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg">
            <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium text-gray-600">
              Updating...
            </span>
          </div>
        </div>
      )}
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          <Link
            className="relative shrink-0 group"
            href={`/products/${product.product._id}`}
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
              <Image
                alt={product.product.title}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                src={product.product.imageCover}
                width={112}
                height={112}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              {product.product.quantity > 0 ? (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.29336 1.0953C8.5168 1.2578 8.5668 1.5703 8.4043 1.79374L4.4043 7.29374C4.31836 7.41249 4.18555 7.48592 4.03867 7.49842C3.8918 7.51092 3.74961 7.45624 3.64648 7.35311L1.64648 5.35311C1.45117 5.1578 1.45117 4.84061 1.64648 4.6453C1.8418 4.44999 2.15898 4.44999 2.3543 4.6453L3.94023 6.23124L7.59648 1.20467C7.75898 0.981236 8.07148 0.931236 8.29492 1.09374L8.29336 1.0953Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <HiMiniXMark />
              )}

              {product.product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </div>
          </Link>
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-3">
              <Link
                className="group/title"
                href={`/products/${product.product._id}`}
              >
                <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                  {product.product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-primary-50 to-emerald-50 text-primary-700 text-xs font-medium rounded-full">
                  {product.product.category.name}
                </span>
                <span className="text-xs font-medium text-gray-400">•</span>
                <span className="text-xs font-medium text-gray-500">
                  SKU: {product.product._id.slice(0, 6).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-primary-600 font-bold text-lg">
                  {product.price.toLocaleString()} EGP
                </span>
                <span className="text-xs font-medium text-gray-400">
                  per unit
                </span>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <ProductCount product={product} setIsLoading={setIsLoading} />
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-400 mb-0.5">
                    Total
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {totalPrice.toLocaleString()}{" "}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
                <DeleteProductButton
                  productId={product.product._id}
                  productTitle={product.product.title}
                  setIsLoading={setIsLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
