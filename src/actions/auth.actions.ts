"use server";

import { LoginDataType } from "@/components/Login/login-data.type";
import { UserInfoDataType } from "@/components/Settings/userInfo-data.type";
import { UserPasswordsDataType } from "@/components/Settings/userPasswords-data.type";
import { getUserToken } from "@/lib/token-utils";
import { cookies } from "next/headers";

// export async function loginHandler(data:LoginDataType) {
//     try {
//         const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });
//         const result = await response.json();

//         if(!response.ok) {
//             throw new Error(result.message || "Login failed");
//         }
//         const cookieStore = await cookies()
//         cookieStore.set("token", result.token,{
//             maxAge: 60 * 60 * 24 * 7,
//             httpOnly: true,
//         })
//         return result;

//     } catch (error) {
//       return error;
//     }
// }

export async function registerHandler(data: LoginDataType) {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();

    if (!response.ok) {
      return {error : "Failed to create account"};
    }
    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return result;
  } catch (error) {
    return error;
  }
}

export async function updateUserData(data: UserInfoDataType) {
  try {
    const token = await getUserToken();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    return error;
  }
}

export async function updateUserPassword(data: UserPasswordsDataType) {
  try {
    const token = await getUserToken();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token || "",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    return error;
  }
}

export async function forgotPassword(data: { email: string }) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {error : "Failed to send reset code"};
    }
    return result;
  } catch (error) {
    return error;
  }
}

export async function verifyResetCode(data: { resetCode: string }) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {error : "Failed to verify reset code"};
    }
    return result;
  } catch (error) {
    return error;
  }
}

export async function resetPassword(data: { email: string, newPassword: string }) {
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      return {error : "Failed to reset password"};
    }
    return result;
  } catch (error) {
    return error;
  }
}
