"use client";
import { removeAddress } from "@/actions/addresses.actions";
import { AddressCardPropsType } from "./AddressCardProps.type";
import { confirmDialog } from "@/lib/confirmDialog-utils";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function AddressCard({
  address,
  isCheckOut,
  onSelect,
  isSelected,
}: AddressCardPropsType) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleRemoveAddress(addressId: string) {
    const result = await confirmDialog({
      title: "Remove Address?",
      description: `Are you sure you want to remove this address?`,
      confirmText: "Remove",
      cancelText: "Cancel",
      icon: "trash",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);

    const res = await removeAddress(addressId);

    if (res.status === "success") {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  }

  return isCheckOut ? (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left p-4 border-2 ${isSelected ? "border-primary-500 bg-primary-50 ring-2 ring-primary-500/20" : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"} rounded-[12px] transition-all duration-200 cursor-pointer`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-10 h-10 flex items-center justify-center shrink-0 rounded-[8px] ${isSelected ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500"} transition-colors`}
        >
          {isSelected ? (
            <svg
              data-prefix="fas"
              data-icon="check"
              className="w-5 h-4"
              role="img"
              viewBox="0 0 448 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
              ></path>
            </svg>
          ) : (
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.99922 5.89375C3.99922 2.6375 6.68672 0 9.99922 0C13.3117 0 15.9992 2.6375 15.9992 5.89375C15.9992 9.62188 12.243 14.0906 10.6742 15.7937C10.3055 16.1938 9.68984 16.1938 9.32109 15.7937C7.75234 14.0906 3.99609 9.62188 3.99609 5.89375H3.99922ZM9.99922 8C10.5297 8 11.0384 7.78929 11.4134 7.41421C11.7885 7.03914 11.9992 6.53043 11.9992 6C11.9992 5.46957 11.7885 4.96086 11.4134 4.58579C11.0384 4.21071 10.5297 4 9.99922 4C9.46879 4 8.96008 4.21071 8.58501 4.58579C8.20993 4.96086 7.99922 5.46957 7.99922 6C7.99922 6.53043 8.20993 7.03914 8.58501 7.41421C8.96008 7.78929 9.46879 8 9.99922 8Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold ${isSelected ? "text-primary-700" : "text-gray-900"}`}>{address.name}</p>
          <p className="text-sm font-medium text-gray-600 mt-0.5 line-clamp-1">
            {address.details}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs font-medium text-gray-500">
            <span className="flex items-center gap-1">
              <svg
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.37935 0.488519C4.22506 0.119378 3.82271 -0.0759343 3.4399 0.0275813L3.33248 0.0568782C2.07076 0.400628 0.992636 1.62328 1.30709 3.11157C2.0317 6.52953 4.72115 9.21899 8.13912 9.9436C9.62936 10.26 10.8501 9.17992 11.1938 7.91821L11.2231 7.81078C11.3286 7.42602 11.1313 7.02367 10.7641 6.87133L8.86373 6.08032C8.54146 5.94555 8.16842 6.0393 7.94576 6.31078L7.19186 7.23266C5.81881 6.55102 4.71334 5.41039 4.07857 4.01L4.94185 3.30688C5.21334 3.08617 5.30514 2.71313 5.17232 2.38891L4.37935 0.488519Z"
                  fill="currentColor"
                />
              </svg>
              {address.phone}
            </span>
            <span className="flex items-center gap-1">
              <svg
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.875 0C6.18555 0 5.625 0.560547 5.625 1.25V1.875H4.6875V0.46875C4.6875 0.208984 4.47852 0 4.21875 0C3.95898 0 3.75 0.208984 3.75 0.46875V1.875H2.5V0.46875C2.5 0.208984 2.29102 0 2.03125 0C1.77148 0 1.5625 0.208984 1.5625 0.46875V1.91406C1.02344 2.05273 0.625 2.54297 0.625 3.125V8.75C0.625 9.43945 1.18555 10 1.875 10H10.625C11.3145 10 11.875 9.43945 11.875 8.75V5C11.875 4.31055 11.3145 3.75 10.625 3.75H9.375V1.25C9.375 0.560547 8.81445 0 8.125 0H6.875ZM8.125 2.1875V2.8125C8.125 2.98438 7.98438 3.125 7.8125 3.125H7.1875C7.01562 3.125 6.875 2.98438 6.875 2.8125V2.1875C6.875 2.01562 7.01562 1.875 7.1875 1.875H7.8125C7.98438 1.875 8.125 2.01562 8.125 2.1875ZM7.8125 3.75C7.98438 3.75 8.125 3.89062 8.125 4.0625V4.6875C8.125 4.85938 7.98438 5 7.8125 5H7.1875C7.01562 5 6.875 4.85938 6.875 4.6875V4.0625C6.875 3.89062 7.01562 3.75 7.1875 3.75H7.8125ZM8.125 5.9375V6.5625C8.125 6.73438 7.98438 6.875 7.8125 6.875H7.1875C7.01562 6.875 6.875 6.73438 6.875 6.5625V5.9375C6.875 5.76562 7.01562 5.625 7.1875 5.625H7.8125C7.98438 5.625 8.125 5.76562 8.125 5.9375ZM10.3125 5.625C10.4844 5.625 10.625 5.76562 10.625 5.9375V6.5625C10.625 6.73438 10.4844 6.875 10.3125 6.875H9.6875C9.51562 6.875 9.375 6.73438 9.375 6.5625V5.9375C9.375 5.76562 9.51562 5.625 9.6875 5.625H10.3125ZM5.625 5.9375V6.5625C5.625 6.73438 5.48438 6.875 5.3125 6.875H4.6875C4.51562 6.875 4.375 6.73438 4.375 6.5625V5.9375C4.375 5.76562 4.51562 5.625 4.6875 5.625H5.3125C5.48438 5.625 5.625 5.76562 5.625 5.9375ZM5.3125 3.75C5.48438 3.75 5.625 3.89062 5.625 4.0625V4.6875C5.625 4.85938 5.48438 5 5.3125 5H4.6875C4.51562 5 4.375 4.85938 4.375 4.6875V4.0625C4.375 3.89062 4.51562 3.75 4.6875 3.75H5.3125ZM3.125 5.9375V6.5625C3.125 6.73438 2.98438 6.875 2.8125 6.875H2.1875C2.01562 6.875 1.875 6.73438 1.875 6.5625V5.9375C1.875 5.76562 2.01562 5.625 2.1875 5.625H2.8125C2.98438 5.625 3.125 5.76562 3.125 5.9375ZM2.8125 3.75C2.98438 3.75 3.125 3.89062 3.125 4.0625V4.6875C3.125 4.85938 2.98438 5 2.8125 5H2.1875C2.01562 5 1.875 4.85938 1.875 4.6875V4.0625C1.875 3.89062 2.01562 3.75 2.1875 3.75H2.8125Z"
                  fill="currentColor"
                />
              </svg>
              {address.city}
            </span>
          </div>
        </div>
      </div>
    </button>
  ) : (
    <div className="bg-white rounded-[16px] border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-11 h-11 rounded-[12px] bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
            <svg
              width="23"
              height="19"
              viewBox="0 0 23 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.49961 6.63047C4.49961 2.96719 7.52305 0 11.2496 0C14.9762 0 17.9996 2.96719 17.9996 6.63047C17.9996 10.8246 13.7738 15.852 12.009 17.768C11.5941 18.218 10.9016 18.218 10.4867 17.768C8.72188 15.852 4.49609 10.8246 4.49609 6.63047H4.49961ZM11.2496 9C11.8463 9 12.4186 8.76295 12.8406 8.34099C13.2626 7.91903 13.4996 7.34674 13.4996 6.75C13.4996 6.15326 13.2626 5.58097 12.8406 5.15901C12.4186 4.73705 11.8463 4.5 11.2496 4.5C10.6529 4.5 10.0806 4.73705 9.65862 5.15901C9.23666 5.58097 8.99961 6.15326 8.99961 6.75C8.99961 7.34674 9.23666 7.91903 9.65862 8.34099C10.0806 8.76295 10.6529 9 11.2496 9Z"
                fill="#16A34A"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
            <p className="text-sm font-medium text-gray-600 mb-3 line-clamp-2">
              {address.details}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-1.5">
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.25288 0.586223C5.06773 0.143254 4.58491 -0.0911211 4.12554 0.0330976L3.99663 0.0682539C2.48257 0.480754 1.18882 1.94794 1.56616 3.73388C2.43569 7.83544 5.66304 11.0628 9.7646 11.9323C11.5529 12.312 13.0177 11.0159 13.4302 9.50185L13.4654 9.37294C13.5919 8.91122 13.3552 8.42841 12.9146 8.2456L10.6341 7.29638C10.2474 7.13466 9.79976 7.24716 9.53257 7.57294L8.62788 8.67919C6.98023 7.86122 5.65366 6.49247 4.89194 4.812L5.92788 3.96825C6.25366 3.70341 6.36382 3.25575 6.20444 2.86669L5.25288 0.586223Z"
                    fill="currentColor"
                  />
                </svg>
                {address.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.25 0C7.42266 0 6.75 0.672656 6.75 1.5V2.25H5.625V0.5625C5.625 0.250781 5.37422 0 5.0625 0C4.75078 0 4.5 0.250781 4.5 0.5625V2.25H3V0.5625C3 0.250781 2.74922 0 2.4375 0C2.12578 0 1.875 0.250781 1.875 0.5625V2.29688C1.22812 2.46328 0.75 3.05156 0.75 3.75V10.5C0.75 11.3273 1.42266 12 2.25 12H12.75C13.5773 12 14.25 11.3273 14.25 10.5V6C14.25 5.17266 13.5773 4.5 12.75 4.5H11.25V1.5C11.25 0.672656 10.5773 0 9.75 0H8.25ZM9.75 2.625V3.375C9.75 3.58125 9.58125 3.75 9.375 3.75H8.625C8.41875 3.75 8.25 3.58125 8.25 3.375V2.625C8.25 2.41875 8.41875 2.25 8.625 2.25H9.375C9.58125 2.25 9.75 2.41875 9.75 2.625ZM9.375 4.5C9.58125 4.5 9.75 4.66875 9.75 4.875V5.625C9.75 5.83125 9.58125 6 9.375 6H8.625C8.41875 6 8.25 5.83125 8.25 5.625V4.875C8.25 4.66875 8.41875 4.5 8.625 4.5H9.375ZM9.75 7.125V7.875C9.75 8.08125 9.58125 8.25 9.375 8.25H8.625C8.41875 8.25 8.25 8.08125 8.25 7.875V7.125C8.25 6.91875 8.41875 6.75 8.625 6.75H9.375C9.58125 6.75 9.75 6.91875 9.75 7.125ZM12.375 6.75C12.5813 6.75 12.75 6.91875 12.75 7.125V7.875C12.75 8.08125 12.5813 8.25 12.375 8.25H11.625C11.4187 8.25 11.25 8.08125 11.25 7.875V7.125C11.25 6.91875 11.4187 6.75 11.625 6.75H12.375ZM6.75 7.125V7.875C6.75 8.08125 6.58125 8.25 6.375 8.25H5.625C5.41875 8.25 5.25 8.08125 5.25 7.875V7.125C5.25 6.91875 5.41875 6.75 5.625 6.75H6.375C6.58125 6.75 6.75 6.91875 6.75 7.125ZM6.375 4.5C6.58125 4.5 6.75 4.66875 6.75 4.875V5.625C6.75 5.83125 6.58125 6 6.375 6H5.625C5.41875 6 5.25 5.83125 5.25 5.625V4.875C5.25 4.66875 5.41875 4.5 5.625 4.5H6.375ZM3.75 7.125V7.875C3.75 8.08125 3.58125 8.25 3.375 8.25H2.625C2.41875 8.25 2.25 8.08125 2.25 7.875V7.125C2.25 6.91875 2.41875 6.75 2.625 6.75H3.375C3.58125 6.75 3.75 6.91875 3.75 7.125ZM3.375 4.5C3.58125 4.5 3.75 4.66875 3.75 4.875V5.625C3.75 5.83125 3.58125 6 3.375 6H2.625C2.41875 6 2.25 5.83125 2.25 5.625V4.875C2.25 4.66875 2.41875 4.5 2.625 4.5H3.375Z"
                    fill="currentColor"
                  />
                </svg>
                {address.city}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors cursor-pointer"
            title="Edit address"
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3989 0.579688L10.1712 1.80742L13.9419 5.57812L15.1696 4.35039C15.5415 3.98125 15.7493 3.47813 15.7493 2.95312C15.7493 2.42812 15.5415 1.925 15.1696 1.55586L14.1934 0.579688C13.8243 0.207813 13.3212 0 12.7962 0C12.2712 0 11.768 0.207813 11.3989 0.579688ZM9.2442 2.73438L3.35983 8.61602C3.06725 8.90859 2.85397 9.275 2.74186 9.67422L1.77389 13.1687C1.711 13.3957 1.77389 13.6418 1.94342 13.8086C2.11295 13.9754 2.35631 14.041 2.58327 13.9781L6.0778 13.0074C6.47702 12.8953 6.84069 12.6848 7.136 12.3895L13.0149 6.50508L9.2442 2.73438Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
            title="Delete address"
            onClick={() => handleRemoveAddress(address._id)}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <svg
                width="18"
                height="15"
                viewBox="0 0 18 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.36289 0.598828L6.125 1.3125H3.5C3.01602 1.3125 2.625 1.70352 2.625 2.1875C2.625 2.67148 3.01602 3.0625 3.5 3.0625H14C14.484 3.0625 14.875 2.67148 14.875 2.1875C14.875 1.70352 14.484 1.3125 14 1.3125H11.375L11.1371 0.598828C11.0168 0.240625 10.6832 0 10.3059 0H7.19414C6.8168 0 6.4832 0.240625 6.36289 0.598828ZM14 4.375H3.5L4.07695 13.2098C4.1207 13.9016 4.69492 14.4375 5.38672 14.4375H12.1133C12.8051 14.4375 13.3793 13.9016 13.423 13.2098L14 4.375Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
