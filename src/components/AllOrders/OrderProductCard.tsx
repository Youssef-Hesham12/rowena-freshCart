"use client";

import { Order } from "@/types/order.types";
import Image from "next/image";
import { useState } from "react";
import CartItemsCard from "./CartItemsCard";
import { FaCheckCircle } from "react-icons/fa";

export default function OrderProductCard({ order }: { order: Order }) {
  const [showProductDetails, setShowProductDetais] = useState(false);
  function getOrderStatus() {
    if (order.isDelivered) {
      return "delivered";
    }

    if (order.paymentMethodType === "card" && order.isPaid) {
      return "onTheWay";
    }

    return "processing";
  }
  const status = getOrderStatus();
  return (
    <div
      className={`bg-white rounded-[16px] border ${showProductDetails ? "pt-6  border-[#BBF7D0] shadow-[0px_4px_6px_-4px_#DCFCE780,0px_10px_15px_-3px_#DCFCE780]" : "p-6 border-[#F3F4F6] shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"}`}
    >
      <div
        className={`flex items-start gap-5 ${showProductDetails ? "mx-6 mb-6" : ""}`}
      >
        <div className="relative">
          <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-[16px] p-2.5 bg-linear-to-br from-[#F9FAFB] to-white border border-[#F3F4F6]">
            <Image
              alt={order.cartItems[0]?.product.title}
              src={order.cartItems[0]?.product.imageCover}
              width={90}
              height={90}
            />
          </div>
          {order.cartItems.length > 1 && (
            <div className="absolute w-7 h-7 -top-2 -right-2 bg-[#101828] text-white text-xs font-bold rounded-full flex items-center justify-center">
              +{order.cartItems.length}
            </div>
          )}
        </div>
        <div className="flex-1 space-y-[11.5px]">
          <div className="flex items-start justify-between">
            <div>
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] ${
                  status === "processing"
                    ? "bg-[#FEF3C6] text-[#E17100]"
                    : status === "onTheWay"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-primary-100 text-green-600"
                } mb-2`}
              >
                {status === "processing" ? (
                  <>
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 0C9.0913 0 10.6174 0.632141 11.7426 1.75736C12.8679 2.88258 13.5 4.4087 13.5 6C13.5 7.5913 12.8679 9.11742 11.7426 10.2426C10.6174 11.3679 9.0913 12 7.5 12C5.9087 12 4.38258 11.3679 3.25736 10.2426C2.13214 9.11742 1.5 7.5913 1.5 6C1.5 4.4087 2.13214 2.88258 3.25736 1.75736C4.38258 0.632141 5.9087 0 7.5 0ZM6.9375 2.8125V6C6.9375 6.1875 7.03125 6.36328 7.18828 6.46875L9.43828 7.96875C9.69609 8.14219 10.0453 8.07187 10.2188 7.81172C10.3922 7.55156 10.3219 7.20469 10.0617 7.03125L8.0625 5.7V2.8125C8.0625 2.50078 7.81172 2.25 7.5 2.25C7.18828 2.25 6.9375 2.50078 6.9375 2.8125Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs font-semibold">Processing</span>
                  </>
                ) : status === "onTheWay" ? (
                  <>
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.75 2.25C0.75 1.42266 1.42266 0.75 2.25 0.75H9C9.82734 0.75 10.5 1.42266 10.5 2.25V3H11.6883C12.0867 3 12.4688 3.15703 12.75 3.43828L13.8117 4.5C14.093 4.78125 14.25 5.16328 14.25 5.56172V9C14.25 9.82734 13.5773 10.5 12.75 10.5H12.6727C12.4289 11.3648 11.632 12 10.6875 12C9.74297 12 8.94844 11.3648 8.70234 10.5H6.29766C6.05391 11.3648 5.25703 12 4.3125 12C3.36797 12 2.57344 11.3648 2.32734 10.5H2.25C1.42266 10.5 0.75 9.82734 0.75 9V2.25ZM12.75 6.75V5.56172L11.6883 4.5H10.5V6.75H12.75ZM5.25 9.9375C5.25 9.68886 5.15123 9.4504 4.97541 9.27459C4.7996 9.09877 4.56114 9 4.3125 9C4.06386 9 3.8254 9.09877 3.64959 9.27459C3.47377 9.4504 3.375 9.68886 3.375 9.9375C3.375 10.1861 3.47377 10.4246 3.64959 10.6004C3.8254 10.7762 4.06386 10.875 4.3125 10.875C4.56114 10.875 4.7996 10.7762 4.97541 10.6004C5.15123 10.4246 5.25 10.1861 5.25 9.9375ZM10.6875 10.875C10.9361 10.875 11.1746 10.7762 11.3504 10.6004C11.5262 10.4246 11.625 10.1861 11.625 9.9375C11.625 9.68886 11.5262 9.4504 11.3504 9.27459C11.1746 9.09877 10.9361 9 10.6875 9C10.4389 9 10.2004 9.09877 10.0246 9.27459C9.84877 9.4504 9.75 9.68886 9.75 9.9375C9.75 10.1861 9.84877 10.4246 10.0246 10.6004C10.2004 10.7762 10.4389 10.875 10.6875 10.875Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-xs font-semibold">On the way</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle />
                    <span className="text-xs font-semibold">Delivered</span>
                  </>
                )}
              </div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.53203 0.0167856C6.9375 0.103504 7.19531 0.501942 7.10859 0.907411L6.66094 3.00038H9.62578L10.1414 0.593348C10.2281 0.187879 10.6266 -0.0699331 11.032 0.0167856C11.4375 0.103504 11.6953 0.501942 11.6086 0.907411L11.1609 3.00038H12.75C13.1648 3.00038 13.5 3.33554 13.5 3.75038C13.5 4.16522 13.1648 4.50038 12.75 4.50038H10.8375L10.1953 7.50038H11.7844C12.1992 7.50038 12.5344 7.83554 12.5344 8.25038C12.5344 8.66522 12.1992 9.00038 11.7844 9.00038H9.87188L9.35625 11.4074C9.26953 11.8129 8.87109 12.0707 8.46563 11.984C8.06016 11.8973 7.80234 11.4988 7.88906 11.0933L8.33672 9.00038H5.37187L4.85625 11.4074C4.76953 11.8129 4.37109 12.0707 3.96562 11.984C3.56016 11.8973 3.30234 11.4988 3.38906 11.0933L3.83906 9.00038H2.25C1.83516 9.00038 1.5 8.66522 1.5 8.25038C1.5 7.83554 1.83516 7.50038 2.25 7.50038H4.1625L4.80469 4.50038H3.21562C2.80078 4.50038 2.46563 4.16522 2.46563 3.75038C2.46563 3.33554 2.80078 3.00038 3.21562 3.00038H5.12813L5.64375 0.593348C5.72813 0.187879 6.12656 -0.0699331 6.53203 0.0167856ZM6.3375 4.50038L5.69531 7.50038H8.66016L9.30234 4.50038H6.3375Z"
                    fill="#99A1AF"
                  />
                </svg>{" "}
                {order.id}
              </h3>
            </div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-[12px] ${order.paymentMethodType === "cash" ? "bg-gray-100" : "bg-[#F3E8FF]"} shrink-0`}
            >
              {order.paymentMethodType === "cash" ? (
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 2C2.89688 2 2 2.89688 2 4V12C2 13.1031 2.89688 14 4 14H16C17.1031 14 18 13.1031 18 12V4C18 2.89688 17.1031 2 16 2H4ZM10 5C10.7956 5 11.5587 5.31607 12.1213 5.87868C12.6839 6.44129 13 7.20435 13 8C13 8.79565 12.6839 9.55871 12.1213 10.1213C11.5587 10.6839 10.7956 11 10 11C9.20435 11 8.44129 10.6839 7.87868 10.1213C7.31607 9.55871 7 8.79565 7 8C7 7.20435 7.31607 6.44129 7.87868 5.87868C8.44129 5.31607 9.20435 5 10 5ZM16 5.75C16 5.8875 15.8875 6.00313 15.75 5.98438C14.8438 5.87188 14.1281 5.15313 14.0156 4.25C14 4.1125 14.1125 4 14.25 4H15.75C15.8875 4 16 4.1125 16 4.25V5.75ZM4 10.25C4 10.1125 4.1125 9.99687 4.25 10.0156C5.15625 10.1281 5.87188 10.8469 5.98438 11.75C6 11.8875 5.8875 12 5.75 12H4.25C4.1125 12 4 11.8875 4 11.75V10.25ZM4.25 5.98438C4.1125 6 4 5.8875 4 5.75V4.25C4 4.1125 4.1125 4 4.25 4H5.75C5.8875 4 6.00313 4.1125 5.98438 4.25C5.87188 5.15625 5.15313 5.87188 4.25 5.98438ZM15.75 10.0156C15.8875 10 16 10.1125 16 10.25V11.75C16 11.8875 15.8875 12 15.75 12H14.25C14.1125 12 13.9969 11.8875 14.0156 11.75C14.1281 10.8438 14.8469 10.1281 15.75 10.0156Z"
                    fill="#4A5565"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4V5H18V4C18 2.89688 17.1031 2 16 2H4C2.89688 2 2 2.89688 2 4ZM2 6.5V12C2 13.1031 2.89688 14 4 14H16C17.1031 14 18 13.1031 18 12V6.5H2ZM4 11.25C4 10.8344 4.33437 10.5 4.75 10.5H6.25C6.66563 10.5 7 10.8344 7 11.25C7 11.6656 6.66563 12 6.25 12H4.75C4.33437 12 4 11.6656 4 11.25ZM8.5 11.25C8.5 10.8344 8.83437 10.5 9.25 10.5H11.25C11.6656 10.5 12 10.8344 12 11.25C12 11.6656 11.6656 12 11.25 12H9.25C8.83437 12 8.5 11.6656 8.5 11.25Z"
                    fill="#9810FA"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.25 0C5.66484 0 6 0.335156 6 0.75V1.5H9V0.75C9 0.335156 9.33516 0 9.75 0C10.1648 0 10.5 0.335156 10.5 0.75V1.5H11.25C12.0773 1.5 12.75 2.17266 12.75 3V9.75C12.75 10.5773 12.0773 11.25 11.25 11.25H3.75C2.92266 11.25 2.25 10.5773 2.25 9.75V3C2.25 2.17266 2.92266 1.5 3.75 1.5H4.5V0.75C4.5 0.335156 4.83516 0 5.25 0ZM3.75 5.625V6.375C3.75 6.58125 3.91875 6.75 4.125 6.75H4.875C5.08125 6.75 5.25 6.58125 5.25 6.375V5.625C5.25 5.41875 5.08125 5.25 4.875 5.25H4.125C3.91875 5.25 3.75 5.41875 3.75 5.625ZM6.75 5.625V6.375C6.75 6.58125 6.91875 6.75 7.125 6.75H7.875C8.08125 6.75 8.25 6.58125 8.25 6.375V5.625C8.25 5.41875 8.08125 5.25 7.875 5.25H7.125C6.91875 5.25 6.75 5.41875 6.75 5.625ZM10.125 5.25C9.91875 5.25 9.75 5.41875 9.75 5.625V6.375C9.75 6.58125 9.91875 6.75 10.125 6.75H10.875C11.0813 6.75 11.25 6.58125 11.25 6.375V5.625C11.25 5.41875 11.0813 5.25 10.875 5.25H10.125ZM3.75 8.625V9.375C3.75 9.58125 3.91875 9.75 4.125 9.75H4.875C5.08125 9.75 5.25 9.58125 5.25 9.375V8.625C5.25 8.41875 5.08125 8.25 4.875 8.25H4.125C3.91875 8.25 3.75 8.41875 3.75 8.625ZM7.125 8.25C6.91875 8.25 6.75 8.41875 6.75 8.625V9.375C6.75 9.58125 6.91875 9.75 7.125 9.75H7.875C8.08125 9.75 8.25 9.58125 8.25 9.375V8.625C8.25 8.41875 8.08125 8.25 7.875 8.25H7.125ZM9.75 8.625V9.375C9.75 9.58125 9.91875 9.75 10.125 9.75H10.875C11.0813 9.75 11.25 9.58125 11.25 9.375V8.625C11.25 8.41875 11.0813 8.25 10.875 8.25H10.125C9.91875 8.25 9.75 8.41875 9.75 8.625Z"
                  fill="#99A1AF"
                />
              </svg>{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
              <svg
                width="15"
                height="12"
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9078 3L10.1039 1.875H4.89844L4.09453 3H10.9078ZM2.25 3.48047C2.25 3.16875 2.34844 2.86406 2.52891 2.60859L3.67734 1.00312C3.95859 0.609375 4.41328 0.375 4.89609 0.375H10.1016C10.5867 0.375 11.0414 0.609375 11.3227 1.00312L12.4688 2.60859C12.6516 2.86406 12.7477 3.16875 12.7477 3.48047L12.75 9.75C12.75 10.5773 12.0773 11.25 11.25 11.25H3.75C2.92266 11.25 2.25 10.5773 2.25 9.75V3.48047Z"
                  fill="#99A1AF"
                />
              </svg>{" "}
              {order.cartItems.length} item
            </span>
            {order.shippingAddress && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="flex items-center gap-1.5 text-gray-500 text-sm font-medium">
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.00039 4.42031C3.00039 1.97813 5.01602 0 7.50039 0C9.98477 0 12.0004 1.97813 12.0004 4.42031C12.0004 7.21641 9.1832 10.568 8.00664 11.8453C7.73008 12.1453 7.26836 12.1453 6.9918 11.8453C5.81523 10.568 2.99805 7.21641 2.99805 4.42031H3.00039ZM7.50039 6C7.89822 6 8.27975 5.84196 8.56105 5.56066C8.84236 5.27936 9.00039 4.89782 9.00039 4.5C9.00039 4.10218 8.84236 3.72064 8.56105 3.43934C8.27975 3.15804 7.89822 3 7.50039 3C7.10257 3 6.72104 3.15804 6.43973 3.43934C6.15843 3.72064 6.00039 4.10218 6.00039 4.5C6.00039 4.89782 6.15843 5.27936 6.43973 5.56066C6.72104 5.84196 7.10257 6 7.50039 6Z"
                      fill="#99A1AF"
                    />
                  </svg>{" "}
                  {order.shippingAddress?.city}
                </span>
              </>
            )}
          </div>
          <div className="flex justify-between pt-[4.5px]">
            <div className="text-2xl font-bold text-gray-900">
              {order.totalOrderPrice.toLocaleString()}{" "}
              <span className="text-sm font-medium text-gray-400">EGP</span>
            </div>
            <button
              onClick={() => setShowProductDetais(!showProductDetails)}
              className={`flex items-center gap-2 ${showProductDetails ? "bg-primary-600 hover:bg-primary-700 text-white shadow-[0px_4px_6px_-4px_#16A34A40,0px_10px_15px_-3px_#16A34A40]" : "bg-gray-100 hover:bg-gray-200 text-gray-700"} text-sm font-semibold rounded-[12px] px-4 py-2.5 transition-all cursor-pointer`}
            >
              {showProductDetails ? (
                <>
                  Hide{" "}
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.02988 2.47032C7.73691 2.17736 7.26113 2.17736 6.96816 2.47032L2.46816 6.97032C2.17519 7.26329 2.17519 7.73907 2.46816 8.03204C2.76113 8.32501 3.23691 8.32501 3.52988 8.03204L7.5002 4.06173L11.4705 8.0297C11.7635 8.32267 12.2393 8.32267 12.5322 8.0297C12.8252 7.73673 12.8252 7.26095 12.5322 6.96798L8.03223 2.46798L8.02988 2.47032Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Details{" "}
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.97012 9.52974C7.26309 9.82271 7.73887 9.82271 8.03184 9.52974L12.5318 5.02974C12.8248 4.73677 12.8248 4.26099 12.5318 3.96802C12.2389 3.67505 11.7631 3.67505 11.4701 3.96802L7.4998 7.93833L3.52949 3.97036C3.23652 3.67739 2.76074 3.67739 2.46777 3.97036C2.1748 4.26333 2.1748 4.73911 2.46777 5.03208L6.96777 9.53208L6.97012 9.52974Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {showProductDetails && (
        <div className="bg-gray-50 border-t border-gray-100 rounded-b-[16px]">
          <div className="p-6">
            <h4 className="flex items-center gap-2 text-sm font-semibold mb-4">
              <div className="w-6 h-6 flex items-center justify-center bg-primary-100 rounded-[8px]">
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.32812 0.0515353C3.52734 -0.0398709 3.76172 -0.00705841 3.92812 0.13591L4.875 0.946848L5.82188 0.13591C6.03281 -0.0445584 6.34453 -0.0445584 6.55313 0.13591L7.5 0.946848L8.44687 0.13591C8.65781 -0.0445584 8.96719 -0.0445584 9.17813 0.13591L10.125 0.946848L11.0719 0.13591C11.2383 -0.00705841 11.4727 -0.0398709 11.6719 0.0515353C11.8711 0.142942 12 0.34216 12 0.562473V11.4375C12 11.6578 11.8711 11.857 11.6719 11.9484C11.4727 12.0398 11.2383 12.007 11.0719 11.864L10.125 11.0531L9.17813 11.864C8.96719 12.0445 8.65781 12.0445 8.44687 11.864L7.5 11.0531L6.55313 11.864C6.34219 12.0445 6.03047 12.0445 5.82188 11.864L4.875 11.0531L3.92812 11.864C3.76172 12.007 3.52734 12.0398 3.32812 11.9484C3.12891 11.857 3 11.6578 3 11.4375V0.562473C3 0.34216 3.12891 0.142942 3.32812 0.0515353ZM5.4375 3.18747C5.12578 3.18747 4.875 3.43825 4.875 3.74997C4.875 4.06169 5.12578 4.31247 5.4375 4.31247H9.5625C9.87422 4.31247 10.125 4.06169 10.125 3.74997C10.125 3.43825 9.87422 3.18747 9.5625 3.18747H5.4375ZM4.875 8.24997C4.875 8.56169 5.12578 8.81247 5.4375 8.81247H9.5625C9.87422 8.81247 10.125 8.56169 10.125 8.24997C10.125 7.93825 9.87422 7.68747 9.5625 7.68747H5.4375C5.12578 7.68747 4.875 7.93825 4.875 8.24997ZM5.4375 5.43747C5.12578 5.43747 4.875 5.68825 4.875 5.99997C4.875 6.31169 5.12578 6.56247 5.4375 6.56247H9.5625C9.87422 6.56247 10.125 6.31169 10.125 5.99997C10.125 5.68825 9.87422 5.43747 9.5625 5.43747H5.4375Z"
                    fill="#16A34A"
                  />
                </svg>
              </div>{" "}
              Order Items
            </h4>
            <div className="space-y-4 max-h-65 overflow-y-auto pr-2">
              {order?.cartItems?.map((item) => (
                <CartItemsCard key={item.product._id} product={item} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 pb-6">
            <div className="bg-white border border-gray-100 rounded-[12px] p-4">
              <h4 className="flex items-center gap-2 font-semibold mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-primary-100 rounded-[8px]">
                  <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.00039 4.42031C3.00039 1.97813 5.01602 0 7.50039 0C9.98477 0 12.0004 1.97813 12.0004 4.42031C12.0004 7.21641 9.1832 10.568 8.00664 11.8453C7.73008 12.1453 7.26836 12.1453 6.9918 11.8453C5.81523 10.568 2.99805 7.21641 2.99805 4.42031H3.00039ZM7.50039 6C7.89822 6 8.27975 5.84196 8.56105 5.56066C8.84236 5.27936 9.00039 4.89782 9.00039 4.5C9.00039 4.10218 8.84236 3.72064 8.56105 3.43934C8.27975 3.15804 7.89822 3 7.50039 3C7.10257 3 6.72104 3.15804 6.43973 3.43934C6.15843 3.72064 6.00039 4.10218 6.00039 4.5C6.00039 4.89782 6.15843 5.27936 6.43973 5.56066C6.72104 5.84196 7.10257 6 7.50039 6Z"
                      fill="#155DFC"
                    />
                  </svg>
                </div>{" "}
                Delivery Address
              </h4>
              {order.shippingAddress ? (
                <div className="space-y-1.75">
                  <p className="text-gray-900 font-medium">
                    {order.shippingAddress?.city}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {order.shippingAddress?.details}
                  </p>
                  <p className="flex items-center gap-2 text-sm font-medium text-gray-600 pt-1.25">
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.25484 0.586223C5.06968 0.143254 4.58687 -0.0911211 4.12749 0.0330976L3.99859 0.0682539C2.48452 0.480754 1.19077 1.94794 1.56812 3.73388C2.43765 7.83544 5.66499 11.0628 9.76655 11.9323C11.5548 12.312 13.0197 11.0159 13.4322 9.50185L13.4673 9.37294C13.5939 8.91122 13.3572 8.42841 12.9166 8.2456L10.6361 7.29638C10.2494 7.13466 9.80171 7.24716 9.53452 7.57294L8.62984 8.67919C6.98218 7.86122 5.65562 6.49247 4.8939 4.812L5.92984 3.96825C6.25562 3.70341 6.36577 3.25575 6.2064 2.86669L5.25484 0.586223Z"
                        fill="#99A1AF"
                      />
                    </svg>{" "}
                    {order.shippingAddress?.phone}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm font-medium">
                  No shipping address available
                </p>
              )}
            </div>
            <div className="bg-[#FEF3C6] border border-[#FEE685] rounded-[12px] p-4">
              <h4 className="flex items-center gap-2 text-gray-900 text-sm font-semibold mb-3">
                <div className="flex items-center justify-center w-6 h-6 bg-[#FE9A00] rounded-[8px] text-sm font-semibold text-gray-900">
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 0C9.0913 0 10.6174 0.632141 11.7426 1.75736C12.8679 2.88258 13.5 4.4087 13.5 6C13.5 7.5913 12.8679 9.11742 11.7426 10.2426C10.6174 11.3679 9.0913 12 7.5 12C5.9087 12 4.38258 11.3679 3.25736 10.2426C2.13214 9.11742 1.5 7.5913 1.5 6C1.5 4.4087 2.13214 2.88258 3.25736 1.75736C4.38258 0.632141 5.9087 0 7.5 0ZM6.9375 2.8125V6C6.9375 6.1875 7.03125 6.36328 7.18828 6.46875L9.43828 7.96875C9.69609 8.14219 10.0453 8.07187 10.2188 7.81172C10.3922 7.55156 10.3219 7.20469 10.0617 7.03125L8.0625 5.7V2.8125C8.0625 2.50078 7.81172 2.25 7.5 2.25C7.18828 2.25 6.9375 2.50078 6.9375 2.8125Z"
                      fill="white"
                    />
                  </svg>
                </div>{" "}
                Order Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm font-medium">
                    Subtotal
                  </span>
                  <span className="text-gray-600 text-sm font-medium">
                    {(
                      order.totalOrderPrice -
                      order.shippingPrice -
                      order.taxPrice
                    ).toLocaleString()}{" "}
                    EGP
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm font-medium">
                    Shipping
                  </span>
                  <span className="text-gray-600 text-sm font-medium">
                    {order.shippingPrice === 0
                      ? "Free"
                      : `${order.shippingPrice.toLocaleString()} EGP`}
                  </span>
                </div>
                <hr className="h-px border-t border-gray-200" />
                <div className="flex justify-between pt-1">
                  <span className="text-sm font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-lg font-bold text-gray-900">
                    {order.totalOrderPrice.toLocaleString()} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
