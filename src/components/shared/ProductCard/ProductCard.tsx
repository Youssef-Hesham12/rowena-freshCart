import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "./product-card.types";
import { FaPlus } from "react-icons/fa6";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import AddToWishlistButton from "./AddToWishlistButton";

export default function ProductCard({ product }: ProductCardProps) {
  let offer = 0;
  if (product.priceAfterDiscount) {
    offer = Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100,
    );
  }

  const fullStars = Math.floor(product.ratingsAverage);
  const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="product-card bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
      <div className="relative">
        <Image
          className="w-full h-60 object-contain bg-white"
          alt={product.title}
          src={product.imageCover}
          width={273}
          height={240}
        />
        {offer !== 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{offer}%
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <AddToWishlistButton productId={product._id} />
          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm cursor-pointer">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.05944 7.14062C4.47507 4.23438 6.97819 2 10.0001 2C11.6563 2 13.1563 2.67188 14.2438 3.75625C14.2501 3.7625 14.2563 3.76875 14.2626 3.775L14.5001 4H13.0032C12.4501 4 12.0032 4.44688 12.0032 5C12.0032 5.55312 12.4501 6 13.0032 6H17.0032C17.5563 6 18.0032 5.55312 18.0032 5V1C18.0032 0.446875 17.5563 0 17.0032 0C16.4501 0 16.0032 0.446875 16.0032 1V2.66875L15.6501 2.33437C14.2032 0.89375 12.2032 0 10.0001 0C5.96882 0 2.63444 2.98125 2.08132 6.85938C2.00319 7.40625 2.38132 7.9125 2.92819 7.99062C3.47507 8.06875 3.98132 7.6875 4.05944 7.14375V7.14062ZM17.9188 9.14062C17.9969 8.59375 17.6157 8.0875 17.0719 8.00937C16.5282 7.93125 16.0188 8.3125 15.9407 8.85625C15.5251 11.7625 13.0219 13.9969 10.0001 13.9969C8.34382 13.9969 6.84382 13.325 5.75632 12.2406C5.75007 12.2344 5.74382 12.2281 5.73757 12.2219L5.50007 11.9969H6.99694C7.55007 11.9969 7.99694 11.55 7.99694 10.9969C7.99694 10.4437 7.55007 9.99687 6.99694 9.99687L3.00007 10C2.73444 10 2.47819 10.1062 2.29069 10.2969C2.10319 10.4875 1.99694 10.7406 2.00007 11.0094L2.03132 14.9781C2.03444 15.5312 2.48757 15.975 3.04069 15.9688C3.59382 15.9625 4.03757 15.5125 4.03132 14.9594L4.01882 13.35L4.35319 13.6656C5.80007 15.1062 7.79694 16 10.0001 16C14.0313 16 17.3657 13.0188 17.9188 9.14062Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <Link
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
            href={`/products/${product._id}`}
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.00234 1.5C6.96484 1.5 5.28984 2.425 4.00547 3.61562C2.80234 4.73438 1.97109 6.0625 1.54609 7C1.97109 7.9375 2.80234 9.26562 4.00547 10.3844C5.28984 11.575 6.96484 12.5 9.00234 12.5C11.0398 12.5 12.7148 11.575 13.9992 10.3844C15.2023 9.26562 16.0336 7.9375 16.4586 7C16.0336 6.0625 15.2023 4.73438 13.9992 3.61562C12.7148 2.425 11.0398 1.5 9.00234 1.5ZM2.98359 2.51875C4.45547 1.15 6.47734 0 9.00234 0C11.5273 0 13.5492 1.15 15.0211 2.51875C16.4836 3.87812 17.4617 5.5 17.9273 6.61562C18.0305 6.8625 18.0305 7.1375 17.9273 7.38437C17.4617 8.5 16.4836 10.125 15.0211 11.4812C13.5492 12.8469 11.5273 14 9.00234 14C6.47734 14 4.45547 12.85 2.98359 11.4812C1.52109 10.1219 0.542969 8.5 0.0773437 7.38437C-0.0257813 7.1375 -0.0257813 6.8625 0.0773437 6.61562C0.542969 5.5 1.52109 3.875 2.98359 2.51875ZM9.00234 9.5C10.3836 9.5 11.5023 8.38125 11.5023 7C11.5023 6.075 10.9992 5.26562 10.2523 4.83437C10.2086 6.7 8.70234 8.20625 6.83672 8.25C7.26797 8.99687 8.07734 9.5 9.00234 9.5ZM6.51484 6.7375C6.59297 6.74688 6.67109 6.75 6.75234 6.75C7.85547 6.75 8.75234 5.85313 8.75234 4.75C8.75234 4.66875 8.74609 4.59062 8.73984 4.5125C7.57109 4.63437 6.63984 5.56563 6.51797 6.73438L6.51484 6.7375ZM7.93984 3.14375C8.27734 3.05 8.63359 3.00313 8.99922 3.00313C9.27422 3.00313 9.54609 3.03125 9.80547 3.08437C9.81484 3.0875 9.82109 3.0875 9.83047 3.09062C11.6398 3.47187 12.9992 5.08125 12.9992 7.00313C12.9992 9.2125 11.2086 11.0031 8.99922 11.0031C7.07422 11.0031 5.46797 9.64375 5.08672 7.83438C5.03047 7.56563 4.99922 7.2875 4.99922 7.00313C4.99922 6.65938 5.04297 6.32188 5.12422 6.00313C5.13047 5.98125 5.13359 5.9625 5.13984 5.94375C5.51172 4.5875 6.58047 3.51875 7.93672 3.14687L7.93984 3.14375Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs font-medium text-gray-500 mb-1">
          {product.category.name}
        </div>
        <h3 className="font-medium mb-1 cursor-pointer " title={product.title}>
          <Link className="line-clamp-2" href={`/products/${product._id}`}>
            {product.title}
          </Link>
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-amber-400 mr-2">
            {Array.from({ length: fullStars }).map((_, index) => (
              <svg
                key={index}
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6718 0.409375C10.5437 0.159375 10.2843 0 10.0031 0C9.72183 0 9.46246 0.159375 9.33433 0.409375L7.03433 4.91563L2.03746 5.70937C1.75933 5.75312 1.52808 5.95 1.44058 6.21875C1.35308 6.4875 1.42496 6.78125 1.62183 6.98125L5.19683 10.5594L4.40933 15.5562C4.36558 15.8344 4.48121 16.1156 4.70933 16.2812C4.93746 16.4469 5.23746 16.4719 5.49058 16.3438L10.0031 14.05L14.5125 16.3438C14.7625 16.4719 15.0656 16.4469 15.2937 16.2812C15.5218 16.1156 15.6375 15.8375 15.5937 15.5562L14.8031 10.5594L18.3781 6.98125C18.5781 6.78125 18.6468 6.4875 18.5593 6.21875C18.4718 5.95 18.2437 5.75312 17.9625 5.70937L12.9687 4.91563L10.6718 0.409375Z"
                  fill="#FCC800"
                />
              </svg>
            ))}
            {hasHalfStar && (
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6718 0.409375C10.5437 0.159375 10.2843 0 10.0031 0C9.72183 0 9.46246 0.159375 9.33433 0.409375L7.03433 4.91563L2.03746 5.70937C1.75933 5.75312 1.52808 5.95 1.44058 6.21875C1.35308 6.4875 1.42496 6.78125 1.62183 6.98125L5.19683 10.5594L4.40933 15.5562C4.36558 15.8344 4.48121 16.1156 4.70933 16.2812C4.93746 16.4469 5.23746 16.4719 5.49058 16.3438L10.0031 14.05L14.5125 16.3438C14.7625 16.4719 15.0656 16.4469 15.2937 16.2812C15.5218 16.1156 15.6375 15.8375 15.5937 15.5562L14.8031 10.5594L18.3781 6.98125C18.5781 6.78125 18.6468 6.4875 18.5593 6.21875C18.4718 5.95 18.2437 5.75312 17.9625 5.70937L12.9687 4.91563L10.6718 0.409375ZM9.25308 3.86875V12.7469L6.12496 14.3375L6.74371 10.4156C6.78121 10.1781 6.70308 9.9375 6.53433 9.76875L3.72808 6.95937L7.64996 6.33437C7.88746 6.29688 8.09058 6.14687 8.19996 5.93437L9.25621 3.86562L9.25308 3.86875ZM10.7531 12.7469V3.86875L11.8093 5.9375C11.9187 6.15 12.1218 6.3 12.3593 6.3375L16.2812 6.9625L13.475 9.77188C13.3062 9.94063 13.2281 10.1812 13.2656 10.4187L13.8843 14.3406L10.7562 12.75L10.7531 12.7469Z"
                  fill="#FCC800"
                />
              </svg>
            )}
            {Array.from({ length: emptyStars }).map((_, index) => (
              <svg
                key={index}
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0032 0C10.2844 0 10.5438 0.159375 10.6719 0.409375L12.9688 4.91563L17.9657 5.70937C18.2438 5.75312 18.4751 5.95 18.5626 6.21875C18.6501 6.4875 18.5782 6.78125 18.3813 6.98125L14.8032 10.5594L15.5938 15.5562C15.6376 15.8344 15.5219 16.1156 15.2938 16.2812C15.0657 16.4469 14.7626 16.4719 14.5126 16.3438L10.0032 14.05L5.49381 16.3438C5.24381 16.4719 4.94069 16.4469 4.71256 16.2812C4.48444 16.1156 4.36881 15.8375 4.41256 15.5562L5.20006 10.5594L1.62506 6.98125C1.42506 6.78125 1.35631 6.4875 1.44381 6.21875C1.53131 5.95 1.75944 5.75312 2.04069 5.70937L7.03756 4.91563L9.33756 0.409375C9.46569 0.159375 9.72506 0 10.0063 0H10.0032ZM10.0032 2.4L8.19694 5.9375C8.08756 6.15 7.88444 6.3 7.64694 6.3375L3.72506 6.9625L6.53131 9.77188C6.70006 9.94063 6.77819 10.1812 6.74069 10.4187L6.12194 14.3406L9.66256 12.5406C9.87506 12.4312 10.1282 12.4312 10.3438 12.5406L13.8844 14.3406L13.2657 10.4187C13.2282 10.1812 13.3063 9.94063 13.4751 9.77188L16.2813 6.9625L12.3594 6.3375C12.1219 6.3 11.9188 6.15 11.8094 5.9375L10.0032 2.4Z"
                  fill="#FCC800"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center">
            {offer ? (
              <>
                <span className="text-lg font-bold text-primary-600 whitespace-nowrap">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-sm font-medium text-gray-500 line-through ml-2 whitespace-nowrap">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {product.price} EGP
              </span>
            )}
          </div>

          <AddToCartButton
            productId={product.id}
            className="h-10 w-10 rounded-full disabled:opacity-70"
          >
            <FaPlus className="w-5 h-4" />
          </AddToCartButton>
        </div>
      </div>
    </div>
  );
}
