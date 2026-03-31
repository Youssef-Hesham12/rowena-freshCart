"use server";
import { getUserId, getUserToken } from "@/lib/token-utils";
import { ShippingAddressDataType } from "@/components/Checkout/shipping-address.type";

export async function createOrder(
  cartId: string,
  data: ShippingAddressDataType,
) {
  try {
    const { paymentMethod, ...ShippingAdderss } = data;
    const endpoint =
      paymentMethod === "cash"
        ? `api/v2/orders/${cartId}`
        : `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;

    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify({
        ShippingAdderss,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
          return {error : "Failed to create an order"};
        }
    return result;
  } catch (error) {
    return error;
  }
}

export async function getUserOrders() {
  try {
    const userId = await getUserId();
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    );

    const data = await res.json();

    if (!res.ok) {
          return {error : "Failed to get user orders"};
        }
    return data;
  } catch (error) {
    return error;
  }
}
