import { PromoItem } from "./promo.types";

export const promoArr: PromoItem[] = [
  {
    badgeEmoji: "🔥",
    badgeText: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40%",
    code: "ORGANIC40",
    buttonText: "Shop Now",
    gradient: "from-emerald-500 to-emerald-700",
    buttonColor: "text-emerald-600",
  },
  {
    badgeEmoji: "✨",
    badgeText: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25%",
    code: "FRESH25",
    buttonText: "Explore Now",
    gradient: "from-orange-400 to-rose-500",
    buttonColor: "text-orange-500",
  },
];
