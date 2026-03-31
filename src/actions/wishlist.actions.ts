"use server"

import { getUserToken } from "@/lib/token-utils";
import { revalidatePath } from "next/cache";

export async function addProductToWishlist(productId: string) {
  try {
    const token = await getUserToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({
        productId,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to add product to wishlist"};
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserWishlist() {
  try {
    const token = await getUserToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to get user wishlist"};
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function removeProductFromWishlist(productId: string) {
  try {
    const token = await getUserToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to remove product"};
    }

    if(res.ok){
      revalidatePath('/wishlist')
    }

    return data;
  } catch (error) {
    return error;
  }
}