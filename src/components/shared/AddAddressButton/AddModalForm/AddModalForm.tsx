"use client";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { defaultValues } from "./AddModalForm.data";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAddressSchema } from "@/schema/addAddress.schema";
import { AddAddressDataType } from "./AddModalForm.type";
import { addAddress } from "@/actions/addresses.actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddModalForm({
  setIsOpenModal,
}: {
  setIsOpenModal: (value: boolean) => void;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, control } = useForm({
    defaultValues,
    resolver: zodResolver(addAddressSchema),
    mode: "onChange",
  });
  const router = useRouter()

  async function handleAddAddress(data: AddAddressDataType) {
    setIsLoading(true)
    const res = await addAddress(data)
    if(res.status){
        toast.success(res.message)
        router.refresh()
    }
    else{
        toast.error(res.message)
    }
    setIsLoading(false)
    setIsOpenModal(false)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div className="relative bg-white rounded-[24px] text-left shadow-2xl w-full max-w-lg p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Address</h2>
          <button
            onClick={() => setIsOpenModal(false)}
            className="w-9 h-9 rounded-[8px] bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              data-prefix="fas"
              data-icon="xmark"
              className="w-5 h-4"
              role="img"
              viewBox="0 0 384 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="space-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  Address Name
                </FieldLabel>

                <Input
                  {...field}
                  id={field.name}
                  placeholder="e.g. Home, Office"
                  className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"

                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Full Address */}
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2">
                <FieldLabel className="block text-sm font-medium text-gray-700">
                  Full Address
                </FieldLabel>

                <textarea
                  {...field}
                  rows={3}
                  placeholder="Street, building, apartment..."
                  className="w-full px-4 py-3 text-[16px]! mb-2 font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] resize-none transition-all"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone + City */}
          <div className="grid grid-cols-2 gap-4">
            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </FieldLabel>

                  <Input
                    {...field}
                    type="tel"
                    placeholder="01xxxxxxxxx"
                  className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* City */}
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-2">
                  <FieldLabel className="block text-sm font-medium text-gray-700">
                    City
                  </FieldLabel>

                  <Input
                    {...field}
                    placeholder="Cairo"
                  className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={()=> setIsOpenModal(false)}
              className="flex-1 py-3 px-6 rounded-[12px] bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={handleSubmit(handleAddAddress)}
              className="flex-1 py-3 px-6 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25 cursor-pointer"
            >
              {isLoading? "Saving..." : "Add Address"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
