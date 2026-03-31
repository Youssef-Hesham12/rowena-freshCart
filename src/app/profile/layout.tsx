import Sidebar from "@/components/Profile/Sidebar";
import Link from "next/link";
import React from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4! py-10! sm:py-12!">
          <nav className="flex items-center gap-2 text-sm font-medium text-white/70 mb-6">
            <Link
              className="hover:text-white transition-colors duration-200"
              href="/"
            >
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">My Account</span>
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
                  d="M18.75 14.5312C19.6734 14.5312 20.5877 14.3494 21.4407 13.996C22.2938 13.6427 23.0689 13.1248 23.7218 12.4718C24.3748 11.8189 24.8927 11.0438 25.246 10.1907C25.5994 9.33767 25.7812 8.42336 25.7812 7.5C25.7812 6.57664 25.5994 5.66233 25.246 4.80926C24.8927 3.95619 24.3748 3.18107 23.7218 2.52816C23.0689 1.87524 22.2938 1.35733 21.4407 1.00397C20.5877 0.650619 19.6734 0.46875 18.75 0.46875C17.8266 0.46875 16.9123 0.650619 16.0593 1.00397C15.2062 1.35733 14.4311 1.87524 13.7782 2.52816C13.1252 3.18107 12.6073 3.95619 12.254 4.80926C11.9006 5.66233 11.7188 6.57664 11.7188 7.5C11.7188 8.42336 11.9006 9.33767 12.254 10.1907C12.6073 11.0438 13.1252 11.8189 13.7782 12.4718C14.4311 13.1248 15.2062 13.6427 16.0593 13.996C16.9123 14.3494 17.8266 14.5312 18.75 14.5312ZM17.0098 17.8125C11.2383 17.8125 6.5625 22.4883 6.5625 28.2598C6.5625 29.2207 7.3418 30 8.30273 30H29.1973C30.1582 30 30.9375 29.2207 30.9375 28.2598C30.9375 22.4883 26.2617 17.8125 20.4902 17.8125H17.0098Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                My Account
              </h1>
              <p className="text-white/80 font-medium mt-1">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4! py-8!">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <Sidebar />
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
