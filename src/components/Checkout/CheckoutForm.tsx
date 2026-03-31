"use client";
import { ShippingAddressDataType } from "@/components/Checkout/shipping-address.type";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { BsHash } from "react-icons/bs";
import { defaultValues } from "./shipping-address.data";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingAddressSchema } from "@/schema/shippingAddress.schema";
import { createOrder } from "@/actions/orders.actions";
import CheckoutProductCard from "./CheckoutProductCard";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useCart } from "@/hook/useCart";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { FaShieldHalved } from "react-icons/fa6";
import { OrderCardType, OrderCashType } from "@/types/order.types";
import AddressCard from "../shared/AddressCard/AddressCard";
import { Address, UserAddressesType } from "@/types/addresses.types";
import AddAddressButton from "../shared/AddAddressButton/AddAddressButton";
import { CartType } from "@/types/cart.types";

export default function CheckoutForm({
  cartId,
  cartItems,
  userAddresses
}: {
  cartId: string;
  cartItems: CartType;
  userAddresses: UserAddressesType;
}) {
  const router = useRouter();
  const { updateCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const { handleSubmit, control, watch, setValue, reset } = useForm<ShippingAddressDataType>(
    {
      defaultValues,
      resolver: zodResolver(shippingAddressSchema),
      mode: "onChange",
    },
  );

  function handleSelectAddress(address: Address) {
  if (selectedAddress === address._id) {
    setSelectedAddress(null);
    reset(defaultValues);
    return;
  }

  setSelectedAddress(address._id);

  setValue("city", address.city);
  setValue("details", address.details);
  setValue("phone", address.phone);
}


  const selectedPaymentMethod = watch("paymentMethod");
  

  async function checkoutSubmit(data: ShippingAddressDataType) {
    setIsLoading(true);

    if(selectedPaymentMethod === "cash"){
    const res: OrderCashType = await createOrder(cartId, data);
        if(res.status === "success"){
            toast.success(res.message)
            updateCart([],0)
            router.push("/allorders")
        } else{
            toast.error(res.message)
        }
    }
    else{
    const res: OrderCardType = await createOrder(cartId, data);
    if(res.status === "success"){
        open(res.session.url, "_self")
    }
    else{
        toast.error(res.message)
    }
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(checkoutSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[16px] border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg
                  width="23"
                  height="18"
                  viewBox="0 0 23 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.017 0.302356C11.5846 -0.0984253 10.9166 -0.0984253 10.4877 0.302356L2.61269 7.61486C2.27519 7.93126 2.16269 8.41993 2.33144 8.84884C2.50019 9.27775 2.91151 9.56251 3.37558 9.56251H3.93808V15.75C3.93808 16.991 4.94706 18 6.18808 18H16.3131C17.5541 18 18.5631 16.991 18.5631 15.75V9.56251H19.1256C19.5896 9.56251 20.0045 9.27775 20.1732 8.84884C20.342 8.41993 20.2295 7.92775 19.892 7.61486L12.017 0.302356ZM10.6881 11.25H11.8131C12.7447 11.25 13.5006 12.0059 13.5006 12.9375V16.3125H9.00058V12.9375C9.00058 12.0059 9.75644 11.25 10.6881 11.25Z"
                    fill="currentColor"
                  />
                </svg>
                Shipping Address
              </h2>
              <p className="text-primary-100 text-sm font-medium mt-1">
                Where should we deliver your order?
              </p>
            </div>
            <div className="p-6 space-y-5">
              <div className="border-b border-[#F3F4F6] pb-5">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.25 0C4.28477 0 3.5 0.784766 3.5 1.75V13.125C3.5 13.4395 3.66953 13.732 3.94297 13.8852C4.21641 14.0383 4.55273 14.0355 4.82344 13.8742L8.75 11.5199L12.6738 13.8742C12.9445 14.0355 13.2809 14.041 13.5543 13.8852C13.8277 13.7293 14 13.4395 14 13.125V1.75C14 0.784766 13.2152 0 12.25 0H5.25Z"
                      fill="#22C55E"
                    />
                  </svg>
                  <span className="font-semibold">Saved Addresses</span>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-600">
                    Select a saved address or enter a new one below
                  </p>
                  {userAddresses?.data?.map((address) => (
                  <AddressCard key={address._id} address={address} isCheckOut={true} onSelect={()=> handleSelectAddress(address)} isSelected={selectedAddress === address._id} />
                  ))}
                  <AddAddressButton isCheckout={true}/>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#F0FDF4] rounded-[12px] border border-[#DCFCE7]">
                <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75 14C10.6065 14 12.387 13.2625 13.6997 11.9497C15.0125 10.637 15.75 8.85652 15.75 7C15.75 5.14348 15.0125 3.36301 13.6997 2.05025C12.387 0.737498 10.6065 0 8.75 0C6.89348 0 5.11301 0.737498 3.80025 2.05025C2.4875 3.36301 1.75 5.14348 1.75 7C1.75 8.85652 2.4875 10.637 3.80025 11.9497C5.11301 13.2625 6.89348 14 8.75 14ZM7.875 4.375C7.875 4.14294 7.96719 3.92038 8.13128 3.75628C8.29538 3.59219 8.51794 3.5 8.75 3.5C8.98206 3.5 9.20462 3.59219 9.36872 3.75628C9.53281 3.92038 9.625 4.14294 9.625 4.375C9.625 4.60706 9.53281 4.82962 9.36872 4.99372C9.20462 5.15781 8.98206 5.25 8.75 5.25C8.51794 5.25 8.29538 5.15781 8.13128 4.99372C7.96719 4.82962 7.875 4.60706 7.875 4.375ZM7.65625 6.125H8.96875C9.33242 6.125 9.625 6.41758 9.625 6.78125V9.1875H9.84375C10.2074 9.1875 10.5 9.48008 10.5 9.84375C10.5 10.2074 10.2074 10.5 9.84375 10.5H7.65625C7.29258 10.5 7 10.2074 7 9.84375C7 9.48008 7.29258 9.1875 7.65625 9.1875H8.3125V7.4375H7.65625C7.29258 7.4375 7 7.14492 7 6.78125C7 6.41758 7.29258 6.125 7.65625 6.125Z"
                      fill="#155DFC"
                    />
                  </svg>
                </div>
                <div className="font-medium">
                  <p className="text-sm text-blue-800">Delivery Information</p>
                  <p className="text-xs text-blue-600">
                    Please ensure your address is accurate for smooth delivery
                  </p>
                </div>
              </div>
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2 mb-5"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-gray-700 font-semibold gap-1"
                    >
                      City <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        autoComplete="on"
                        className="h-[55.2px] py-3.5 px-4 pl-14 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-gray-100 flex items-center justify-center">
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.625 0C8.65977 0 7.875 0.784766 7.875 1.75V2.625H6.5625V0.65625C6.5625 0.292578 6.26992 0 5.90625 0C5.54258 0 5.25 0.292578 5.25 0.65625V2.625H3.5V0.65625C3.5 0.292578 3.20742 0 2.84375 0C2.48008 0 2.1875 0.292578 2.1875 0.65625V2.67969C1.43281 2.87383 0.875 3.56016 0.875 4.375V12.25C0.875 13.2152 1.65977 14 2.625 14H14.875C15.8402 14 16.625 13.2152 16.625 12.25V7C16.625 6.03477 15.8402 5.25 14.875 5.25H13.125V1.75C13.125 0.784766 12.3402 0 11.375 0H9.625ZM11.375 3.0625V3.9375C11.375 4.17812 11.1781 4.375 10.9375 4.375H10.0625C9.82187 4.375 9.625 4.17812 9.625 3.9375V3.0625C9.625 2.82188 9.82187 2.625 10.0625 2.625H10.9375C11.1781 2.625 11.375 2.82188 11.375 3.0625ZM10.9375 5.25C11.1781 5.25 11.375 5.44688 11.375 5.6875V6.5625C11.375 6.80312 11.1781 7 10.9375 7H10.0625C9.82187 7 9.625 6.80312 9.625 6.5625V5.6875C9.625 5.44688 9.82187 5.25 10.0625 5.25H10.9375ZM11.375 8.3125V9.1875C11.375 9.42813 11.1781 9.625 10.9375 9.625H10.0625C9.82187 9.625 9.625 9.42813 9.625 9.1875V8.3125C9.625 8.07187 9.82187 7.875 10.0625 7.875H10.9375C11.1781 7.875 11.375 8.07187 11.375 8.3125ZM14.4375 7.875C14.6781 7.875 14.875 8.07187 14.875 8.3125V9.1875C14.875 9.42813 14.6781 9.625 14.4375 9.625H13.5625C13.3219 9.625 13.125 9.42813 13.125 9.1875V8.3125C13.125 8.07187 13.3219 7.875 13.5625 7.875H14.4375ZM7.875 8.3125V9.1875C7.875 9.42813 7.67812 9.625 7.4375 9.625H6.5625C6.32188 9.625 6.125 9.42813 6.125 9.1875V8.3125C6.125 8.07187 6.32188 7.875 6.5625 7.875H7.4375C7.67812 7.875 7.875 8.07187 7.875 8.3125ZM7.4375 5.25C7.67812 5.25 7.875 5.44688 7.875 5.6875V6.5625C7.875 6.80312 7.67812 7 7.4375 7H6.5625C6.32188 7 6.125 6.80312 6.125 6.5625V5.6875C6.125 5.44688 6.32188 5.25 6.5625 5.25H7.4375ZM4.375 8.3125V9.1875C4.375 9.42813 4.17812 9.625 3.9375 9.625H3.0625C2.82187 9.625 2.625 9.42813 2.625 9.1875V8.3125C2.625 8.07187 2.82187 7.875 3.0625 7.875H3.9375C4.17812 7.875 4.375 8.07187 4.375 8.3125ZM3.9375 5.25C4.17812 5.25 4.375 5.44688 4.375 5.6875V6.5625C4.375 6.80312 4.17812 7 3.9375 7H3.0625C2.82187 7 2.625 6.80312 2.625 6.5625V5.6875C2.625 5.44688 2.82187 5.25 3.0625 5.25H3.9375Z"
                            fill="#6A7282"
                          />
                        </svg>
                      </div>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="details"
                control={control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="gap-2 mb-5"
                  >
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-gray-700 font-semibold gap-1"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Textarea
                        {...field}
                        id={field.name}
                        rows={3}
                        aria-invalid={fieldState.invalid}
                        placeholder="Street name, building number, floor, apartment..."
                        autoComplete="on"
                        className="min-h-26 py-3.5 px-4 pl-14 mb-1.75 text-[16px]! font-medium resize-none text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                      />
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-[8px] bg-gray-100 flex items-center justify-center">
                        <svg
                          width="18"
                          height="15"
                          viewBox="0 0 18 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.50078 5.15703C3.50078 2.30781 5.85234 0 8.75078 0C11.6492 0 14.0008 2.30781 14.0008 5.15703C14.0008 8.41914 10.7141 12.3293 9.34141 13.8195C9.01875 14.1695 8.48008 14.1695 8.15742 13.8195C6.78477 12.3293 3.49805 8.41914 3.49805 5.15703H3.50078ZM8.75078 7C9.21491 7 9.66003 6.81563 9.98822 6.48744C10.3164 6.15925 10.5008 5.71413 10.5008 5.25C10.5008 4.78587 10.3164 4.34075 9.98822 4.01256C9.66003 3.68437 9.21491 3.5 8.75078 3.5C8.28665 3.5 7.84153 3.68437 7.51334 4.01256C7.18516 4.34075 7.00078 4.78587 7.00078 5.25C7.00078 5.71413 7.18516 6.15925 7.51334 6.48744C7.84153 6.81563 8.28665 7 8.75078 7Z"
                            fill="#6A7282"
                          />
                        </svg>
                      </div>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-gray-700 font-semibold gap-1"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="01xxxxxxxxx"
                        autoComplete="on"
                        className="h-[55.2px] py-3.5 px-4 pl-14 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-gray-100 flex items-center justify-center">
                        <svg
                          width="18"
                          height="14"
                          viewBox="0 0 18 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.13032 0.683926C5.9143 0.16713 5.35102 -0.106308 4.81508 0.0386139L4.66469 0.0796295C2.89828 0.56088 1.38891 2.2726 1.82914 4.35619C2.8436 9.14135 6.60883 12.9066 11.394 13.921C13.4803 14.364 15.1893 12.8519 15.6706 11.0855L15.7116 10.9351C15.8592 10.3964 15.583 9.83315 15.069 9.61986L12.4084 8.51244C11.9573 8.32377 11.435 8.45502 11.1233 8.8351L10.0678 10.1257C8.14555 9.17143 6.59789 7.57455 5.70922 5.614L6.91782 4.62963C7.29789 4.32065 7.42641 3.79838 7.24047 3.34447L6.13032 0.683926Z"
                            fill="#6A7282"
                          />
                        </svg>
                      </div>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="postalCode"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-gray-700 font-semibold gap-1"
                    >
                      Postal Code
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="12345"
                        inputMode="numeric"
                        maxLength={5}
                        autoComplete="on"
                        className="h-[55.2px] py-3.5 px-4 pl-14 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-gray-100 flex items-center justify-center">
                        <BsHash className="text-xl text-gray-500" />
                      </div>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                        5 digits only
                      </span>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
          <div className="bg-white rounded-[16px] border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg
                  width="23"
                  height="18"
                  viewBox="0 0 23 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 1.125C3.25898 1.125 2.25 2.13398 2.25 3.375V13.5C2.25 14.741 3.25898 15.75 4.5 15.75H18C19.241 15.75 20.25 14.741 20.25 13.5V6.75C20.25 5.50898 19.241 4.5 18 4.5H4.78125C4.31367 4.5 3.9375 4.12383 3.9375 3.65625C3.9375 3.18867 4.31367 2.8125 4.78125 2.8125H18.2812C18.7488 2.8125 19.125 2.43633 19.125 1.96875C19.125 1.50117 18.7488 1.125 18.2812 1.125H4.5ZM16.875 9C17.1734 9 17.4595 9.11853 17.6705 9.3295C17.8815 9.54048 18 9.82663 18 10.125C18 10.4234 17.8815 10.7095 17.6705 10.9205C17.4595 11.1315 17.1734 11.25 16.875 11.25C16.5766 11.25 16.2905 11.1315 16.0795 10.9205C15.8685 10.7095 15.75 10.4234 15.75 10.125C15.75 9.82663 15.8685 9.54048 16.0795 9.3295C16.2905 9.11853 16.5766 9 16.875 9Z"
                    fill="white"
                  />
                </svg>
                Payment Method
              </h2>
              <p className="text-primary-100 text-sm font-medium mt-1">
                Choose how you&apos;d like to pay
              </p>
            </div>

            <div className="p-6 space-y-4">
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="grid gap-4"
                  >
                    {/* CASH OPTION */}
                    <label
                      htmlFor="cash"
                      className={`w-full p-5 rounded-[12px] border-2 transition-all flex items-center gap-4 cursor-pointer ${
                        field.value === "cash"
                          ? "border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm"
                          : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                      }`}
                    >
                      <RadioGroupItem
                        value="cash"
                        id="cash"
                        className="hidden"
                      />

                      <div
                        className={`w-14 h-14 rounded-[12px] flex items-center justify-center transition-all ${
                          field.value === "cash"
                            ? "bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <svg
                          width="25"
                          height="20"
                          viewBox="0 0 25 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 2.5C3.62109 2.5 2.5 3.62109 2.5 5V15C2.5 16.3789 3.62109 17.5 5 17.5H20C21.3789 17.5 22.5 16.3789 22.5 15V5C22.5 3.62109 21.3789 2.5 20 2.5H5ZM12.5 6.25C13.4946 6.25 14.4484 6.64509 15.1517 7.34835C15.8549 8.05161 16.25 9.00544 16.25 10C16.25 10.9946 15.8549 11.9484 15.1517 12.6517C14.4484 13.3549 13.4946 13.75 12.5 13.75C11.5054 13.75 10.5516 13.3549 9.84835 12.6517C9.14509 11.9484 8.75 10.9946 8.75 10C8.75 9.00544 9.14509 8.05161 9.84835 7.34835C10.5516 6.64509 11.5054 6.25 12.5 6.25ZM20 7.1875C20 7.35938 19.8594 7.50391 19.6875 7.48047C18.5547 7.33984 17.6602 6.44141 17.5195 5.3125C17.5 5.14062 17.6406 5 17.8125 5H19.6875C19.8594 5 20 5.14062 20 5.3125V7.1875ZM5 12.8125C5 12.6406 5.14062 12.4961 5.3125 12.5195C6.44531 12.6602 7.33984 13.5586 7.48047 14.6875C7.5 14.8594 7.35938 15 7.1875 15H5.3125C5.14062 15 5 14.8594 5 14.6875V12.8125ZM5.3125 7.48047C5.14062 7.5 5 7.35938 5 7.1875V5.3125C5 5.14062 5.14062 5 5.3125 5H7.1875C7.35938 5 7.50391 5.14062 7.48047 5.3125C7.33984 6.44531 6.44141 7.33984 5.3125 7.48047ZM19.6875 12.5195C19.8594 12.5 20 12.6406 20 12.8125V14.6875C20 14.8594 19.8594 15 19.6875 15H17.8125C17.6406 15 17.4961 14.8594 17.5195 14.6875C17.6602 13.5547 18.5586 12.6602 19.6875 12.5195Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      <div className="flex-1 text-left">
                        <h3
                          className={`font-bold ${
                            field.value === "cash"
                              ? "text-primary-700"
                              : "text-gray-900"
                          }`}
                        >
                          Cash on Delivery
                        </h3>

                        <p className="text-sm font-medium text-gray-500 mt-0.5">
                          Pay when your order arrives at your doorstep
                        </p>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          field.value === "cash"
                            ? "bg-primary-600 text-white"
                            : "border-2 border-gray-200"
                        }`}
                      >
                        {field.value === "cash" && (
                          <svg
                            width="15"
                            height="12"
                            viewBox="0 0 15 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.44 1.64292C12.7752 1.88667 12.8502 2.35542 12.6064 2.69057L6.60645 10.9406C6.47754 11.1187 6.27832 11.2289 6.05801 11.2476C5.8377 11.2664 5.62441 11.1843 5.46973 11.0296L2.46973 8.02964C2.17676 7.73667 2.17676 7.26089 2.46973 6.96792C2.7627 6.67495 3.23848 6.67495 3.53145 6.96792L5.91035 9.34682L11.3947 1.80698C11.6385 1.47182 12.1072 1.39682 12.4424 1.64057L12.44 1.64292Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>
                    </label>

                    {/* CARD OPTION */}
                    <label
                      htmlFor="card"
                      className={`w-full p-5 rounded-[12px] border-2 transition-all flex items-center gap-4 cursor-pointer ${
                        field.value === "card"
                          ? "border-primary-500 bg-linear-to-r from-primary-50 to-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                      }`}
                    >
                      <RadioGroupItem
                        value="card"
                        id="card"
                        className="hidden"
                      />

                      <div
                        className={`w-14 h-14 rounded-[12px] flex items-center justify-center transition-all ${
                          field.value === "card"
                            ? "bg-linear-to-br from-primary-500 to-blue-600 text-white shadow-lg shadow-primary-500/30"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <svg
                          width="25"
                          height="20"
                          viewBox="0 0 25 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 5V6.25H22.5V5C22.5 3.62109 21.3789 2.5 20 2.5H5C3.62109 2.5 2.5 3.62109 2.5 5ZM2.5 8.125V15C2.5 16.3789 3.62109 17.5 5 17.5H20C21.3789 17.5 22.5 16.3789 22.5 15V8.125H2.5ZM5 14.0625C5 13.543 5.41797 13.125 5.9375 13.125H7.8125C8.33203 13.125 8.75 13.543 8.75 14.0625C8.75 14.582 8.33203 15 7.8125 15H5.9375C5.41797 15 5 14.582 5 14.0625ZM10.625 14.0625C10.625 13.543 11.043 13.125 11.5625 13.125H14.0625C14.582 13.125 15 13.543 15 14.0625C15 14.582 14.582 15 14.0625 15H11.5625C11.043 15 10.625 14.582 10.625 14.0625Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      <div className="flex-1 text-left">
                        <h3
                          className={`font-bold ${
                            field.value === "card"
                              ? "text-primary-700"
                              : "text-gray-900"
                          }`}
                        >
                          Pay Online
                        </h3>

                        <p className="text-sm font-medium text-gray-500 mt-0.5">
                          Secure payment with Credit/Debit Card via Stripe
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Image
                            alt="Visa"
                            src="/images/visa.png"
                            width={20}
                            height={20}
                          />
                          <Image
                            alt="Mastercard"
                            src="/images/master-card.png"
                            width={20}
                            height={20}
                          />
                          <Image
                            alt="Amex"
                            src="/images/amex.png"
                            width={20}
                            height={20}
                          />
                        </div>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          field.value === "card"
                            ? "bg-primary-600 text-white"
                            : "border-2 border-gray-200"
                        }`}
                      >
                        {field.value === "card" && (
                          <svg
                            width="15"
                            height="12"
                            viewBox="0 0 15 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.44 1.64292C12.7752 1.88667 12.8502 2.35542 12.6064 2.69057L6.60645 10.9406C6.47754 11.1187 6.27832 11.2289 6.05801 11.2476C5.8377 11.2664 5.62441 11.1843 5.46973 11.0296L2.46973 8.02964C2.17676 7.73667 2.17676 7.26089 2.46973 6.96792C2.7627 6.67495 3.23848 6.67495 3.53145 6.96792L5.91035 9.34682L11.3947 1.80698C11.6385 1.47182 12.1072 1.39682 12.4424 1.64057L12.44 1.64292Z"
                              fill="currentColor"
                            />
                          </svg>
                        )}
                      </div>
                    </label>
                  </RadioGroup>
                )}
              />
              <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-[12px] border border-green-100 mt-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0008 0C10.1445 0 10.2883 0.03125 10.4195 0.090625L16.307 2.5875C16.9945 2.87813 17.507 3.55625 17.5039 4.375C17.4883 7.475 16.2133 13.1469 10.8289 15.725C10.307 15.975 9.7008 15.975 9.17892 15.725C3.79142 13.1469 2.51955 7.475 2.50392 4.375C2.5008 3.55625 3.0133 2.87813 3.7008 2.5875L9.58517 0.090625C9.71642 0.03125 9.85705 0 10.0008 0ZM10.0008 2.0875V13.9031C14.3133 11.8156 15.4727 7.19063 15.5008 4.42188L10.0008 2.09063V2.0875Z"
                      fill="#00A63E"
                    />
                  </svg>
                </div>
                <div className="font-medium">
                  <p className="text-sm text-green-800">
                    Secure &amp; Encrypted
                  </p>
                  <p className="text-xs text-green-600 mt-0.5">
                    Your payment info is protected with 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[16px] border border-gray-100 overflow-hidden shadow-sm sticky top-4">
            <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <svg
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 3.9375C9 2.69648 10.009 1.6875 11.25 1.6875C12.491 1.6875 13.5 2.69648 13.5 3.9375V5.625H9V3.9375ZM7.3125 5.625H5.0625C4.13086 5.625 3.375 6.38086 3.375 7.3125V14.625C3.375 16.4883 4.88672 18 6.75 18H15.75C17.6133 18 19.125 16.4883 19.125 14.625V7.3125C19.125 6.38086 18.3691 5.625 17.4375 5.625H15.1875V3.9375C15.1875 1.76133 13.4262 0 11.25 0C9.07383 0 7.3125 1.76133 7.3125 3.9375V5.625ZM8.15625 7.3125C8.26705 7.3125 8.37677 7.33432 8.47914 7.37673C8.58151 7.41913 8.67452 7.48128 8.75287 7.55963C8.83122 7.63798 8.89337 7.73099 8.93577 7.83336C8.97818 7.93573 9 8.04545 9 8.15625C9 8.26705 8.97818 8.37677 8.93577 8.47914C8.89337 8.58151 8.83122 8.67452 8.75287 8.75287C8.67452 8.83122 8.58151 8.89337 8.47914 8.93577C8.37677 8.97818 8.26705 9 8.15625 9C8.04545 9 7.93573 8.97818 7.83336 8.93577C7.73099 8.89337 7.63798 8.83122 7.55963 8.75287C7.48128 8.67452 7.41913 8.58151 7.37673 8.47914C7.33432 8.37677 7.3125 8.26705 7.3125 8.15625C7.3125 8.04545 7.33432 7.93573 7.37673 7.83336C7.41913 7.73099 7.48128 7.63798 7.55963 7.55963C7.63798 7.48128 7.73099 7.41913 7.83336 7.37673C7.93573 7.33432 8.04545 7.3125 8.15625 7.3125ZM13.5 8.15625C13.5 7.93247 13.5889 7.71786 13.7471 7.55963C13.9054 7.40139 14.12 7.3125 14.3438 7.3125C14.5675 7.3125 14.7821 7.40139 14.9404 7.55963C15.0986 7.71786 15.1875 7.93247 15.1875 8.15625C15.1875 8.38003 15.0986 8.59464 14.9404 8.75287C14.7821 8.91111 14.5675 9 14.3438 9C14.12 9 13.9054 8.91111 13.7471 8.75287C13.5889 8.59464 13.5 8.38003 13.5 8.15625Z"
                    fill="currentColor"
                  />
                </svg>
                Order Summary
              </h2>
              <p className="text-primary-100 text-sm font-medium mt-1">
                {cartItems.numOfCartItems} items
              </p>
            </div>
            <div className="p-5">
              <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                {cartItems?.data?.products?.map((product) => (
                  <CheckoutProductCard
                    key={product.product._id}
                    product={product}
                  />
                ))}
              </div>
              <hr className="border-gray-100 my-4" />
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span>
                    {cartItems.data.totalCartPrice.toLocaleString()} EGP
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span className="flex items-center gap-2">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 3C1 1.89688 1.89688 1 3 1H12C13.1031 1 14 1.89688 14 3V4H15.5844C16.1156 4 16.625 4.20937 17 4.58437L18.4156 6C18.7906 6.375 19 6.88438 19 7.41563V12C19 13.1031 18.1031 14 17 14H16.8969C16.5719 15.1531 15.5094 16 14.25 16C12.9906 16 11.9312 15.1531 11.6031 14H8.39687C8.07188 15.1531 7.00938 16 5.75 16C4.49062 16 3.43125 15.1531 3.10313 14H3C1.89688 14 1 13.1031 1 12V3ZM17 9V7.41563L15.5844 6H14V9H17ZM7 13.25C7 12.9185 6.8683 12.6005 6.63388 12.3661C6.39946 12.1317 6.08152 12 5.75 12C5.41848 12 5.10054 12.1317 4.86612 12.3661C4.6317 12.6005 4.5 12.9185 4.5 13.25C4.5 13.5815 4.6317 13.8995 4.86612 14.1339C5.10054 14.3683 5.41848 14.5 5.75 14.5C6.08152 14.5 6.39946 14.3683 6.63388 14.1339C6.8683 13.8995 7 13.5815 7 13.25ZM14.25 14.5C14.5815 14.5 14.8995 14.3683 15.1339 14.1339C15.3683 13.8995 15.5 13.5815 15.5 13.25C15.5 12.9185 15.3683 12.6005 15.1339 12.3661C14.8995 12.1317 14.5815 12 14.25 12C13.9185 12 13.6005 12.1317 13.3661 12.3661C13.1317 12.6005 13 12.9185 13 13.25C13 13.5815 13.1317 13.8995 13.3661 14.1339C13.6005 14.3683 13.9185 14.5 14.25 14.5Z"
                        fill="#99A1AF"
                      />
                    </svg>
                    Shipping
                  </span>
                  <span className="text-green-600 font-semibold">FREE</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary-600">
                      {cartItems.data.totalCartPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-gray-500 ml-1">
                      EGP
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-[12px] font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98] cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Spinner /> Processing...
                  </>
                ) : selectedPaymentMethod === "cash" ? (
                  <>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5437 4L13.4719 2.5H6.53125L5.45937 4H14.5437ZM3 4.64062C3 4.225 3.13125 3.81875 3.37187 3.47813L4.90313 1.3375C5.27813 0.8125 5.88438 0.5 6.52813 0.5H13.4688C14.1156 0.5 14.7219 0.8125 15.0969 1.3375L16.625 3.47813C16.8687 3.81875 16.9969 4.225 16.9969 4.64062L17 13C17 14.1031 16.1031 15 15 15H5C3.89688 15 3 14.1031 3 13V4.64062Z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                    Place Order
                  </>
                ) : (
                  <>
                    <FaShieldHalved className="w-5 h-4" />
                    Proceed to Payment
                  </>
                )}
              </button>
              <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.49962 0C7.60743 0 7.71524 0.0234375 7.81368 0.0679688L12.2293 1.94063C12.7449 2.15859 13.1293 2.66719 13.127 3.28125C13.1152 5.60625 12.159 9.86016 8.12071 11.7938C7.72931 11.9813 7.27462 11.9813 6.88321 11.7938C2.84259 9.86016 1.88868 5.60625 1.87696 3.28125C1.87462 2.66719 2.259 2.15859 2.77462 1.94063L7.1879 0.0679688C7.28634 0.0234375 7.39181 0 7.49962 0ZM7.49962 1.56563V10.4273C10.734 8.86172 11.6035 5.39297 11.6246 3.31641L7.49962 1.56797V1.56563Z"
                      fill="#00C950"
                    />
                  </svg>

                  <span className="text-xs font-medium text-gray-500">
                    Secure
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="12"
                    viewBox="0 0 14 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 2.25C0 1.42266 0.672656 0.75 1.5 0.75H8.25C9.07734 0.75 9.75 1.42266 9.75 2.25V3H10.9383C11.3367 3 11.7188 3.15703 12 3.43828L13.0617 4.5C13.343 4.78125 13.5 5.16328 13.5 5.56172V9C13.5 9.82734 12.8273 10.5 12 10.5H11.9227C11.6789 11.3648 10.882 12 9.9375 12C8.99297 12 8.19844 11.3648 7.95234 10.5H5.54766C5.30391 11.3648 4.50703 12 3.5625 12C2.61797 12 1.82344 11.3648 1.57734 10.5H1.5C0.672656 10.5 0 9.82734 0 9V2.25ZM12 6.75V5.56172L10.9383 4.5H9.75V6.75H12ZM4.5 9.9375C4.5 9.68886 4.40123 9.4504 4.22541 9.27459C4.0496 9.09877 3.81114 9 3.5625 9C3.31386 9 3.0754 9.09877 2.89959 9.27459C2.72377 9.4504 2.625 9.68886 2.625 9.9375C2.625 10.1861 2.72377 10.4246 2.89959 10.6004C3.0754 10.7762 3.31386 10.875 3.5625 10.875C3.81114 10.875 4.0496 10.7762 4.22541 10.6004C4.40123 10.4246 4.5 10.1861 4.5 9.9375ZM9.9375 10.875C10.1861 10.875 10.4246 10.7762 10.6004 10.6004C10.7762 10.4246 10.875 10.1861 10.875 9.9375C10.875 9.68886 10.7762 9.4504 10.6004 9.27459C10.4246 9.09877 10.1861 9 9.9375 9C9.68886 9 9.4504 9.09877 9.27459 9.27459C9.09877 9.4504 9 9.68886 9 9.9375C9 10.1861 9.09877 10.4246 9.27459 10.6004C9.4504 10.7762 9.68886 10.875 9.9375 10.875Z"
                      fill="#2B7FFF"
                    />
                  </svg>

                  <span className="text-xs font-medium text-gray-500">
                    Fast Delivery
                  </span>
                </div>
                <div className="w-px h-4 bg-gray-200"></div>
                <div className="flex items-center gap-1.5">
                  <svg
                    width="15"
                    height="12"
                    viewBox="0 0 15 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.9078 3L10.1039 1.875H4.89844L4.09453 3H10.9078ZM2.25 3.48047C2.25 3.16875 2.34844 2.86406 2.52891 2.60859L3.67734 1.00312C3.95859 0.609375 4.41328 0.375 4.89609 0.375H10.1016C10.5867 0.375 11.0414 0.609375 11.3227 1.00312L12.4688 2.60859C12.6516 2.86406 12.7477 3.16875 12.7477 3.48047L12.75 9.75C12.75 10.5773 12.0773 11.25 11.25 11.25H3.75C2.92266 11.25 2.25 10.5773 2.25 9.75V3.48047Z"
                      fill="#FF6900"
                    />
                  </svg>

                  <span className="text-xs font-medium text-gray-500">
                    Easy Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
