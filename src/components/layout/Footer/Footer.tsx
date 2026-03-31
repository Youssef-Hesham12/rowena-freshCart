import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { footerListArr } from "./footer-list.data";
import FooterList from "./FooterList";
import StoreFeaturesBar from "./StoreFeaturesBar/StoreFeaturesBar";

export default function Footer() {
  return (
    <>
    <StoreFeaturesBar/>
    <footer id="footer" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4! py-12!">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <Link className="inline-block mb-6" href="/">
              <div className="bg-white rounded-[8px] px-4 py-2 inline-block">
                <Image
                  src="/images/freshcart-logo.49f1b44d.svg"
                  width={165.16}
                  height={32}
                  alt="FreshCart Logo"
                />
              </div>
            </Link>
            <p className="text-gray-400 mb-6 text-sm font-medium leading-relaxed">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 font-medium text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FaPhone className="text-primary-500" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 font-medium text-gray-400 hover:text-primary-400 transition-colors text-sm"
              >
                <FaEnvelope className="text-primary-500" />
                <span>support@freshcart.com</span>
              </a>
              <div className="flex items-start gap-3 font-medium text-gray-400 text-sm">
                <FaLocationDot className="text-primary-500" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
                ( Icon, index ) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    <Icon />
                  </a>
                ),
              )}
            </div>
          </div>
          {footerListArr.map((list) => (
            <FooterList key={list.title} list={list} />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4! py-6!">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium text-center md:text-left">
              © 2026 FreshCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {["Visa", "Mastercard", "PayPal"].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <svg
                    width="14"
                    height="11"
                    viewBox="0 0 14 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 1.75V2.625H14V1.75C14 0.784766 13.2152 0 12.25 0H1.75C0.784766 0 0 0.784766 0 1.75ZM0 3.9375V8.75C0 9.71523 0.784766 10.5 1.75 10.5H12.25C13.2152 10.5 14 9.71523 14 8.75V3.9375H0ZM1.75 8.09375C1.75 7.73008 2.04258 7.4375 2.40625 7.4375H3.71875C4.08242 7.4375 4.375 7.73008 4.375 8.09375C4.375 8.45742 4.08242 8.75 3.71875 8.75H2.40625C2.04258 8.75 1.75 8.45742 1.75 8.09375ZM5.6875 8.09375C5.6875 7.73008 5.98008 7.4375 6.34375 7.4375H8.09375C8.45742 7.4375 8.75 7.73008 8.75 8.09375C8.75 8.45742 8.45742 8.75 8.09375 8.75H6.34375C5.98008 8.75 5.6875 8.45742 5.6875 8.09375Z"
                      fill="#6A7282"
                    />
                  </svg>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
