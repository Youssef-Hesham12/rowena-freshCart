"use client"
import { forgotPassword, verifyResetCode } from '@/actions/auth.actions';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import ResetButton from '../ResetButton/ResetButton';

export default function VerifyCodeForm({setUserEmail, setStep, userEmail} : {setUserEmail : (value: string) => void , setStep: (value: number) => void, userEmail: string}) {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control } = useForm({
        defaultValues: {
          resetCode: "",
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

      async function handleVerifyCode(data: { resetCode: string }) {
          console.log(data);
          setIsLoading(true);
          const res = await verifyResetCode(data);
          if (res.status === "Success") {
            toast.success("Verify code successfully");
            setStep(3);
          } else {
            toast.error(res.message);
          }
          setIsLoading(false);
        }
  return (
    <form
                className="space-y-6"
                onSubmit={handleSubmit(handleVerifyCode)}
              >
                <Controller
                  name="resetCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-0 mb-6"
                    >
                      <FieldLabel
                        htmlFor={field.name}
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Verification Code
                      </FieldLabel>

                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          maxLength={6}
                          placeholder="••••••"
                          autoComplete="on"
                          aria-invalid={fieldState.invalid}
                          className="w-full h-[59.19px] px-4 py-3 pl-12 border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2 focus:ring-primary-100! transition-all text-center text-2xl md:text-2xl! tracking-[0.5em] font-mono  placeholder:text-2xl placeholder:font-medium placeholder:text-[#9AA0A8]"
                        />
                        <svg
                          width="20"
                          height="16"
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.99689 0C10.1406 0 10.2844 0.03125 10.4156 0.090625L16.3031 2.5875C16.9906 2.87813 17.5031 3.55625 17.5 4.375C17.4844 7.475 16.2094 13.1469 10.825 15.725C10.3031 15.975 9.69689 15.975 9.17501 15.725C3.78751 13.1469 2.51564 7.475 2.50001 4.375C2.49689 3.55625 3.00939 2.87813 3.69689 2.5875L9.58126 0.090625C9.71251 0.03125 9.85314 0 9.99689 0ZM9.99689 2.0875V13.9031C14.3094 11.8156 15.4688 7.19063 15.4969 4.42188L9.99689 2.09063V2.0875Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">
                    Didn&apos;t receive the code?{" "}
                    <button
                      onClick={() => handleForgotPassword({ email: userEmail })}
                      type="button"
                      className="text-primary-600 hover:text-primary-700 font-semibold transition-colors cursor-pointer"
                    >
                      Resend Code
                    </button>
                  </p>
                </div>
                <ResetButton loadingMsg="Verifying..." isLoading={isLoading}>
                  Verify Code
                </ResetButton>
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors cursor-pointer"
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
                    Change email address
                  </button>
                </div>
              </form>
  )
}
