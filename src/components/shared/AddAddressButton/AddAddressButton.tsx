"use client";

import { useState } from "react";
import AddModalForm from "./AddModalForm/AddModalForm";

export default function AddAddressButton({
  isCheckout,
  isFirstAddress,
}: {
  isCheckout?: boolean;
  isFirstAddress?: boolean;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return isCheckout ? (
    <>
      {" "}
      <button
        type="button"
        onClick={() => setIsOpenModal(true)}
        className="w-full rounded-[12px] bg-[#F0FDF4] border-2 border-dashed border-[#22C55E] p-4 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-[8px] bg-[#22C55E]">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 2C11 1.44687 10.5531 1 10 1C9.44688 1 9 1.44687 9 2V7H4C3.44687 7 3 7.44688 3 8C3 8.55312 3.44687 9 4 9H9V14C9 14.5531 9.44688 15 10 15C10.5531 15 11 14.5531 11 14V9H16C16.5531 9 17 8.55312 17 8C17 7.44688 16.5531 7 16 7H11V2Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-start">
            <p className="font-semibold text-[#15803D]">
              Use a different address
            </p>
            <p className="text-xs font-medium text-gray-500">
              Enter a new shipping address manually
            </p>
          </div>
        </div>
      </button>
      {isOpenModal && <AddModalForm setIsOpenModal={setIsOpenModal} />}
    </>
  ) : isFirstAddress ? (
  <>  <button type="button" onClick={() => setIsOpenModal(true)} className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer">
      <svg
        data-prefix="fas"
        data-icon="plus"
        className="w-5 h-4"
        role="img"
        viewBox="0 0 448 512"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M256 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 160-160 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0 0 160c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160 160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0 0-160z"
        ></path>
      </svg>
      Add Your First Address
    </button>
    {isOpenModal && <AddModalForm setIsOpenModal={setIsOpenModal} />}
    </>
  ) : (
    <>
      {" "}
      <button
        onClick={() => setIsOpenModal(true)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/25 cursor-pointer"
      >
        <svg
          width="18"
          height="14"
          viewBox="0 0 18 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.625 1.75C9.625 1.26602 9.23398 0.875 8.75 0.875C8.26602 0.875 7.875 1.26602 7.875 1.75V6.125H3.5C3.01602 6.125 2.625 6.51602 2.625 7C2.625 7.48398 3.01602 7.875 3.5 7.875H7.875V12.25C7.875 12.734 8.26602 13.125 8.75 13.125C9.23398 13.125 9.625 12.734 9.625 12.25V7.875H14C14.484 7.875 14.875 7.48398 14.875 7C14.875 6.51602 14.484 6.125 14 6.125H9.625V1.75Z"
            fill="currentColor"
          />
        </svg>
        Add Address
      </button>
      {isOpenModal && <AddModalForm setIsOpenModal={setIsOpenModal} />}
    </>
  );
}
