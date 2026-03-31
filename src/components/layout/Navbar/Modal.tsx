"use client"
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaCartShopping,
  FaHeadset,
  FaMagnifyingGlass,
  FaRegHeart,
  FaXmark,
} from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  status: string;
  logoutHandler: () => void;
  sessionData: Session | null
}

export default function Modal({ isOpen, setIsOpen, status, logoutHandler, sessionData }: ModalProps) {
  const router = useRouter()
    const [searchValue, setSearchValue] = useState("");
  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Image
            alt="FreshCart"
            width="160"
            height="31"
            className="h-8 w-auto"
            style={{ color: "transparent" }}
            src="/images/freshcart-logo.49f1b44d.svg"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <FaXmark className="text-xl text-gray-600" />
          </button>
        </div>
        <form onSubmit={(e)=> {
          e.preventDefault()

          if(!searchValue.trim()) return
          router.push(`/search?q=${searchValue}`)
          setIsOpen(false)
        }} 
        className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-primary-600 text-white flex items-center justify-center cursor-pointer"
            >
              <FaMagnifyingGlass className="text-sm" />
            </button>
          </div>
        </form>
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/products"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/categories"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              href="/brands"
              onClick={() => setIsOpen(false)}
            >
              Brands
            </Link>
          </div>
        </nav>
        <div className="mx-4 border-t border-gray-100"></div>
        <div className="p-4 space-y-1">
          <Link
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            href="/wishlist"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <FaRegHeart className="text-red-500" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
          </Link>
          <Link
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
            href="/cart"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center">
                <FaCartShopping className="text-primary-600 text-lg" />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
          </Link>
        </div>
        <div className="mx-4 border-t border-gray-100"></div>
        <div className="p-4 space-y-1">
          {status === "unauthenticated" ? (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
                href="/login"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-[12px] border-2 border-primary-600 text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
                href="/register"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <>
              <Link
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors"
                href="/profile"
              >
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 4C7.5 3.33696 7.76339 2.70107 8.23223 2.23223C8.70107 1.76339 9.33696 1.5 10 1.5C10.663 1.5 11.2989 1.76339 11.7678 2.23223C12.2366 2.70107 12.5 3.33696 12.5 4C12.5 4.66304 12.2366 5.29893 11.7678 5.76777C11.2989 6.23661 10.663 6.5 10 6.5C9.33696 6.5 8.70107 6.23661 8.23223 5.76777C7.76339 5.29893 7.5 4.66304 7.5 4ZM14 4C14 2.93913 13.5786 1.92172 12.8284 1.17157C12.0783 0.421427 11.0609 0 10 0C8.93913 0 7.92172 0.421427 7.17157 1.17157C6.42143 1.92172 6 2.93913 6 4C6 5.06087 6.42143 6.07828 7.17157 6.82843C7.92172 7.57857 8.93913 8 10 8C11.0609 8 12.0783 7.57857 12.8284 6.82843C13.5786 6.07828 14 5.06087 14 4ZM4.5 15C4.5 12.7906 6.29063 11 8.5 11H11.5C13.7094 11 15.5 12.7906 15.5 15V15.25C15.5 15.6656 15.8344 16 16.25 16C16.6656 16 17 15.6656 17 15.25V15C17 11.9625 14.5375 9.5 11.5 9.5H8.5C5.4625 9.5 3 11.9625 3 15V15.25C3 15.6656 3.33437 16 3.75 16C4.16562 16 4.5 15.6656 4.5 15.25V15Z"
                      fill="#6A7282"
                    />
                  </svg>
                </div>
                <span className="font-medium text-gray-700">{sessionData?.user?.name}</span>
              </Link>
              <button onClick={logoutHandler} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7812 8.53125C18.075 8.2375 18.075 7.7625 17.7812 7.47188L13.2812 2.96875C13.0656 2.75312 12.7437 2.69063 12.4625 2.80625C12.1812 2.92188 12 3.19688 12 3.5V6H8.5C7.67188 6 7 6.67188 7 7.5V8.5C7 9.32812 7.67188 10 8.5 10H12V12.5C12 12.8031 12.1812 13.0781 12.4625 13.1938C12.7437 13.3094 13.0656 13.2469 13.2812 13.0312L17.7812 8.53125ZM7 3C7.55312 3 8 2.55313 8 2C8 1.44687 7.55312 1 7 1H5C3.34375 1 2 2.34375 2 4V12C2 13.6562 3.34375 15 5 15H7C7.55312 15 8 14.5531 8 14C8 13.4469 7.55312 13 7 13H5C4.44688 13 4 12.5531 4 12V4C4 3.44688 4.44688 3 5 3H7Z"
                      fill="#FB2C36"
                    />
                  </svg>
                </div>
                <span className="font-medium text-red-600">Sign Out</span>
              </button>
            </>
          )}
        </div>
        <Link
          className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-primary-50 transition-colors"
          href="/contact"
          onClick={() => setIsOpen(false)}
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
            <FaHeadset className="text-primary-600 text-lg" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700">
              Need Help?
            </div>
            <div className="text-sm font-medium text-primary-600">
              Contact Support
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
