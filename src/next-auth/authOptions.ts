import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { DecodedTokenType } from "./decoded-token.type";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Exclusive",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            "https://ecommerce.routemisr.com/api/v1/auth/signin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            },
          );
          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.message || "Login failed");
          }

          const decoded = jwtDecode<DecodedTokenType>(result.token);

          return {
            id: decoded.id,
            email: result.user.email,
            name: result.user.name,
            accessToken: result.token,
          };
        } catch (error) {
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      if (trigger === "update" && session) {
        token.user = {
          ...token.user,
          name: session.name,
          email: session.email,
        };
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
};
