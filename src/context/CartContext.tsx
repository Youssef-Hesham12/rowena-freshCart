"use client"
import React, { createContext, ReactNode, useState } from "react";

type CartItemType = {
  product: {
    _id: string;
  };
};

type CartContextType = {
  numOfCartItems: number;
  cartItems: CartItemType[];
  updateCart: (items: CartItemType[], count: number) => void;
};

export const CartContext = createContext<CartContextType>({
  numOfCartItems: 0,
  cartItems: [],
  updateCart: () => {},
});

export default function CartProvider({ children }: { children: ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  function updateCart(items: CartItemType[], count: number) {
    setCartItems(items);
    setNumOfCartItems(count);
  }

  return (
    <CartContext.Provider value={{ numOfCartItems, cartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
