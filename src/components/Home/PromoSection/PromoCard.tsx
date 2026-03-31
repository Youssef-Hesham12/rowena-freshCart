import Link from "next/link";
import { PromoItem } from "./promo.types";
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
  promo: PromoItem;
}

export default function PromoCard({ promo }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-[16px] bg-linear-to-br ${promo.gradient} p-8 text-white`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
          <span>{promo.badgeEmoji}</span>
          <span className="font-medium">{promo.badgeText}</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          {promo.title}
        </h3>
        <p className="text-white/80 font-medium mb-4">
          {promo.description}
        </p>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-3xl font-bold">{promo.discount} OFF</div>
          <div className="text-sm text-white/70">
            Use code: <span className="font-bold text-white">{promo.code}</span>
          </div>
        </div>
        <Link
          className={`inline-flex items-center gap-2 bg-white ${promo.buttonColor} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
          href="/products"
        >
          {promo.buttonText}
          <FaArrowRightLong size={18} />
        </Link>
      </div>
    </div>
  );
}
