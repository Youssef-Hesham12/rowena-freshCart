import { getUserCart } from "@/actions/cart.actions";
import ClearProductButton from "@/components/Cart/ClearProductButton/ClearProductButton";
import ProductCardInCart from "@/components/Cart/ProductCardInCart/ProductCardInCart";
import { CartType } from "@/types/cart.types";
import Link from "next/link";

export default async function Cart() {
  const cartItems: CartType = await getUserCart();
  const isEmpty = cartItems.numOfCartItems === 0;

  return !isEmpty ? (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4!">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4">
            <Link className="hover:text-primary-600 transition" href="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-primary-600 to-primary-700 text-white w-12 h-12 rounded-[12px] flex items-center justify-center">
                  <svg
                    width="34"
                    height="31"
                    viewBox="0 0 34 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.40625 0C0.626953 0 0 0.626953 0 1.40625C0 2.18555 0.626953 2.8125 1.40625 2.8125H4.06055C4.28906 2.8125 4.48242 2.97656 4.52344 3.19922L7.57617 19.9746C7.93945 21.9785 9.68555 23.4375 11.7246 23.4375H26.7188C27.498 23.4375 28.125 22.8105 28.125 22.0312C28.125 21.252 27.498 20.625 26.7188 20.625H11.7246C11.0449 20.625 10.4648 20.1387 10.3418 19.4707L10.043 17.8125H27.832C29.6367 17.8125 31.1836 16.5293 31.5176 14.7539L33.334 5.0332C33.5508 3.87891 32.666 2.8125 31.4883 2.8125H7.30664L7.2832 2.69531C7.00195 1.13672 5.64258 0 4.05469 0H1.40625ZM12.1875 30.9375C12.9334 30.9375 13.6488 30.6412 14.1762 30.1137C14.7037 29.5863 15 28.8709 15 28.125C15 27.3791 14.7037 26.6637 14.1762 26.1363C13.6488 25.6088 12.9334 25.3125 12.1875 25.3125C11.4416 25.3125 10.7262 25.6088 10.1988 26.1363C9.67132 26.6637 9.375 27.3791 9.375 28.125C9.375 28.8709 9.67132 29.5863 10.1988 30.1137C10.7262 30.6412 11.4416 30.9375 12.1875 30.9375ZM25.3125 30.9375C26.0584 30.9375 26.7738 30.6412 27.3012 30.1137C27.8287 29.5863 28.125 28.8709 28.125 28.125C28.125 27.3791 27.8287 26.6637 27.3012 26.1363C26.7738 25.6088 26.0584 25.3125 25.3125 25.3125C24.5666 25.3125 23.8512 25.6088 23.3238 26.1363C22.7963 26.6637 22.5 27.3791 22.5 28.125C22.5 28.8709 22.7963 29.5863 23.3238 30.1137C23.8512 30.6412 24.5666 30.9375 25.3125 30.9375Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 font-medium mt-2">
                You have{" "}
                <span className="font-semibold text-primary-600">
                  {cartItems.numOfCartItems} items
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems?.data?.products?.map((product) => (
                <ProductCardInCart
                  key={product.product._id}
                  product={product}
                />
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
                href="/"
              >
                <span>←</span> Continue Shopping
              </Link>
              <ClearProductButton />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[16px] border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
              <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg
                    width="23"
                    height="20"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 3.9375C9 2.69648 10.009 1.6875 11.25 1.6875C12.491 1.6875 13.5 2.69648 13.5 3.9375V5.625H9V3.9375ZM7.3125 5.625H5.0625C4.13086 5.625 3.375 6.38086 3.375 7.3125V14.625C3.375 16.4883 4.88672 18 6.75 18H15.75C17.6133 18 19.125 16.4883 19.125 14.625V7.3125C19.125 6.38086 18.3691 5.625 17.4375 5.625H15.1875V3.9375C15.1875 1.76133 13.4262 0 11.25 0C9.07383 0 7.3125 1.76133 7.3125 3.9375V5.625ZM8.15625 7.3125C8.26705 7.3125 8.37677 7.33432 8.47914 7.37673C8.58151 7.41913 8.67452 7.48128 8.75287 7.55963C8.83122 7.63798 8.89337 7.73099 8.93577 7.83336C8.97818 7.93573 9 8.04545 9 8.15625C9 8.26705 8.97818 8.37677 8.93577 8.47914C8.89337 8.58151 8.83122 8.67452 8.75287 8.75287C8.67452 8.83122 8.58151 8.89337 8.47914 8.93577C8.37677 8.97818 8.26705 9 8.15625 9C8.04545 9 7.93573 8.97818 7.83336 8.93577C7.73099 8.89337 7.63798 8.83122 7.55963 8.75287C7.48128 8.67452 7.41913 8.58151 7.37673 8.47914C7.33432 8.37677 7.3125 8.26705 7.3125 8.15625C7.3125 8.04545 7.33432 7.93573 7.37673 7.83336C7.41913 7.73099 7.48128 7.63798 7.55963 7.55963C7.63798 7.48128 7.73099 7.41913 7.83336 7.37673C7.93573 7.33432 8.04545 7.3125 8.15625 7.3125ZM13.5 8.15625C13.5 7.93247 13.5889 7.71786 13.7471 7.55963C13.9054 7.40139 14.12 7.3125 14.3438 7.3125C14.5675 7.3125 14.7821 7.40139 14.9404 7.55963C15.0986 7.71786 15.1875 7.93247 15.1875 8.15625C15.1875 8.38003 15.0986 8.59464 14.9404 8.75287C14.7821 8.91111 14.5675 9 14.3438 9C14.12 9 13.9054 8.91111 13.7471 8.75287C13.5889 8.59464 13.5 8.38003 13.5 8.15625Z"
                      fill="currentColor"
                    />
                  </svg>
                  Order Summary
                </h2>
                <p className="text-primary-100 text-sm font-medium mt-1">
                  {cartItems.numOfCartItems} items in your cart
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3C1 1.89688 1.89688 1 3 1H12C13.1031 1 14 1.89688 14 3V4H15.5844C16.1156 4 16.625 4.20937 17 4.58437L18.4156 6C18.7906 6.375 19 6.88438 19 7.41563V12C19 13.1031 18.1031 14 17 14H16.8969C16.5719 15.1531 15.5094 16 14.25 16C12.9906 16 11.9312 15.1531 11.6031 14H8.39687C8.07188 15.1531 7.00938 16 5.75 16C4.49062 16 3.43125 15.1531 3.10313 14H3C1.89688 14 1 13.1031 1 12V3ZM17 9V7.41563L15.5844 6H14V9H17ZM7 13.25C7 12.9185 6.8683 12.6005 6.63388 12.3661C6.39946 12.1317 6.08152 12 5.75 12C5.41848 12 5.10054 12.1317 4.86612 12.3661C4.6317 12.6005 4.5 12.9185 4.5 13.25C4.5 13.5815 4.6317 13.8995 4.86612 14.1339C5.10054 14.3683 5.41848 14.5 5.75 14.5C6.08152 14.5 6.39946 14.3683 6.63388 14.1339C6.8683 13.8995 7 13.5815 7 13.25ZM14.25 14.5C14.5815 14.5 14.8995 14.3683 15.1339 14.1339C15.3683 13.8995 15.5 13.5815 15.5 13.25C15.5 12.9185 15.3683 12.6005 15.1339 12.3661C14.8995 12.1317 14.5815 12 14.25 12C13.9185 12 13.6005 12.1317 13.3661 12.3661C13.1317 12.6005 13 12.9185 13 13.25C13 13.5815 13.1317 13.8995 13.3661 14.1339C13.6005 14.3683 13.9185 14.5 14.25 14.5Z"
                        fill="#00A63E"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">
                      Free Shipping!
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900">
                      {cartItems?.data?.totalCartPrice?.toLocaleString()} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 font-medium">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {cartItems?.data?.totalCartPrice?.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all cursor-pointer">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.01562 3V7.67188C3.01562 8.20312 3.225 8.7125 3.6 9.0875L9.6 15.0875C10.3812 15.8687 11.6469 15.8687 12.4281 15.0875L17.1 10.4156C17.8813 9.63437 17.8813 8.36875 17.1 7.5875L11.1 1.5875C10.725 1.20937 10.2188 1 9.6875 1H5.01562C3.9125 1 3.01562 1.89688 3.01562 3ZM6.51562 3.5C6.78084 3.5 7.0352 3.60536 7.22273 3.79289C7.41027 3.98043 7.51562 4.23478 7.51562 4.5C7.51562 4.76522 7.41027 5.01957 7.22273 5.20711C7.0352 5.39464 6.78084 5.5 6.51562 5.5C6.25041 5.5 5.99605 5.39464 5.80852 5.20711C5.62098 5.01957 5.51562 4.76522 5.51562 4.5C5.51562 4.23478 5.62098 3.98043 5.80852 3.79289C5.99605 3.60536 6.25041 3.5 6.51562 3.5Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span className="text-sm font-medium">Apply Promo Code</span>
                </button>
                <Link
                  className="w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                  href={`/checkout?id=${cartItems.cartId}`}
                >
                  <svg
                    width="20"
                    height="17"
                    viewBox="0 0 20 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 4V6H12V4C12 2.89687 11.1031 2 10 2C8.89687 2 8 2.89687 8 4ZM6 6V4C6 1.79063 7.79063 0 10 0C12.2094 0 14 1.79063 14 4V6C15.1031 6 16 6.89687 16 8V15C16 16.1031 15.1031 17 14 17H6C4.89688 17 4 16.1031 4 15V8C4 6.89687 4.89688 6 6 6Z"
                      fill="currentColor"
                    />
                  </svg>

                  <span>Secure Checkout</span>
                </Link>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49962 0C7.60743 0 7.71524 0.0234375 7.81368 0.0679688L12.2293 1.94063C12.7449 2.15859 13.1293 2.66719 13.127 3.28125C13.1152 5.60625 12.159 9.86016 8.12071 11.7938C7.72931 11.9813 7.27462 11.9813 6.88321 11.7938C2.84259 9.86016 1.88868 5.60625 1.87696 3.28125C1.87462 2.66719 2.259 2.15859 2.77462 1.94063L7.1879 0.0679688C7.28634 0.0234375 7.39181 0 7.49962 0ZM7.49962 1.56563V10.4273C10.734 8.86172 11.6035 5.39297 11.6246 3.31641L7.49962 1.56797V1.56563Z"
                        fill="#00C950"
                      />
                    </svg>

                    <span>Secure Payment</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200"></div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.75 2.25C0.75 1.42266 1.42266 0.75 2.25 0.75H9C9.82734 0.75 10.5 1.42266 10.5 2.25V3H11.6883C12.0867 3 12.4688 3.15703 12.75 3.43828L13.8117 4.5C14.093 4.78125 14.25 5.16328 14.25 5.56172V9C14.25 9.82734 13.5773 10.5 12.75 10.5H12.6727C12.4289 11.3648 11.632 12 10.6875 12C9.74297 12 8.94844 11.3648 8.70234 10.5H6.29766C6.05391 11.3648 5.25703 12 4.3125 12C3.36797 12 2.57344 11.3648 2.32734 10.5H2.25C1.42266 10.5 0.75 9.82734 0.75 9V2.25ZM12.75 6.75V5.56172L11.6883 4.5H10.5V6.75H12.75ZM5.25 9.9375C5.25 9.68886 5.15123 9.4504 4.97541 9.27459C4.7996 9.09877 4.56114 9 4.3125 9C4.06386 9 3.8254 9.09877 3.64959 9.27459C3.47377 9.4504 3.375 9.68886 3.375 9.9375C3.375 10.1861 3.47377 10.4246 3.64959 10.6004C3.8254 10.7762 4.06386 10.875 4.3125 10.875C4.56114 10.875 4.7996 10.7762 4.97541 10.6004C5.15123 10.4246 5.25 10.1861 5.25 9.9375ZM10.6875 10.875C10.9361 10.875 11.1746 10.7762 11.3504 10.6004C11.5262 10.4246 11.625 10.1861 11.625 9.9375C11.625 9.68886 11.5262 9.4504 11.3504 9.27459C11.1746 9.09877 10.9361 9 10.6875 9C10.4389 9 10.2004 9.09877 10.0246 9.27459C9.84877 9.4504 9.75 9.68886 9.75 9.9375C9.75 10.1861 9.84877 10.4246 10.0246 10.6004C10.2004 10.7762 10.4389 10.875 10.6875 10.875Z"
                        fill="#2B7FFF"
                      />
                    </svg>
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <Link
                  className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium py-2"
                  href="/"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
            <svg
              data-prefix="fas"
              data-icon="box-open"
              className="svg-inline--fa fa-box-open w-15 h-12 text-gray-300"
              role="img"
              viewBox="0 0 640 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
              ></path>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 font-medium mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet. <br />{" "}
          Start exploring our products!
        </p>
        <Link
          className="inline-flex items-center gap-2 bg-primary-600 text-white py-3.5 px-8 rounded-[12px] font-semibold hover:bg-primary-700 transition-all shadow-lg active:scale-[0.98]"
          href="/"
        >
          Start Shopping
          <svg
            data-prefix="fas"
            data-icon="arrow-right"
            className="svg-inline--fa fa-arrow-right w-[17.5px] h-3.5"
            role="img"
            viewBox="0 0 512 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
