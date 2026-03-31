"use client";
import CartProvider from "@/context/CartContext";
import WishlistProvider from "@/context/WishListContext";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <WishlistProvider>
      <CartProvider>{children}</CartProvider>
      </WishlistProvider>
    </SessionProvider>
  );
}
