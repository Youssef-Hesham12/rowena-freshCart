"use server"

import { AddAddressDataType } from "@/components/shared/AddAddressButton/AddModalForm/AddModalForm.type";
import { getUserToken } from "@/lib/token-utils";

export async function addAddress(data: AddAddressDataType) {
  try {
    const token = await getUserToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
      body: JSON.stringify(
        data,
      ),
    });

    const result = await res.json();

    if (!res.ok) {
      return {error : "Failed to add address"};
    }
    
    return result;
  } catch (error) {
    return error;
  }
}

export async function getUserAddresses() {
  try {
    const token = await getUserToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to get user addresses"};
    }
    return data;
  } catch (error) {
    return error;
  }
}

export async function removeAddress(addressId: string) {
  try {
    const token = await getUserToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token || "",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return {error : "Failed to remove address"};
    }

    return data;
  } catch (error) {
    return error;
  }
}
