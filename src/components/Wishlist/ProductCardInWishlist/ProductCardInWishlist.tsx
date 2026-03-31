"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { ProductCardInWishlistProps } from "./productCardInWishlistProps.type";
import { useCart } from "@/hook/useCart";
import AddToCartButton from "@/components/shared/AddToCartButton/AddToCartButton";
import RemoveProductWishlist from "./RemoveProductWishList";

export default function WishlistProductCard({
  product,
}: ProductCardInWishlistProps) {
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();
  const isInCart = cart.cartItems?.some(
    (item) => item.product._id === product._id,
  );

  return (
    <div>
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors ${isLoading ? "opacity-60 relative" : ""}`}
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
        <div className="md:col-span-6 flex items-center gap-4">
          <Link
            className="w-20 h-20 rounded-[12px] bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
            href={`/products/${product._id}`}
          >
            <Image
              alt={product.title}
              className="w-full h-full object-contain p-2"
              src={product.imageCover}
              width={80}
              height={80}
            />
          </Link>
          <div className="min-w-0">
            <Link
              className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
              href={`/products/${product._id}`}
            >
              {product.title}
            </Link>
            <p className="text-sm font-medium text-gray-400 mt-1">
              {product.category.name}
            </p>
          </div>
        </div>
        <div className="md:col-span-2 flex md:justify-center items-center gap-2">
          <span className="md:hidden text-sm text-gray-500">Price:</span>
          <div className="text-right md:text-center">
            <div className="font-semibold text-gray-900">
              {product.priceAfterDiscount
                ? product.priceAfterDiscount
                : product.price}{" "}
              EGP
            </div>
            {product.priceAfterDiscount && (
              <div className="text-sm font-medium text-gray-400 line-through">
                {product.price} EGP
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-2 flex md:justify-center">
          <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
            {isInCart ? (
              <>
                <svg
                  data-prefix="fas"
                  data-icon="cart-shopping"
                  className="svg-inline--fa fa-cart-shopping w-[12.5px] h-2.5"
                  role="img"
                  viewBox="0 0 640 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M24-16C10.7-16 0-5.3 0 8S10.7 32 24 32l45.3 0c3.9 0 7.2 2.8 7.9 6.6l52.1 286.3c6.2 34.2 36 59.1 70.8 59.1L456 384c13.3 0 24-10.7 24-24s-10.7-24-24-24l-255.9 0c-11.6 0-21.5-8.3-23.6-19.7l-5.1-28.3 303.6 0c30.8 0 57.2-21.9 62.9-52.2L568.9 69.9C572.6 50.2 557.5 32 537.4 32l-412.7 0-.4-2c-4.8-26.6-28-46-55.1-46L24-16zM208 512a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm224 0a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                  ></path>
                </svg>{" "}
                In Cart
              </>
            ) : (
              <>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${product.quantity > 0 ? "bg-green-500" : "bg-red-500"}`}
                ></span>
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </>
            )}
          </span>
        </div>
        <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
          {isInCart ? (
            <Link
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              href="/cart"
            >
              <svg
                data-prefix="fas"
                data-icon="check"
                className="svg-inline--fa fa-check w-3.75 h-3 text-green-600"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                ></path>
              </svg>
              <span className="md:hidden lg:inline">View Cart</span>
            </Link>
          ) : (
            <AddToCartButton
              productId={product._id}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-medium transition-all bg-primary-600 text-white hover:bg-primary-700"
            >
              <svg
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.5625 0C0.250781 0 0 0.250781 0 0.5625C0 0.874219 0.250781 1.125 0.5625 1.125H1.62422C1.71563 1.125 1.79297 1.19062 1.80937 1.27969L3.03047 7.98984C3.17578 8.79141 3.87422 9.375 4.68984 9.375H10.6875C10.9992 9.375 11.25 9.12422 11.25 8.8125C11.25 8.50078 10.9992 8.25 10.6875 8.25H4.68984C4.41797 8.25 4.18594 8.05547 4.13672 7.78828L4.01719 7.125H11.1328C11.8547 7.125 12.4734 6.61172 12.607 5.90156L13.3336 2.01328C13.4203 1.55156 13.0664 1.125 12.5953 1.125H2.92266L2.91328 1.07812C2.80078 0.454687 2.25703 0 1.62187 0H0.5625ZM4.875 12.375C5.17337 12.375 5.45952 12.2565 5.6705 12.0455C5.88147 11.8345 6 11.5484 6 11.25C6 10.9516 5.88147 10.6655 5.6705 10.4545C5.45952 10.2435 5.17337 10.125 4.875 10.125C4.57663 10.125 4.29048 10.2435 4.0795 10.4545C3.86853 10.6655 3.75 10.9516 3.75 11.25C3.75 11.5484 3.86853 11.8345 4.0795 12.0455C4.29048 12.2565 4.57663 12.375 4.875 12.375ZM10.125 12.375C10.4234 12.375 10.7095 12.2565 10.9205 12.0455C11.1315 11.8345 11.25 11.5484 11.25 11.25C11.25 10.9516 11.1315 10.6655 10.9205 10.4545C10.7095 10.2435 10.4234 10.125 10.125 10.125C9.82663 10.125 9.54048 10.2435 9.3295 10.4545C9.11853 10.6655 9 10.9516 9 11.25C9 11.5484 9.11853 11.8345 9.3295 12.0455C9.54048 12.2565 9.82663 12.375 10.125 12.375Z"
                  fill="currentColor"
                />
              </svg>

              <span className="md:hidden lg:inline">Add to Cart</span>
            </AddToCartButton>
          )}
          <RemoveProductWishlist
            productId={product._id}
            productTitle={product.title}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}
