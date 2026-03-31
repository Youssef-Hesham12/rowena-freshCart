import Link from "next/link";
import {
  FaArrowRotateLeft,
  FaBolt,
  FaCartShopping,
  FaShareNodes,
  FaShieldHalved,
} from "react-icons/fa6";
import ProductImagesSlider from "./ProductImagesSlider";
import { ProductDetailsType } from "./product-details.type";
import QuantityAndTotalPrice from "./QuantityAndTotalPrice";
import AddToCartButton from "@/components/shared/AddToCartButton/AddToCartButton";
import AddToWishlistDetailsButton from "./AddToWishlistDetailsButton";

export default function ProductDetailsSection({ product }: ProductDetailsType) {
  let offer = 0;
  if (product.priceAfterDiscount) {
    offer = Math.round(
      ((product.price - product.priceAfterDiscount) / product.price) * 100,
    );
  }

  const fullStars = Math.floor(product?.ratingsAverage);
  const hasHalfStar = product?.ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <section className="py-6">
      <div className="container mx-auto px-4! md:px-0! lg:px-4!">
        <div className="flex flex-col md:flex-row gap-8">
          {/* product images */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">
              <ProductImagesSlider images={product?.images}/>
            </div>
          </div>
          {/* product info */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Link
                  className="bg-primary-50 font-medium text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                  href={`/categories/${product?.category._id}`}
                >
                  {product?.category.name}
                </Link>
                <span className="bg-gray-100 font-medium text-gray-700 text-xs px-3 py-1.5 rounded-full">
                  {product?.brand.name}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                {product?.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: fullStars }).map((_, index) => (
                    <svg
                      key={index}
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.26802 0.409375C9.1399 0.159375 8.88052 0 8.59927 0C8.31802 0 8.05865 0.159375 7.93052 0.409375L5.63052 4.91563L0.633649 5.70937C0.355524 5.75312 0.124274 5.95 0.0367741 6.21875C-0.0507259 6.4875 0.0211491 6.78125 0.218024 6.98125L3.79302 10.5594L3.00552 15.5562C2.96177 15.8344 3.0774 16.1156 3.30552 16.2812C3.53365 16.4469 3.83365 16.4719 4.08677 16.3438L8.59927 14.05L13.1086 16.3438C13.3586 16.4719 13.6618 16.4469 13.8899 16.2812C14.118 16.1156 14.2336 15.8375 14.1899 15.5562L13.3993 10.5594L16.9743 6.98125C17.1743 6.78125 17.243 6.4875 17.1555 6.21875C17.068 5.95 16.8399 5.75312 16.5586 5.70937L11.5649 4.91563L9.26802 0.409375Z"
                        fill="#FCC800"
                      />
                    </svg>
                  ))}
                  {hasHalfStar && (
                    <svg
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.26802 0.409375C9.1399 0.159375 8.88052 0 8.59927 0C8.31802 0 8.05865 0.159375 7.93052 0.409375L5.63052 4.91563L0.633649 5.70937C0.355524 5.75312 0.124274 5.95 0.0367741 6.21875C-0.0507259 6.4875 0.0211491 6.78125 0.218024 6.98125L3.79302 10.5594L3.00552 15.5562C2.96177 15.8344 3.0774 16.1156 3.30552 16.2812C3.53365 16.4469 3.83365 16.4719 4.08677 16.3438L8.59927 14.05L13.1086 16.3438C13.3586 16.4719 13.6618 16.4469 13.8899 16.2812C14.118 16.1156 14.2336 15.8375 14.1899 15.5562L13.3993 10.5594L16.9743 6.98125C17.1743 6.78125 17.243 6.4875 17.1555 6.21875C17.068 5.95 16.8399 5.75312 16.5586 5.70937L11.5649 4.91563L9.26802 0.409375ZM7.84927 3.86875V12.7469L4.72115 14.3375L5.3399 10.4156C5.3774 10.1781 5.29927 9.9375 5.13052 9.76875L2.32427 6.95937L6.24615 6.33437C6.48365 6.29688 6.68677 6.14687 6.79615 5.93437L7.8524 3.86562L7.84927 3.86875ZM9.34927 12.7469V3.86875L10.4055 5.9375C10.5149 6.15 10.718 6.3 10.9555 6.3375L14.8774 6.9625L12.0711 9.77188C11.9024 9.94063 11.8243 10.1812 11.8618 10.4187L12.4805 14.3406L9.3524 12.75L9.34927 12.7469Z"
                        fill="#FCC800"
                      />
                    </svg>
                  )}
                  {Array.from({ length: emptyStars }).map((_, index) => (
                    <svg
                      key={index}
                      width="18"
                      height="17"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.59669 0C8.87794 0 9.13732 0.159375 9.26544 0.409375L11.5623 4.91563L16.5592 5.70937C16.8373 5.75312 17.0686 5.95 17.1561 6.21875C17.2436 6.4875 17.1717 6.78125 16.9748 6.98125L13.3967 10.5594L14.1873 15.5562C14.2311 15.8344 14.1154 16.1156 13.8873 16.2812C13.6592 16.4469 13.3561 16.4719 13.1061 16.3438L8.59669 14.05L4.08732 16.3438C3.83732 16.4719 3.53419 16.4469 3.30607 16.2812C3.07794 16.1156 2.96232 15.8375 3.00607 15.5562L3.79357 10.5594L0.218568 6.98125C0.0185681 6.78125 -0.0501819 6.4875 0.0373181 6.21875C0.124818 5.95 0.352943 5.75312 0.634193 5.70937L5.63107 4.91563L7.93107 0.409375C8.05919 0.159375 8.31857 0 8.59982 0H8.59669ZM8.59669 2.4L6.79044 5.9375C6.68107 6.15 6.47794 6.3 6.24044 6.3375L2.31857 6.9625L5.12482 9.77188C5.29357 9.94063 5.37169 10.1812 5.33419 10.4187L4.71544 14.3406L8.25607 12.5406C8.46857 12.4312 8.72169 12.4312 8.93732 12.5406L12.4779 14.3406L11.8592 10.4187C11.8217 10.1812 11.8998 9.94063 12.0686 9.77188L14.8748 6.9625L10.9529 6.3375C10.7154 6.3 10.5123 6.15 10.4029 5.9375L8.59669 2.4Z"
                        fill="#FCC800"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {product?.ratingsAverage} ({product?.reviews.length} reviews)
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                 {offer ? product?.priceAfterDiscount : product?.price} EGP
                </span>
                {offer !== 0 && <>
                <span className="text-lg text-gray-400 line-through">{product?.price} EGP</span>
                <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">Save {offer}%</span>
                </>}
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full ${product?.quantity > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  <span className={`w-2 h-2 rounded-full ${product?.quantity > 0? "bg-green-500" : "bg-red-500"}`}></span>
                  {product?.quantity > 0? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 font-medium leading-relaxed">
                  {product?.description}
                </p>
              </div>
              <QuantityAndTotalPrice product={product} offer={offer}/>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <AddToCartButton productId={product?.id} className="flex-1 py-3.5 px-6 rounded-xl font-medium active:scale-[0.98] gap-2">
                  <FaCartShopping/> Add to Cart
                </AddToCartButton>
                <button
                  className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaBolt />
                  Buy Now
                </button>
              </div>
              <div className="flex gap-3 mb-6">
                <AddToWishlistDetailsButton productId={product._id}/>
                <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition cursor-pointer">
                  <FaShareNodes />
                </button>
              </div>
              <div className="border-t border-gray-100 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 3C2 1.89688 2.89687 1 4 1H13C14.1031 1 15 1.89688 15 3V4H16.5844C17.1156 4 17.625 4.20937 18 4.58437L19.4156 6C19.7906 6.375 20 6.88438 20 7.41563V12C20 13.1031 19.1031 14 18 14H17.8969C17.5719 15.1531 16.5094 16 15.25 16C13.9906 16 12.9312 15.1531 12.6031 14H9.39688C9.07188 15.1531 8.00937 16 6.75 16C5.49062 16 4.43125 15.1531 4.10313 14H4C2.89687 14 2 13.1031 2 12V10.5H0.75C0.334375 10.5 0 10.1656 0 9.75C0 9.33438 0.334375 9 0.75 9H4.25C4.66563 9 5 8.66563 5 8.25C5 7.83437 4.66563 7.5 4.25 7.5H0.75C0.334375 7.5 0 7.16563 0 6.75C0 6.33437 0.334375 6 0.75 6H6.25C6.66563 6 7 5.66563 7 5.25C7 4.83437 6.66563 4.5 6.25 4.5H0.75C0.334375 4.5 0 4.16563 0 3.75C0 3.33437 0.334375 3 0.75 3H2ZM18 9V7.41563L16.5844 6H15V9H18ZM8 13.25C8 12.9185 7.8683 12.6005 7.63388 12.3661C7.39946 12.1317 7.08152 12 6.75 12C6.41848 12 6.10054 12.1317 5.86612 12.3661C5.6317 12.6005 5.5 12.9185 5.5 13.25C5.5 13.5815 5.6317 13.8995 5.86612 14.1339C6.10054 14.3683 6.41848 14.5 6.75 14.5C7.08152 14.5 7.39946 14.3683 7.63388 14.1339C7.8683 13.8995 8 13.5815 8 13.25ZM15.25 14.5C15.5815 14.5 15.8995 14.3683 16.1339 14.1339C16.3683 13.8995 16.5 13.5815 16.5 13.25C16.5 12.9185 16.3683 12.6005 16.1339 12.3661C15.8995 12.1317 15.5815 12 15.25 12C14.9185 12 14.6005 12.1317 14.3661 12.3661C14.1317 12.6005 14 12.9185 14 13.25C14 13.5815 14.1317 13.8995 14.3661 14.1339C14.6005 14.3683 14.9185 14.5 15.25 14.5Z"
                          fill="#16A34A"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Free Delivery
                      </h4>
                      <p className="text-xs font-medium text-gray-500">
                        Orders over $50
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                      <FaArrowRotateLeft className="w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        30 Days Return
                      </h4>
                      <p className="text-xs font-medium text-gray-500">
                        Money back
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                      <FaShieldHalved />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">
                        Secure Payment
                      </h4>
                      <p className="text-xs font-medium text-gray-500">
                        100% Protected
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
