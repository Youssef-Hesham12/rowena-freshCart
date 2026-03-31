"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGift, FaPhoneAlt, FaRegEnvelope, FaTruck } from "react-icons/fa";
import {
  FaChevronDown,
  FaMagnifyingGlass,
  FaRegCircleUser,
  FaUserPlus,
} from "react-icons/fa6";
import { BiUser } from "react-icons/bi";
import { FaBars } from "react-icons/fa6";
import Modal from "./Modal";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/hook/useCart";
import { getUserCart } from "@/actions/cart.actions";
import { getUserWishlist } from "@/actions/wishlist.actions";
import { useWishlist } from "@/hook/useWishlist";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountOpen, setisAccountOpen] = useState(false);
  const { data: sessionData, status } = useSession();

  const { numOfCartItems, updateCart } = useCart();
  const {numOfWishlistItems,updateWishlist} = useWishlist()

  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      accountRef.current &&
      !accountRef.current.contains(event.target as Node)
    ) {
      setisAccountOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  function logoutHandler() {
    signOut({ callbackUrl: "/" });
  }

  useEffect(() => {
    getUserCart().then((res) => {
      if (res?.numOfCartItems > 0) {
        updateCart(res.data.products,res.numOfCartItems);
      } else {
        updateCart([],0);
      }
    });
    getUserWishlist().then((res) => {
      if (res?.data?.length > 0) {
        updateWishlist(res.data);
      } else {
        updateWishlist([]);
      }
    });
  }, []);

  return (
    <>
      <div className="hidden lg:block text-sm border-b border-gray-100">
        <div className="container mx-auto px-4!">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-gray-500">
              <span className="flex items-center gap-2 font-medium">
                <FaTruck className="text-primary-600 text-xs w-3.75 h-3" />
                <span>Free Shipping on Orders 500 EGP</span>
              </span>
              <span className="flex items-center gap-2 font-medium">
                <FaGift className="text-primary-600 text-xs w-3.75 h-3" />
                <span>New Arrivals Daily</span>
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 text-gray-500">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-1.5 font-medium hover:text-primary-600 transition-colors"
                >
                  <FaPhoneAlt className="text-xs w-3.75 h-3" />
                  <span>+1 (800) 123-4567</span>
                </a>
                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-1.5 font-medium hover:text-primary-600 transition-colors"
                >
                  <FaRegEnvelope className="text-xs w-3.75 h-3" />
                  <span>support@freshcart.com</span>
                </a>
              </div>
              <span className="w-px h-4 bg-gray-200"></span>
              <div className="flex items-center gap-4">
                {status === "unauthenticated" ? (
                  <>
                    <Link
                      className="flex items-center gap-1.5 font-medium text-gray-600 hover:text-primary-600 transition-colors"
                      href="/login"
                    >
                      <BiUser className="text-sm" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      className="flex items-center gap-1.5 font-medium text-gray-600 hover:text-primary-600 transition-colors"
                      href="/register"
                    >
                      <FaUserPlus className="w-3.75 h-3" />
                      <span>Sign Up</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                      href="/profile"
                    >
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.625 3C5.625 2.50272 5.82254 2.02581 6.17417 1.67417C6.52581 1.32254 7.00272 1.125 7.5 1.125C7.99728 1.125 8.47419 1.32254 8.82583 1.67417C9.17746 2.02581 9.375 2.50272 9.375 3C9.375 3.49728 9.17746 3.97419 8.82583 4.32583C8.47419 4.67746 7.99728 4.875 7.5 4.875C7.00272 4.875 6.52581 4.67746 6.17417 4.32583C5.82254 3.97419 5.625 3.49728 5.625 3ZM10.5 3C10.5 2.20435 10.1839 1.44129 9.62132 0.87868C9.05871 0.316071 8.29565 0 7.5 0C6.70435 0 5.94129 0.316071 5.37868 0.87868C4.81607 1.44129 4.5 2.20435 4.5 3C4.5 3.79565 4.81607 4.55871 5.37868 5.12132C5.94129 5.68393 6.70435 6 7.5 6C8.29565 6 9.05871 5.68393 9.62132 5.12132C10.1839 4.55871 10.5 3.79565 10.5 3ZM3.375 11.25C3.375 9.59297 4.71797 8.25 6.375 8.25H8.625C10.282 8.25 11.625 9.59297 11.625 11.25V11.4375C11.625 11.7492 11.8758 12 12.1875 12C12.4992 12 12.75 11.7492 12.75 11.4375V11.25C12.75 8.97188 10.9031 7.125 8.625 7.125H6.375C4.09688 7.125 2.25 8.97188 2.25 11.25V11.4375C2.25 11.7492 2.50078 12 2.8125 12C3.12422 12 3.375 11.7492 3.375 11.4375V11.25Z"
                          fill="currentColor"
                        />
                      </svg>

                      <span className="font-medium">
                        {sessionData?.user?.name.split(" ")[0]}
                      </span>
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3359 6.39844C13.5562 6.17812 13.5562 5.82188 13.3359 5.60391L9.96094 2.22656C9.79922 2.06484 9.55781 2.01797 9.34687 2.10469C9.13594 2.19141 9 2.39766 9 2.625V4.5H6.375C5.75391 4.5 5.25 5.00391 5.25 5.625V6.375C5.25 6.99609 5.75391 7.5 6.375 7.5H9V9.375C9 9.60234 9.13594 9.80859 9.34687 9.89531C9.55781 9.98203 9.79922 9.93516 9.96094 9.77344L13.3359 6.39844ZM5.25 2.25C5.66484 2.25 6 1.91484 6 1.5C6 1.08516 5.66484 0.75 5.25 0.75H3.75C2.50781 0.75 1.5 1.75781 1.5 3V9C1.5 10.2422 2.50781 11.25 3.75 11.25H5.25C5.66484 11.25 6 10.9148 6 10.5C6 10.0852 5.66484 9.75 5.25 9.75H3.75C3.33516 9.75 3 9.41484 3 9V3C3 2.58516 3.33516 2.25 3.75 2.25H5.25Z"
                          fill="currentColor"
                        />
                      </svg>

                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="bg-white">
          <div className="container mx-auto px-4!">
            <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
              <Link className="shrink-0" href="/">
                <Image
                  alt="FreshCart"
                  width="160"
                  height="31"
                  className="h-6 lg:h-8 w-auto"
                  src="/images/freshcart-logo.49f1b44d.svg"
                />
              </Link>
              <form onSubmit={(e)=> {
                e.preventDefault();

                if(!searchValue.trim()) return
                router.push(`/search?q=${searchValue}`)

              }} className="hidden lg:flex flex-1 max-w-2xl">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search for products, brands and more..."
                    className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer"
                  >
                    <FaMagnifyingGlass className="text-sm" />
                  </button>
                </div>
              </form>
              <nav className="hidden xl:flex items-center gap-6">
                <Link
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  href="/products"
                >
                  Shop
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-1.5 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2 cursor-pointer">
                    Categories
                    <FaChevronDown className="text-[10px] transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/categories"
                      >
                        All Categories
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d2d167d9aa4ca970649f"
                      >
                        Electronics
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d58a0049ad0b52b9003f"
                      >
                        Women&apos;s Fashion
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d5b90049ad0b52b90048"
                      >
                        Men&apos;s Fashion
                      </Link>
                      <Link
                        className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                        href="/products?category=6439d30b67d9aa4ca97064b1"
                      >
                        Beauty &amp; Health
                      </Link>
                    </div>
                  </div>
                </div>
                <Link
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  href="/brands"
                >
                  Brands
                </Link>
              </nav>
              <div className="flex items-center gap-1 lg:gap-2">
                <Link
                  className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
                  href="/contact"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2C7.53125 2 5.47813 3.79062 5.07188 6.14687C5.3625 6.05312 5.675 6 6 6H6.5C7.32812 6 8 6.67188 8 7.5V10.5C8 11.3281 7.32812 12 6.5 12H6C4.34375 12 3 10.6562 3 9V7C3 3.13438 6.13438 0 10 0C13.8656 0 17 3.13438 17 7V12.2531C17 14.325 15.3188 16.0031 13.2469 16.0031L10.5 16H9.5C8.67188 16 8 15.3281 8 14.5C8 13.6719 8.67188 13 9.5 13H10.5C11.3281 13 12 13.6719 12 14.5H13.25C14.4937 14.5 15.5 13.4937 15.5 12.25V11.5969C15.0594 11.8531 14.5469 11.9969 14 11.9969H13.5C12.6719 11.9969 12 11.325 12 10.4969V7.49687C12 6.66875 12.6719 5.99687 13.5 5.99687H14C14.325 5.99687 14.6344 6.04688 14.9281 6.14375C14.5219 3.79063 12.4719 1.99688 10 1.99688V2Z"
                        fill="#16A34A"
                      />
                    </svg>
                  </div>
                  <div className="text-xs">
                    <div className="text-gray-400 font-medium">Support</div>
                    <div className="font-semibold text-gray-700">24/7 Help</div>
                  </div>
                </Link>
                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Wishlist"
                  href="/wishlist"
                >
                  <svg
                    width="25"
                    height="20"
                    className="text-gray-500 group-hover:text-primary-600 transition-colors"
                    viewBox="0 0 25 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.3008 3.125C16.2344 3.125 15.2305 3.63672 14.6055 4.5L13.2617 6.35938C13.0859 6.60156 12.8047 6.74609 12.5039 6.74609C12.2031 6.74609 11.9219 6.60156 11.7461 6.35938L10.4023 4.5C9.77734 3.63672 8.77344 3.125 7.70703 3.125C5.87109 3.125 4.38281 4.61328 4.38281 6.44922C4.38281 8.39844 5.63281 10.293 7.04297 12.0078C8.64844 13.9609 10.6133 15.6797 11.9609 16.707C12.0859 16.8008 12.2695 16.8711 12.5078 16.8711C12.7461 16.8711 12.9297 16.8008 13.0547 16.707C14.4023 15.6797 16.3672 13.957 17.9727 12.0078C19.3867 10.293 20.6328 8.39844 20.6328 6.44922C20.6328 4.61328 19.1445 3.125 17.3086 3.125H17.3008ZM13.0859 3.40234C14.0625 2.05078 15.6328 1.25 17.3008 1.25C20.1719 1.25 22.5 3.57813 22.5 6.44922C22.5 9.12891 20.8242 11.4844 19.4102 13.1992C17.6875 15.293 15.6094 17.1094 14.1836 18.1953C13.7031 18.5625 13.1094 18.7461 12.5 18.7461C11.8906 18.7461 11.2969 18.5625 10.8164 18.1953C9.39062 17.1094 7.3125 15.293 5.58984 13.2031C4.17578 11.4883 2.5 9.12891 2.5 6.44922C2.5 3.57813 4.82813 1.25 7.69922 1.25C9.36719 1.25 10.9375 2.05078 11.9141 3.40234L12.5 4.21094L13.0859 3.40234Z"
                      fill="currentColor"
                    />
                  </svg>
                  {numOfWishlistItems > 0 && status !== "unauthenticated" && (
                    <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {numOfWishlistItems}
                  </span>
                  )}
                  
                </Link>
                <Link
                  className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
                  title="Cart"
                  href="/cart"
                >
                  <svg
                    width="25"
                    height="21"
                    className="text-gray-500 group-hover:text-primary-600 transition-colors"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.9375 0C0.417969 0 0 0.417969 0 0.9375C0 1.45703 0.417969 1.875 0.9375 1.875H2.70703C2.85938 1.875 2.98828 1.98438 3.01562 2.13281L5.05078 13.3164C5.29297 14.6523 6.45703 15.625 7.81641 15.625H17.8125C18.332 15.625 18.75 15.207 18.75 14.6875C18.75 14.168 18.332 13.75 17.8125 13.75H7.81641C7.36328 13.75 6.97656 13.4258 6.89453 12.9805L6.69531 11.875H18.5547C19.7578 11.875 20.7891 11.0195 21.0117 9.83594L22.2227 3.35547C22.3672 2.58594 21.7773 1.875 20.9922 1.875H4.87109L4.85547 1.79688C4.66797 0.757812 3.76172 0 2.70312 0H0.9375ZM8.125 20.625C8.62228 20.625 9.09919 20.4275 9.45083 20.0758C9.80246 19.7242 10 19.2473 10 18.75C10 18.2527 9.80246 17.7758 9.45083 17.4242C9.09919 17.0725 8.62228 16.875 8.125 16.875C7.62772 16.875 7.15081 17.0725 6.79917 17.4242C6.44754 17.7758 6.25 18.2527 6.25 18.75C6.25 19.2473 6.44754 19.7242 6.79917 20.0758C7.15081 20.4275 7.62772 20.625 8.125 20.625ZM16.875 20.625C17.3723 20.625 17.8492 20.4275 18.2008 20.0758C18.5525 19.7242 18.75 19.2473 18.75 18.75C18.75 18.2527 18.5525 17.7758 18.2008 17.4242C17.8492 17.0725 17.3723 16.875 16.875 16.875C16.3777 16.875 15.9008 17.0725 15.5492 17.4242C15.1975 17.7758 15 18.2527 15 18.75C15 19.2473 15.1975 19.7242 15.5492 20.0758C15.9008 20.4275 16.3777 20.625 16.875 20.625Z"
                      fill="currentColor"
                    />
                  </svg>
                  {numOfCartItems > 0 && status !== "unauthenticated" && (
                    <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
                {status === "unauthenticated" ? (
                  <Link
                    className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
                    href="/login"
                  >
                    <BiUser className="text-sm" />
                    Sign In
                  </Link>
                ) : (
                  <div ref={accountRef} className="hidden lg:block relative">
                    <button
                      onClick={() => setisAccountOpen(!isAccountOpen)}
                      className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group cursor-pointer"
                      title="Account"
                    >
                      <FaRegCircleUser className="w-6.25 h-5 text-gray-500 group-hover:text-primary-600 transition-colors" />
                    </button>
                    <div
                      className={`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-[16px] shadow-xl transition-all duration-200 origin-top-right ${isAccountOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}
                    >
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <FaRegCircleUser className="w-6.25 h-5 text-primary-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {sessionData?.user?.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {sessionData?.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          href="/profile"
                          onClick={() => setisAccountOpen(false)}
                        >
                          <svg
                            width="17.5"
                            height="14"
                            className="text-gray-400"
                            viewBox="0 0 15 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.625 3C5.625 2.50272 5.82254 2.02581 6.17417 1.67417C6.52581 1.32254 7.00272 1.125 7.5 1.125C7.99728 1.125 8.47419 1.32254 8.82583 1.67417C9.17746 2.02581 9.375 2.50272 9.375 3C9.375 3.49728 9.17746 3.97419 8.82583 4.32583C8.47419 4.67746 7.99728 4.875 7.5 4.875C7.00272 4.875 6.52581 4.67746 6.17417 4.32583C5.82254 3.97419 5.625 3.49728 5.625 3ZM10.5 3C10.5 2.20435 10.1839 1.44129 9.62132 0.87868C9.05871 0.316071 8.29565 0 7.5 0C6.70435 0 5.94129 0.316071 5.37868 0.87868C4.81607 1.44129 4.5 2.20435 4.5 3C4.5 3.79565 4.81607 4.55871 5.37868 5.12132C5.94129 5.68393 6.70435 6 7.5 6C8.29565 6 9.05871 5.68393 9.62132 5.12132C10.1839 4.55871 10.5 3.79565 10.5 3ZM3.375 11.25C3.375 9.59297 4.71797 8.25 6.375 8.25H8.625C10.282 8.25 11.625 9.59297 11.625 11.25V11.4375C11.625 11.7492 11.8758 12 12.1875 12C12.4992 12 12.75 11.7492 12.75 11.4375V11.25C12.75 8.97188 10.9031 7.125 8.625 7.125H6.375C4.09688 7.125 2.25 8.97188 2.25 11.25V11.4375C2.25 11.7492 2.50078 12 2.8125 12C3.12422 12 3.375 11.7492 3.375 11.4375V11.25Z"
                              fill="currentColor"
                            />
                          </svg>
                          My Profile
                        </Link>
                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          href="/allorders"
                          onClick={() => setisAccountOpen(false)}
                        >
                          <svg
                            data-prefix="fas"
                            data-icon="box-open"
                            className="svg-inline--fa fa-box-open w-[17.5px] h-3.5 text-gray-400"
                            role="img"
                            viewBox="0 0 640 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
                            ></path>
                          </svg>
                          My Orders
                        </Link>
                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          href="/wishlist"
                          onClick={() => setisAccountOpen(false)}
                        >
                          <svg
                            data-prefix="far"
                            data-icon="heart"
                            className="svg-inline--fa fa-heart w-[17.5px] h-3.5 text-gray-400"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M378.9 80c-27.3 0-53 13.1-69 35.2l-34.4 47.6c-4.5 6.2-11.7 9.9-19.4 9.9s-14.9-3.7-19.4-9.9l-34.4-47.6c-16-22.1-41.7-35.2-69-35.2-47 0-85.1 38.1-85.1 85.1 0 49.9 32 98.4 68.1 142.3 41.1 50 91.4 94 125.9 120.3 3.2 2.4 7.9 4.2 14 4.2s10.8-1.8 14-4.2c34.5-26.3 84.8-70.4 125.9-120.3 36.2-43.9 68.1-92.4 68.1-142.3 0-47-38.1-85.1-85.1-85.1zM271 87.1c25-34.6 65.2-55.1 107.9-55.1 73.5 0 133.1 59.6 133.1 133.1 0 68.6-42.9 128.9-79.1 172.8-44.1 53.6-97.3 100.1-133.8 127.9-12.3 9.4-27.5 14.1-43.1 14.1s-30.8-4.7-43.1-14.1C176.4 438 123.2 391.5 79.1 338 42.9 294.1 0 233.7 0 165.1 0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1l15 20.7 15-20.7z"
                            ></path>
                          </svg>
                          My Wishlist
                        </Link>
                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          href="/profile/addresses"
                          onClick={() => setisAccountOpen(false)}
                        >
                          <svg
                            data-prefix="far"
                            data-icon="address-book"
                            className="svg-inline--fa fa-address-book w-[17.5px] h-3.5 text-gray-400"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M384 48c8.8 0 16 7.2 16 16l0 384c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16L80 64c0-8.8 7.2-16 16-16l288 0zM96 0C60.7 0 32 28.7 32 64l0 384c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L96 0zM240 248a56 56 0 1 0 0-112 56 56 0 1 0 0 112zm-32 40c-44.2 0-80 35.8-80 80 0 8.8 7.2 16 16 16l192 0c8.8 0 16-7.2 16-16 0-44.2-35.8-80-80-80l-64 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64zM496 192c-8.8 0-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8 7.2 16 16 16s16-7.2 16-16l0-64z"
                            ></path>
                          </svg>
                          Addresses
                        </Link>
                        <Link
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                          href="/profile/settings"
                          onClick={() => setisAccountOpen(false)}
                        >
                          <svg
                            data-prefix="fas"
                            data-icon="gear"
                            className="svg-inline--fa fa-gear w-[17.5px] h-3.5 text-gray-400"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M195.1 9.5C198.1-5.3 211.2-16 226.4-16l59.8 0c15.2 0 28.3 10.7 31.3 25.5L332 79.5c14.1 6 27.3 13.7 39.3 22.8l67.8-22.5c14.4-4.8 30.2 1.2 37.8 14.4l29.9 51.8c7.6 13.2 4.9 29.8-6.5 39.9L447 233.3c.9 7.4 1.3 15 1.3 22.7s-.5 15.3-1.3 22.7l53.4 47.5c11.4 10.1 14 26.8 6.5 39.9l-29.9 51.8c-7.6 13.1-23.4 19.2-37.8 14.4l-67.8-22.5c-12.1 9.1-25.3 16.7-39.3 22.8l-14.4 69.9c-3.1 14.9-16.2 25.5-31.3 25.5l-59.8 0c-15.2 0-28.3-10.7-31.3-25.5l-14.4-69.9c-14.1-6-27.2-13.7-39.3-22.8L73.5 432.3c-14.4 4.8-30.2-1.2-37.8-14.4L5.8 366.1c-7.6-13.2-4.9-29.8 6.5-39.9l53.4-47.5c-.9-7.4-1.3-15-1.3-22.7s.5-15.3 1.3-22.7L12.3 185.8c-11.4-10.1-14-26.8-6.5-39.9L35.7 94.1c7.6-13.2 23.4-19.2 37.8-14.4l67.8 22.5c12.1-9.1 25.3-16.7 39.3-22.8L195.1 9.5zM256.3 336a80 80 0 1 0 -.6-160 80 80 0 1 0 .6 160z"
                            ></path>
                          </svg>
                          Settings
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={logoutHandler}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                        >
                          <svg
                            data-prefix="fas"
                            data-icon="right-from-bracket"
                            className="svg-inline--fa fa-right-from-bracket w-[17.5px] h-3.5"
                            role="img"
                            viewBox="0 0 512 512"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                            ></path>
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="lg:hidden ml-1 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <FaBars />
                </button>
                <Modal
                  isOpen={isModalOpen}
                  setIsOpen={setIsModalOpen}
                  status={status}
                  logoutHandler={logoutHandler}
                  sessionData={sessionData}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
