"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getEncodedToken() {
  const cookie = await cookies();
  const token =
  cookie.get("__Secure-next-auth.session-token")?.value ||
  cookie.get("next-auth.session-token")?.value;
  const decodedToken = await decode({
    token,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return decodedToken;
}

export async function getUserToken() {
  return (await getEncodedToken())?.accessToken;
}

export async function getUserId() {
  return (await getEncodedToken())?.user.id;
}
