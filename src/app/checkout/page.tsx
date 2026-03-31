import Link from "next/link";
import CheckoutForm from "@/components/Checkout/CheckoutForm";
import { getUserCart } from "@/actions/cart.actions";
import { UserAddressesType } from "@/types/addresses.types";
import { getUserAddresses } from "@/actions/addresses.actions";
import { CartType } from "@/types/cart.types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";
import { redirect } from "next/navigation";
interface checkoutProps {
  searchParams: Promise<{ id: string }>;
}
export default async function Checkout({ searchParams }: checkoutProps) {
  const session = await getServerSession(authOptions)
    if(!session) redirect('/login');
  const { id } = await searchParams;
  const cartItems: CartType = await getUserCart();
  const userAddresses: UserAddressesType = await getUserAddresses();
  

  return cartItems.numOfCartItems !== 0 ? (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4!">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
            <Link className="hover:text-primary-600 transition" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link className="hover:text-primary-600 transition" href="/cart">
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">Checkout</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-[12px] flex items-center justify-center shadow-lg shadow-primary-600/20">
                  <svg
                    width="38"
                    height="30"
                    viewBox="0 0 38 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.32031 0.128899C8.81836 -0.0996163 9.4043 -0.017585 9.82031 0.339837L12.1875 2.36718L14.5547 0.339837C15.082 -0.111335 15.8613 -0.111335 16.3828 0.339837L18.75 2.36718L21.1172 0.339837C21.6445 -0.111335 22.418 -0.111335 22.9453 0.339837L25.3125 2.36718L27.6797 0.339837C28.0957 -0.017585 28.6816 -0.0996163 29.1797 0.128899C29.6777 0.357415 30 0.855462 30 1.40624V28.5937C30 29.1445 29.6777 29.6426 29.1797 29.8711C28.6816 30.0996 28.0957 30.0176 27.6797 29.6602L25.3125 27.6328L22.9453 29.6602C22.418 30.1113 21.6445 30.1113 21.1172 29.6602L18.75 27.6328L16.3828 29.6602C15.8555 30.1113 15.0762 30.1113 14.5547 29.6602L12.1875 27.6328L9.82031 29.6602C9.4043 30.0176 8.81836 30.0996 8.32031 29.8711C7.82227 29.6426 7.5 29.1445 7.5 28.5937V1.40624C7.5 0.855462 7.82227 0.357415 8.32031 0.128899ZM13.5938 7.96874C12.8145 7.96874 12.1875 8.5957 12.1875 9.37499C12.1875 10.1543 12.8145 10.7812 13.5938 10.7812H23.9062C24.6855 10.7812 25.3125 10.1543 25.3125 9.37499C25.3125 8.5957 24.6855 7.96874 23.9062 7.96874H13.5938ZM12.1875 20.625C12.1875 21.4043 12.8145 22.0312 13.5938 22.0312H23.9062C24.6855 22.0312 25.3125 21.4043 25.3125 20.625C25.3125 19.8457 24.6855 19.2187 23.9062 19.2187H13.5938C12.8145 19.2187 12.1875 19.8457 12.1875 20.625ZM13.5938 13.5937C12.8145 13.5937 12.1875 14.2207 12.1875 15C12.1875 15.7793 12.8145 16.4062 13.5938 16.4062H23.9062C24.6855 16.4062 25.3125 15.7793 25.3125 15C25.3125 14.2207 24.6855 13.5937 23.9062 13.5937H13.5938Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 font-medium mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
              href="/cart"
            >
              <svg
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.29297 7.29374C1.90234 7.68437 1.90234 8.31874 2.29297 8.70937L7.29297 13.7094C7.68359 14.1 8.31797 14.1 8.70859 13.7094C9.09922 13.3187 9.09922 12.6844 8.70859 12.2937L5.41484 8.99999H16.9992C17.5523 8.99999 17.9992 8.55312 17.9992 7.99999C17.9992 7.44687 17.5523 6.99999 16.9992 6.99999H5.41484L8.70859 3.70624C9.09922 3.31562 9.09922 2.68124 8.70859 2.29062C8.31797 1.89999 7.68359 1.89999 7.29297 2.29062L2.29297 7.29062V7.29374Z"
                  fill="currentColor"
                />
              </svg>
              Back to Cart
            </Link>
          </div>
        </div>
        <CheckoutForm cartId={id} cartItems={cartItems} userAddresses={userAddresses} />
      </div>
    </div>
  ) : (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center mx-auto mb-6">
          <svg
            data-prefix="fas"
            data-icon="triangle-exclamation"
            className="svg-inline--fa fa-triangle-exclamation w-11.25 h-9 text-amber-500"
            role="img"
            viewBox="0 0 512 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M256 0c14.7 0 28.2 8.1 35.2 21l216 400c6.7 12.4 6.4 27.4-.8 39.5S486.1 480 472 480L40 480c-14.1 0-27.2-7.4-34.4-19.5s-7.5-27.1-.8-39.5l216-400c7-12.9 20.5-21 35.2-21zm0 352a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm0-192c-18.2 0-32.7 15.5-31.4 33.7l7.4 104c.9 12.5 11.4 22.3 23.9 22.3 12.6 0 23-9.7 23.9-22.3l7.4-104c1.3-18.2-13.1-33.7-31.4-33.7z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 font-medium mb-6">
          Add some items to your cart before checking out.
        </p>
        <Link
          className="inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/20"
          href="/"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
