"use client"

import { resetPassword } from "@/actions/auth.actions";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/schema/resetPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast } from "sonner";
import ResetButton from "../ResetButton/ResetButton";

export default function ResetPasswordForm({setStep, userEmail} : {setStep: (value: number) => void, userEmail: string}) {
    const [isLoading, setIsLoading] = useState(false);

    const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
      const [isVisibleRePassword, setIsVisibleRePassword] = useState(false);
      const toggleVisibilityNewPassword = () =>
        setIsVisibleNewPassword(!isVisibleNewPassword);
      const toggleVisibilityRePassword = () =>
        setIsVisibleRePassword(!isVisibleRePassword);
      const { handleSubmit, control } = useForm({
          defaultValues: {
            newPassword: "",
            rePassword: "",
          },
          resolver: zodResolver(resetPasswordSchema),
          mode: "onChange"
        });

        async function handleResetPassword(data: {
            newPassword: string;
            rePassword: string;
          }) {
            console.log(data);
            setIsLoading(true);
            const res = await resetPassword({email: userEmail , newPassword : data.newPassword});
            if (!!res.token) {                
              toast.success("Reset password successfully");
              setStep(4);
            } else {
              toast.error(res.message);
            }
            setIsLoading(false);
          }

  return (
    <form
                className="space-y-6"
                onSubmit={handleSubmit(handleResetPassword)}
              >
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-2 mb-6"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-gray-700 font-semibold"
                      >
                        New Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter new password"
                          type={isVisibleNewPassword ? "text" : "password"}
                          autoComplete="on"
                          className="h-13 py-3 px-4 pl-12 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                        />
                        <svg
                          width="20"
                          height="17"
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                          viewBox="0 0 20 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 4V6H12V4C12 2.89687 11.1031 2 10 2C8.89687 2 8 2.89687 8 4ZM6 6V4C6 1.79063 7.79063 0 10 0C12.2094 0 14 1.79063 14 4V6C15.1031 6 16 6.89687 16 8V15C16 16.1031 15.1031 17 14 17H6C4.89688 17 4 16.1031 4 15V8C4 6.89687 4.89688 6 6 6Z"
                            fill="#99A1AF"
                          />
                        </svg>
                         <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={toggleVisibilityNewPassword}
                    >
                      {isVisibleNewPassword ? (
                        <FaEye className="w-5 h-4" />
                      ) : (
                        <FaEyeSlash className="w-5 h-4" />
                      )}
                    </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-2 mb-6"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className="text-gray-700 font-semibold"
                      >
                        Confirm Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Confirm new password"
                          type={isVisibleRePassword ? "text" : "password"}
                          autoComplete="on"
                          className="h-13 py-3 px-4 pl-12 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                        />
                        <svg
                          width="20"
                          height="17"
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                          viewBox="0 0 20 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 4V6H12V4C12 2.89687 11.1031 2 10 2C8.89687 2 8 2.89687 8 4ZM6 6V4C6 1.79063 7.79063 0 10 0C12.2094 0 14 1.79063 14 4V6C15.1031 6 16 6.89687 16 8V15C16 16.1031 15.1031 17 14 17H6C4.89688 17 4 16.1031 4 15V8C4 6.89687 4.89688 6 6 6Z"
                            fill="#99A1AF"
                          />
                        </svg>
                         <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={toggleVisibilityRePassword}
                    >
                      {isVisibleRePassword ? (
                        <FaEye className="w-5 h-4" />
                      ) : (
                        <FaEyeSlash className="w-5 h-4" />
                      )}
                    </button>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <ResetButton loadingMsg="Resetting Password..." isLoading={isLoading}>
                 Reset Password
                </ResetButton>
              </form>
  )
}
