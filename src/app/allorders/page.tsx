import { getUserOrders } from "@/actions/orders.actions";
import OrderProductCard from "@/components/AllOrders/OrderProductCard";
import { authOptions } from "@/next-auth/authOptions";
import { OrdersType } from "@/types/order.types";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AllOrders() {
  const session = await getServerSession(authOptions)
    if(!session) redirect('/login');
  const orders: OrdersType = (await getUserOrders() || []);
  
  return orders.length !== 0? (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4!">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
            <Link className="hover:text-primary-600 transition" href="/">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900">My Orders</span>
          </nav>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
            <div className="flex items-center gap-4">
              <span className="bg-linear-to-br from-primary-500 to-primary-600 text-white w-14 h-14 rounded-[16px] flex items-center justify-center shadow-lg shadow-primary-600/20">
                <svg
                  width="30"
                  height="24"
                  viewBox="0 0 30 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.8156 6L20.2078 3.75H9.79688L8.18906 6H21.8156ZM4.5 6.96094C4.5 6.3375 4.69687 5.72813 5.05781 5.21719L7.35469 2.00625C7.91719 1.21875 8.82656 0.75 9.79219 0.75H20.2031C21.1734 0.75 22.0828 1.21875 22.6453 2.00625L24.9375 5.21719C25.3031 5.72813 25.4953 6.3375 25.4953 6.96094L25.5 19.5C25.5 21.1547 24.1547 22.5 22.5 22.5H7.5C5.84531 22.5 4.5 21.1547 4.5 19.5V6.96094Z"
                    fill="currentColor"
                  />
                </svg>
              </span>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-500 font-medium">
                  Track and manage your {orders.length} orders
                </p>
              </div>
            </div>
            <Link
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-[12px] hover:bg-primary-50 transition-all"
              href="/"
            >
              <svg
                width="15"
                height="13"
                viewBox="0 0 15 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.625C6 1.79766 6.67266 1.125 7.5 1.125C8.32734 1.125 9 1.79766 9 2.625V3.75H6V2.625ZM4.875 3.75H3.375C2.75391 3.75 2.25 4.25391 2.25 4.875V9.75C2.25 10.9922 3.25781 12 4.5 12H10.5C11.7422 12 12.75 10.9922 12.75 9.75V4.875C12.75 4.25391 12.2461 3.75 11.625 3.75H10.125V2.625C10.125 1.17422 8.95078 0 7.5 0C6.04922 0 4.875 1.17422 4.875 2.625V3.75ZM5.4375 4.875C5.51137 4.875 5.58451 4.88955 5.65276 4.91782C5.721 4.94609 5.78301 4.98752 5.83525 5.03975C5.88748 5.09199 5.92891 5.154 5.95718 5.22224C5.98545 5.29049 6 5.36363 6 5.4375C6 5.51137 5.98545 5.58451 5.95718 5.65276C5.92891 5.721 5.88748 5.78301 5.83525 5.83525C5.78301 5.88748 5.721 5.92891 5.65276 5.95718C5.58451 5.98545 5.51137 6 5.4375 6C5.36363 6 5.29049 5.98545 5.22224 5.95718C5.154 5.92891 5.09199 5.88748 5.03975 5.83525C4.98752 5.78301 4.94609 5.721 4.91782 5.65276C4.88955 5.58451 4.875 5.51137 4.875 5.4375C4.875 5.36363 4.88955 5.29049 4.91782 5.22224C4.94609 5.154 4.98752 5.09199 5.03975 5.03975C5.09199 4.98752 5.154 4.94609 5.22224 4.91782C5.29049 4.88955 5.36363 4.875 5.4375 4.875ZM9 5.4375C9 5.28832 9.05926 5.14524 9.16475 5.03975C9.27024 4.93426 9.41332 4.875 9.5625 4.875C9.71168 4.875 9.85476 4.93426 9.96025 5.03975C10.0657 5.14524 10.125 5.28832 10.125 5.4375C10.125 5.58668 10.0657 5.72976 9.96025 5.83525C9.85476 5.94074 9.71168 6 9.5625 6C9.41332 6 9.27024 5.94074 9.16475 5.83525C9.05926 5.72976 9 5.58668 9 5.4375Z"
                  fill="currentColor"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          {orders?.length > 0 && orders?.map((order)=> (
          <OrderProductCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  ): (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="max-w-md text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                <svg
                  data-prefix="fas"
                  data-icon="box-open"
                  className="svg-inline--fa fa-box-open w-15 h-12 text-gray-300"
                  role="img"
                  viewBox="0 0 640 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"
                  ></path>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No orders yet
            </h2>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              You haven&apos;t placed any orders yet. <br /> Start shopping and your orders will appear here.
            </p>
            <Link
              className="inline-flex items-center gap-2 bg-primary-600 text-white py-3.5 px-8 rounded-[12px] font-semibold hover:bg-primary-700 transition-all shadow-lg active:scale-[0.98]"
              href="/"
            >
              Start Shopping
              <svg
                data-prefix="fas"
                data-icon="arrow-right"
                className="svg-inline--fa fa-arrow-right w-[17.5px] h-3.5"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
  );
}
