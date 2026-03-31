"use server";

import { getUserToken } from "@/lib/token-utils";
import { revalidatePath } from "next/cache";


export async function addToCart(productId: string) {
  try {
    const token = await getUserToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
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
      return {error : "Failed to add product to cart"};
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserCart() {
  try {
    const token = await getUserToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to get user cart"};
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function updateCartProductQuantity(productId: string , count: number) {
  try {
    const token = await getUserToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({
        count,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to update the quantity of the product"};
    }

    if(res.ok){
      revalidatePath('/cart')
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function removeProductFromCart(productId: string) {
  try {
    const token = await getUserToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
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
      revalidatePath('/cart')
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function clearUserCart() {
  try {
    const token = await getUserToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to clear your cart"};
    }

    if(res.ok){
      revalidatePath('/cart')
    }

    return data;
  } catch (error) {
    return error;
  }
}