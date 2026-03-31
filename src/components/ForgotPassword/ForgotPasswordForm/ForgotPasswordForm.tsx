"use client"
import { forgotPassword } from '@/actions/auth.actions';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ResetButton from '../ResetButton/ResetButton';
import Link from 'next/link';

export default function ForgotPasswordForm({setUserEmail, setStep} : {setUserEmail : (value: string) => void , setStep: (value: number) => void}) {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control } = useForm({
        defaultValues: {
          email: "",
        },
      });

    async function handleForgotPassword(data: { email: string }) {
        console.log(data);
        setIsLoading(true);
        const res = await forgotPassword(data);
        if (res.statusMsg === "success") {
          toast.success(res.message);
          setUserEmail(data.email);
          setStep(2);
        } else {
          toast.error(res.message);
        }
        setIsLoading(false);
      }
  return (
    <form
                className="space-y-6"
                onSubmit={handleSubmit(handleForgotPassword)}
              >
                <Controller
                  name="email"
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
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your email address"
                          autoComplete="on"
                          className="h-13 py-3 px-4 pl-12 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                        />
                        <svg
                          width="20"
                          height="16"
                          className="absolute left-4 top-1/2 -translate-y-1/2"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.5 2C2.67188 2 2 2.67188 2 3.5C2 3.97187 2.22188 4.41562 2.6 4.7L9.1 9.575C9.63438 9.975 10.3656 9.975 10.9 9.575L17.4 4.7C17.7781 4.41562 18 3.97187 18 3.5C18 2.67188 17.3281 2 16.5 2H3.5ZM2 6.125V12C2 13.1031 2.89688 14 4 14H16C17.1031 14 18 13.1031 18 12V6.125L11.8 10.775C10.7344 11.575 9.26562 11.575 8.2 10.775L2 6.125Z"
                            fill="#99A1AF"
                          />
                        </svg>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <ResetButton loadingMsg="Sending Code..." isLoading={isLoading}>
                  Send Reset Code
                </ResetButton>
                <div className="text-center">
                  <Link
                    className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    href="/login"
                  >
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 15 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.71973 5.4703C1.42676 5.76327 1.42676 6.23905 1.71973 6.53202L5.46973 10.282C5.7627 10.575 6.23848 10.575 6.53145 10.282C6.82441 9.98905 6.82441 9.51327 6.53145 9.2203L4.06113 6.74999H12.7494C13.1643 6.74999 13.4994 6.41483 13.4994 5.99999C13.4994 5.58514 13.1643 5.24999 12.7494 5.24999H4.06113L6.53145 2.77968C6.82441 2.48671 6.82441 2.01093 6.53145 1.71796C6.23848 1.42499 5.7627 1.42499 5.46973 1.71796L1.71973 5.46796V5.4703Z"
                        fill="currentColor"
                      />
                    </svg>
                    Back to Sign In
                  </Link>
                </div>
              </form>
  )
}
