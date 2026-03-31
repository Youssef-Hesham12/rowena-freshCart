import { FooterListType } from "./footer-list.types";

export const footerListArr: FooterListType[] = [
  {
    title: "Shop",
    links: [
      { name: "All Products", href: "/products" },
      { name: "Categories", href: "/categories" },
      { name: "Brands", href: "/brands" },
      { name: "Electronics", href: "/products?category=6439d58a0049ad0b52b9003f" },
      { name: "Men's Fashion", href: "/products?category=6439d2d167d9aa4ca970649f" },
      { name: "Women's Fashion", href: "/products?category=6439d5b90049ad0b52b90048" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Account", href: "/profile" },
      { name: "Order History", href: "/allorders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Shopping Cart", href: "/cart" },
      { name: "Sign In", href: "/login" },
      { name: "Create Account", href: "/register" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Returns & Refunds", href: "/returns" },
      { name: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];








