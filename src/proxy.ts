// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/cart", "/checkout", "/allorders", "/profile"];
// const authRoutes = ["/login", "/register"];
// // بر
// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;
 
//   const token =
//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value;

//    if (token){

//       return NextResponse.next();

//    }

//   if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
//      console.log("tokkkkkkkkkkkkkkkkkkkkkkkken",token)
//     return NextResponse.redirect(new URL("/login", request.nextUrl));
//   }
//   if (token && authRoutes.some((route) => pathname.startsWith(route))) {
//     console.log("hellllllo")
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }


// }

// export const config = {
//   matcher: [
//     "/cart/:path*",
//     "/profile/:path*",
//     "/checkout/:path*",
//     "/allorders/:path*",
//     "/login",
//     "/register",
//   ],
// };



import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('el secret key ' , process.env.NEXTAUTH_SECRET );
  const { pathname } = req.nextUrl;

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && (pathname.startsWith("/cart") || pathname.startsWith("/orders"))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/cart", "/login", "/register", "/allorders","/checkout","/profile"],
};