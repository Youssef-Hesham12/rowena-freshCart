"use client";
import { useState } from "react";
import { ProductDetailsType } from "../ProductDetailsSection/product-details.type";
import {
  keyFeaturesArr,
  shippingAndReturns,
} from "./product-details-tabs.data";
import { FaShieldHalved, FaStar } from "react-icons/fa6";

export default function ProductDetailsTabsSection({
  product,
}: ProductDetailsType) {
  const [activeTab, setActiveTab] = useState("product-details");
  const fullStars = Math.floor(product.ratingsAverage);
  const hasHalfStar = product.ratingsAverage % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const reviews = product.reviews || [];

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((review) => review.rating === star).length;
    const percentage = reviews.length
      ? Math.round((count / reviews.length) * 100)
      : 0;

    return {
      star,
      count,
      percentage,
    };
  });

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4!">
        <div className="bg-white rounded-[8px] shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab("product-details")}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === "product-details" ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50" : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"} cursor-pointer`}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1008 3.0625L9.16289 1.75H3.08984L2.15195 3.0625H10.1008ZM0 3.62305C0 3.25938 0.114844 2.90391 0.325391 2.60586L1.66523 0.732812C1.99336 0.273438 2.52383 0 3.08711 0H9.16016C9.72617 0 10.2566 0.273438 10.5848 0.732812L11.9219 2.60586C12.1352 2.90391 12.2473 3.25938 12.2473 3.62305L12.25 10.9375C12.25 11.9027 11.4652 12.6875 10.5 12.6875H1.75C0.784766 12.6875 0 11.9027 0 10.9375V3.62305Z"
                    fill="currentColor"
                  />
                </svg>
                Product Details
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === "reviews" ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50" : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"} cursor-pointer`}
              >
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.10952 0.358203C7.99741 0.139453 7.77046 0 7.52437 0C7.27827 0 7.05132 0.139453 6.93921 0.358203L4.92671 4.30117L0.554443 4.9957C0.311084 5.03398 0.10874 5.20625 0.0321773 5.44141C-0.0443852 5.67656 0.0185054 5.93359 0.190771 6.10859L3.3189 9.23945L2.62983 13.6117C2.59155 13.8551 2.69272 14.1012 2.89233 14.2461C3.09194 14.391 3.35444 14.4129 3.57593 14.3008L7.52437 12.2937L11.4701 14.3008C11.6888 14.4129 11.9541 14.391 12.1537 14.2461C12.3533 14.1012 12.4544 13.8578 12.4162 13.6117L11.7244 9.23945L14.8525 6.10859C15.0275 5.93359 15.0876 5.67656 15.0111 5.44141C14.9345 5.20625 14.7349 5.03398 14.4888 4.9957L10.1193 4.30117L8.10952 0.358203Z"
                    fill="currentColor"
                  />
                </svg>
                Reviews (12)
              </button>
              <button
                onClick={() => setActiveTab("shipping-returns")}
                className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === "shipping-returns" ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50/50" : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"} cursor-pointer`}
              >
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 1.75C0 0.784766 0.784766 0 1.75 0H9.625C10.5902 0 11.375 0.784766 11.375 1.75V2.625H12.7613C13.2262 2.625 13.6719 2.8082 14 3.13633L15.2387 4.375C15.5668 4.70312 15.75 5.14883 15.75 5.61367V9.625C15.75 10.5902 14.9652 11.375 14 11.375H13.9098C13.6254 12.384 12.6957 13.125 11.5938 13.125C10.4918 13.125 9.56484 12.384 9.27773 11.375H6.47227C6.18789 12.384 5.2582 13.125 4.15625 13.125C3.0543 13.125 2.12734 12.384 1.84023 11.375H1.75C0.784766 11.375 0 10.5902 0 9.625V1.75ZM14 7V5.61367L12.7613 4.375H11.375V7H14ZM5.25 10.7188C5.25 10.4287 5.13477 10.1505 4.92965 9.94535C4.72453 9.74023 4.44633 9.625 4.15625 9.625C3.86617 9.625 3.58797 9.74023 3.38285 9.94535C3.17773 10.1505 3.0625 10.4287 3.0625 10.7188C3.0625 11.0088 3.17773 11.287 3.38285 11.4921C3.58797 11.6973 3.86617 11.8125 4.15625 11.8125C4.44633 11.8125 4.72453 11.6973 4.92965 11.4921C5.13477 11.287 5.25 11.0088 5.25 10.7188ZM11.5938 11.8125C11.8838 11.8125 12.162 11.6973 12.3671 11.4921C12.5723 11.287 12.6875 11.0088 12.6875 10.7188C12.6875 10.4287 12.5723 10.1505 12.3671 9.94535C12.162 9.74023 11.8838 9.625 11.5938 9.625C11.3037 9.625 11.0255 9.74023 10.8204 9.94535C10.6152 10.1505 10.5 10.4287 10.5 10.7188C10.5 11.0088 10.6152 11.287 10.8204 11.4921C11.0255 11.6973 11.3037 11.8125 11.5938 11.8125Z"
                    fill="currentColor"
                  />
                </svg>
                Shipping &amp; Returns
              </button>
            </div>
          </div>
          <div className="p-6">
            <div
              className={`space-y-6 ${activeTab === "product-details" ? "block" : "hidden"}`}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  About this Product
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Product Information
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">
                        Category
                      </span>
                      <span className="text-gray-900 font-medium">
                        {product.category.name}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">
                        Subcategory
                      </span>
                      <span className="text-gray-900 font-medium">
                        {product.subcategory[0].name}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Brand</span>
                      <span className="text-gray-900 font-medium">
                        {product.brand.name}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">
                        Items Sold
                      </span>
                      <span className="text-gray-900 font-medium">
                        {product.sold}+ sold
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {keyFeaturesArr.map((keyFeature) => (
                      <li
                        key={keyFeature}
                        className="flex items-center text-sm font-medium text-gray-600"
                      >
                        <svg
                          width="26"
                          height="14"
                          viewBox="0 0 26 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.5141 1.91682C14.9051 2.20119 14.9926 2.74807 14.7083 3.13908L7.70825 12.7641C7.55786 12.9719 7.32544 13.1004 7.06841 13.1223C6.81138 13.1442 6.56255 13.0485 6.38208 12.868L2.88208 9.36799C2.54028 9.02619 2.54028 8.47111 2.88208 8.12932C3.22388 7.78752 3.77896 7.78752 4.12075 8.12932L6.89614 10.9047L13.2946 2.10822C13.579 1.71721 14.1258 1.62971 14.5168 1.91408L14.5141 1.91682Z"
                            fill="#16A34A"
                          />
                        </svg>

                        {keyFeature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={`space-y-6 ${activeTab === "reviews" ? "block" : "hidden"}`}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2.5">
                    {product.ratingsAverage}
                  </div>
                  <div className="text-yellow-400 flex justify-center gap-0.5 mb-3.5">
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
                  <p className="text-sm font-medium text-gray-500 mt-2">
                    Based on {product.ratingsQuantity} reviews
                  </p>
                </div>
                <div className="flex-1 w-full">
                  {ratingDistribution.map((item) => (
                    <div
                      key={item.star}
                      className="flex items-center gap-3 mb-2"
                    >
                      <span className="text-sm font-medium text-gray-600 w-8">
                        {item.star} star
                      </span>

                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>

                      <span className="text-sm font-medium text-gray-500 w-10">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <FaStar className="w-11.25 h-9 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">
                    Customer reviews will be displayed here.
                  </p>
                  <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`space-y-6 ${activeTab === "shipping-returns" ? "block" : "hidden"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shippingAndReturns.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="bg-linear-to-br from-primary-50 to-primary-100 rounded-lg p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 bg-primary-600 text-white rounded-full flex items-center justify-center">
                          <Icon className="w-6.25 h-5" />
                        </div>
                        <h4 className="font-semibold text-gray-900">
                          {item.title}
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {item.list.map((i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <svg
                              width="18"
                              height="14"
                              viewBox="0 0 18 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.5141 1.91682C14.9051 2.20119 14.9926 2.74807 14.7083 3.13908L7.70825 12.7641C7.55786 12.9719 7.32544 13.1004 7.06841 13.1223C6.81138 13.1442 6.56255 13.0485 6.38208 12.868L2.88208 9.36799C2.54028 9.02619 2.54028 8.47111 2.88208 8.12932C3.22388 7.78752 3.77896 7.78752 4.12075 8.12932L6.89614 10.9047L13.2946 2.10822C13.579 1.71721 14.1258 1.62971 14.5168 1.91408L14.5141 1.91682Z"
                                fill="#16A34A"
                              />
                            </svg>

                            <span className="font-medium">{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
              <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                  <FaShieldHalved className="text-2xl"/>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="text-sm font-medium text-gray-600">
                    Get a full refund if your order doesn&apos;t arrive or isn&apos;t as
                    described. We ensure your shopping experience is safe and
                    secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
