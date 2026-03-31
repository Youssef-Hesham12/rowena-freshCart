"use client";

import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserWishlist } from "@/actions/wishlist.actions";
import { ProductType } from "@/types/product.types";

type WishlistContextType = {
  numOfWishlistItems: number;
  wishlistItems: string[];
  updateWishlist: (items: string[]) => void;
};

export const WishlistContext = createContext<WishlistContextType>({
  numOfWishlistItems: 0,
  wishlistItems: [],
  updateWishlist: () => {},
});

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const { data: session } = useSession();

  function updateWishlist(items: string[]) {
    setWishlistItems(items);
    setNumOfWishlistItems(items.length);
  }

  useEffect(() => {
    if (session?.user) {
      getUserWishlist().then((data) => {
        if (data.status === "success") {
          const items = data?.data?.map((item: ProductType) => item._id);
          updateWishlist(items);
        }
      });
    }
  }, [session]);

  return (
    <WishlistContext.Provider
      value={{
        numOfWishlistItems,
        wishlistItems,
        updateWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
