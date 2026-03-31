"use client";
import ForgotPasswordForm from "@/components/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm";
import ResetPassword from "@/components/ForgotPassword/ResetPassword/ResetPassword";
import ResetPasswordForm from "@/components/ForgotPassword/ResetPasswordForm/ResetPasswordForm";
import VerifyCodeForm from "@/components/ForgotPassword/VerifyCodeForm/VerifyCodeForm";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="container mx-auto py-16! px-4!">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <ResetPassword />
        <div className="w-full">
          {step === 4 ? (
            <div className="bg-white rounded-[16px] shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    Fresh<span className="text-gray-800">Cart</span>
                  </span>
                </div>
              </div>
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <svg
                    data-prefix="fas"
                    data-icon="check"
                    className="w-[37.5px] h-7.5 text-green-600"
                    role="img"
                    viewBox="0 0 448 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Password Reset!
                  </h2>
                  <p className="text-gray-600 font-medium">
                    Your password has been successfully reset. You can now sign
                    in with your new password.
                  </p>
                </div>
                <Link href="/login" className="inline-block w-full bg-primary-600 text-white py-3 px-4 rounded-[12px] hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl">
                  Back to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[16px] shadow-xl p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    Fresh<span className="text-gray-800">Cart</span>
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {step === 1
                    ? "Forgot Password?"
                    : step === 2
                      ? "Check Your Email"
                      : "Create New Password"}
                </h1>
                <p className="text-gray-600 font-medium">
                  {step === 1
                    ? "No worries, we'll send you a reset code"
                    : step === 2
                      ? `Enter the 6-digit code sent to ${userEmail}`
                      : "Your new password must be different from previous passwords"}
                </p>
              </div>
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-primary-600 text-white ${step === 1 ? "ring-4 ring-primary-100" : ""}`}
                  >
                    {step === 1 ? (
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.625 1.5C2.00391 1.5 1.5 2.00391 1.5 2.625C1.5 2.97891 1.66641 3.31172 1.95 3.525L6.825 7.18125C7.22578 7.48125 7.77422 7.48125 8.175 7.18125L13.05 3.525C13.3336 3.31172 13.5 2.97891 13.5 2.625C13.5 2.00391 12.9961 1.5 12.375 1.5H2.625ZM1.5 4.59375V9C1.5 9.82734 2.17266 10.5 3 10.5H12C12.8273 10.5 13.5 9.82734 13.5 9V4.59375L8.85 8.08125C8.05078 8.68125 6.94922 8.68125 6.15 8.08125L1.5 4.59375Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5134 1.91682C14.9044 2.20119 14.9919 2.74807 14.7075 3.13908L7.70752 12.7641C7.55713 12.9719 7.32471 13.1004 7.06768 13.1223C6.81064 13.1442 6.56182 13.0485 6.38135 12.868L2.88135 9.36799C2.53955 9.02619 2.53955 8.47111 2.88135 8.12932C3.22314 7.78752 3.77822 7.78752 4.12002 8.12932L6.89541 10.9047L13.2938 2.10822C13.5782 1.71721 14.1251 1.62971 14.5161 1.91408L14.5134 1.91682Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${step === 1 ? "bg-gray-200" : "bg-primary-600"}`}
                  ></div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step === 1 ? "bg-gray-100 text-gray-400" : step === 2 ? "bg-primary-600 text-white ring-4 ring-primary-100" : "bg-primary-600 text-white"}`}
                  >
                    {step === 1 ? (
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.375 8.25C11.6531 8.25 13.5 6.40312 13.5 4.125C13.5 1.84688 11.6531 0 9.375 0C7.09688 0 5.25 1.84688 5.25 4.125C5.25 4.56328 5.31797 4.9875 5.44453 5.38359L1.66406 9.16406C1.55859 9.26953 1.5 9.4125 1.5 9.5625V11.4375C1.5 11.7492 1.75078 12 2.0625 12H3.9375C4.24922 12 4.5 11.7492 4.5 11.4375V10.5H5.4375C5.74922 10.5 6 10.2492 6 9.9375V9H6.9375C7.0875 9 7.23047 8.94141 7.33594 8.83594L8.11641 8.05547C8.5125 8.18203 8.93672 8.25 9.375 8.25ZM10.3125 2.25C10.5611 2.25 10.7996 2.34877 10.9754 2.52459C11.1512 2.7004 11.25 2.93886 11.25 3.1875C11.25 3.43614 11.1512 3.6746 10.9754 3.85041C10.7996 4.02623 10.5611 4.125 10.3125 4.125C10.0639 4.125 9.8254 4.02623 9.64959 3.85041C9.47377 3.6746 9.375 3.43614 9.375 3.1875C9.375 2.93886 9.47377 2.7004 9.64959 2.52459C9.8254 2.34877 10.0639 2.25 10.3125 2.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : step === 2 ? (
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.375 8.25C11.6531 8.25 13.5 6.40312 13.5 4.125C13.5 1.84688 11.6531 0 9.375 0C7.09688 0 5.25 1.84688 5.25 4.125C5.25 4.56328 5.31797 4.9875 5.44453 5.38359L1.66406 9.16406C1.55859 9.26953 1.5 9.4125 1.5 9.5625V11.4375C1.5 11.7492 1.75078 12 2.0625 12H3.9375C4.24922 12 4.5 11.7492 4.5 11.4375V10.5H5.4375C5.74922 10.5 6 10.2492 6 9.9375V9H6.9375C7.0875 9 7.23047 8.94141 7.33594 8.83594L8.11641 8.05547C8.5125 8.18203 8.93672 8.25 9.375 8.25ZM10.3125 2.25C10.5611 2.25 10.7996 2.34877 10.9754 2.52459C11.1512 2.7004 11.25 2.93886 11.25 3.1875C11.25 3.43614 11.1512 3.6746 10.9754 3.85041C10.7996 4.02623 10.5611 4.125 10.3125 4.125C10.0639 4.125 9.8254 4.02623 9.64959 3.85041C9.47377 3.6746 9.375 3.43614 9.375 3.1875C9.375 2.93886 9.47377 2.7004 9.64959 2.52459C9.8254 2.34877 10.0639 2.25 10.3125 2.25Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5134 1.91682C14.9044 2.20119 14.9919 2.74807 14.7075 3.13908L7.70752 12.7641C7.55713 12.9719 7.32471 13.1004 7.06768 13.1223C6.81064 13.1442 6.56182 13.0485 6.38135 12.868L2.88135 9.36799C2.53955 9.02619 2.53955 8.47111 2.88135 8.12932C3.22314 7.78752 3.77822 7.78752 4.12002 8.12932L6.89541 10.9047L13.2938 2.10822C13.5782 1.71721 14.1251 1.62971 14.5161 1.91408L14.5134 1.91682Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all duration-300 ${step === 3 ? "bg-primary-600" : "bg-gray-200"}`}
                  ></div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${step === 3 ? "bg-primary-600 text-white ring-4 ring-primary-100" : "bg-gray-100 text-gray-400"}`}
                  >
                    <svg
                      width="15"
                      height="13"
                      viewBox="0 0 15 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 3V4.5H9V3C9 2.17266 8.32734 1.5 7.5 1.5C6.67266 1.5 6 2.17266 6 3ZM4.5 4.5V3C4.5 1.34297 5.84297 0 7.5 0C9.15703 0 10.5 1.34297 10.5 3V4.5C11.3273 4.5 12 5.17266 12 6V11.25C12 12.0773 11.3273 12.75 10.5 12.75H4.5C3.67266 12.75 3 12.0773 3 11.25V6C3 5.17266 3.67266 4.5 4.5 4.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {step === 1 ? (
                <ForgotPasswordForm
                  setStep={setStep}
                  setUserEmail={setUserEmail}
                />
              ) : // <form
              //   className="space-y-6"
              //   onSubmit={handleSubmit(handleForgotPassword)}
              // >
              //   <Controller
              //     name="email"
              //     control={control}
              //     render={({ field, fieldState }) => (
              //       <Field
              //         data-invalid={fieldState.invalid}
              //         className="gap-2 mb-6"
              //       >
              //         <FieldLabel
              //           htmlFor={field.name}
              //           className="text-gray-700 font-semibold"
              //         >
              //           Email Address
              //         </FieldLabel>
              //         <div className="relative">
              //           <Input
              //             {...field}
              //             id={field.name}
              //             aria-invalid={fieldState.invalid}
              //             placeholder="Enter your email address"
              //             autoComplete="on"
              //             className="h-13 py-3 px-4 pl-12 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
              //           />
              //           <svg
              //             width="20"
              //             height="16"
              //             className="absolute left-4 top-1/2 -translate-y-1/2"
              //             viewBox="0 0 20 16"
              //             fill="none"
              //             xmlns="http://www.w3.org/2000/svg"
              //           >
              //             <path
              //               d="M3.5 2C2.67188 2 2 2.67188 2 3.5C2 3.97187 2.22188 4.41562 2.6 4.7L9.1 9.575C9.63438 9.975 10.3656 9.975 10.9 9.575L17.4 4.7C17.7781 4.41562 18 3.97187 18 3.5C18 2.67188 17.3281 2 16.5 2H3.5ZM2 6.125V12C2 13.1031 2.89688 14 4 14H16C17.1031 14 18 13.1031 18 12V6.125L11.8 10.775C10.7344 11.575 9.26562 11.575 8.2 10.775L2 6.125Z"
              //               fill="#99A1AF"
              //             />
              //           </svg>
              //         </div>

              //         {fieldState.invalid && (
              //           <FieldError errors={[fieldState.error]} />
              //         )}
              //       </Field>
              //     )}
              //   />
              //   <ResetButton loadingMsg="Sending Code..." isLoading={isLoading}>
              //     Send Reset Code
              //   </ResetButton>
              //   <div className="text-center">
              //     <Link
              //       className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
              //       href="/login"
              //     >
              //       <svg
              //         width="15"
              //         height="12"
              //         viewBox="0 0 15 12"
              //         fill="none"
              //         xmlns="http://www.w3.org/2000/svg"
              //       >
              //         <path
              //           d="M1.71973 5.4703C1.42676 5.76327 1.42676 6.23905 1.71973 6.53202L5.46973 10.282C5.7627 10.575 6.23848 10.575 6.53145 10.282C6.82441 9.98905 6.82441 9.51327 6.53145 9.2203L4.06113 6.74999H12.7494C13.1643 6.74999 13.4994 6.41483 13.4994 5.99999C13.4994 5.58514 13.1643 5.24999 12.7494 5.24999H4.06113L6.53145 2.77968C6.82441 2.48671 6.82441 2.01093 6.53145 1.71796C6.23848 1.42499 5.7627 1.42499 5.46973 1.71796L1.71973 5.46796V5.4703Z"
              //           fill="currentColor"
              //         />
              //       </svg>
              //       Back to Sign In
              //     </Link>
              //   </div>
              // </form>
              step === 2 ? (
                <VerifyCodeForm
                  setStep={setStep}
                  setUserEmail={setUserEmail}
                  userEmail={userEmail}
                />
              ) : (
                // <form
                //   className="space-y-6"
                //   onSubmit={handleSubmit(handleVerifyCode)}
                // >
                //   <Controller
                //     name="resetCode"
                //     control={control}
                //     render={({ field, fieldState }) => (
                //       <Field
                //         data-invalid={fieldState.invalid}
                //         className="gap-0 mb-6"
                //       >
                //         <FieldLabel
                //           htmlFor={field.name}
                //           className="block text-sm font-semibold text-gray-700 mb-2"
                //         >
                //           Verification Code
                //         </FieldLabel>

                //         <div className="relative">
                //           <Input
                //             {...field}
                //             id={field.name}
                //             maxLength={6}
                //             placeholder="••••••"
                //             autoComplete="on"
                //             aria-invalid={fieldState.invalid}
                //             className="w-full h-[59.19px] px-4 py-3 pl-12 border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2 focus:ring-primary-100! transition-all text-center text-2xl md:text-2xl! tracking-[0.5em] font-mono  placeholder:text-2xl placeholder:font-medium placeholder:text-[#9AA0A8]"
                //           />
                //           <svg
                //             width="20"
                //             height="16"
                //             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                //             viewBox="0 0 20 16"
                //             fill="none"
                //             xmlns="http://www.w3.org/2000/svg"
                //           >
                //             <path
                //               d="M9.99689 0C10.1406 0 10.2844 0.03125 10.4156 0.090625L16.3031 2.5875C16.9906 2.87813 17.5031 3.55625 17.5 4.375C17.4844 7.475 16.2094 13.1469 10.825 15.725C10.3031 15.975 9.69689 15.975 9.17501 15.725C3.78751 13.1469 2.51564 7.475 2.50001 4.375C2.49689 3.55625 3.00939 2.87813 3.69689 2.5875L9.58126 0.090625C9.71251 0.03125 9.85314 0 9.99689 0ZM9.99689 2.0875V13.9031C14.3094 11.8156 15.4688 7.19063 15.4969 4.42188L9.99689 2.09063V2.0875Z"
                //               fill="currentColor"
                //             />
                //           </svg>
                //         </div>

                //         {fieldState.invalid && (
                //           <FieldError errors={[fieldState.error]} />
                //         )}
                //       </Field>
                //     )}
                //   />
                //   <div className="text-center">
                //     <p className="text-sm font-medium text-gray-500">
                //       Didn&apos;t receive the code?{" "}
                //       <button
                //         onClick={() => handleForgotPassword({ email: userEmail })}
                //         type="button"
                //         className="text-primary-600 hover:text-primary-700 font-semibold transition-colors cursor-pointer"
                //       >
                //         Resend Code
                //       </button>
                //     </p>
                //   </div>
                //   <ResetButton loadingMsg="Verifying..." isLoading={isLoading}>
                //     Verify Code
                //   </ResetButton>
                //   <div className="text-center">
                //     <button
                //       type="button"
                //       onClick={() => setStep(1)}
                //       className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 font-medium transition-colors cursor-pointer"
                //     >
                //       <svg
                //         width="15"
                //         height="12"
                //         viewBox="0 0 15 12"
                //         fill="none"
                //         xmlns="http://www.w3.org/2000/svg"
                //       >
                //         <path
                //           d="M1.71973 5.4703C1.42676 5.76327 1.42676 6.23905 1.71973 6.53202L5.46973 10.282C5.7627 10.575 6.23848 10.575 6.53145 10.282C6.82441 9.98905 6.82441 9.51327 6.53145 9.2203L4.06113 6.74999H12.7494C13.1643 6.74999 13.4994 6.41483 13.4994 5.99999C13.4994 5.58514 13.1643 5.24999 12.7494 5.24999H4.06113L6.53145 2.77968C6.82441 2.48671 6.82441 2.01093 6.53145 1.71796C6.23848 1.42499 5.7627 1.42499 5.46973 1.71796L1.71973 5.46796V5.4703Z"
                //           fill="currentColor"
                //         />
                //       </svg>
                //       Change email address
                //     </button>
                //   </div>
                // </form>
                <ResetPasswordForm setStep={setStep} userEmail={userEmail} />
                // <form
                //   className="space-y-6"
                //   onSubmit={handleSubmit(handleResetPassword)}
                // >
                //   <Controller
                //     name="newPassword"
                //     control={control}
                //     render={({ field, fieldState }) => (
                //       <Field
                //         data-invalid={fieldState.invalid}
                //         className="gap-2 mb-6"
                //       >
                //         <FieldLabel
                //           htmlFor={field.name}
                //           className="text-gray-700 font-semibold"
                //         >
                //           New Password
                //         </FieldLabel>
                //         <div className="relative">
                //           <Input
                //             {...field}
                //             id={field.name}
                //             aria-invalid={fieldState.invalid}
                //             placeholder="Enter new password"
                //             type={isVisibleNewPassword ? "text" : "password"}
                //             autoComplete="on"
                //             className="h-13 py-3 px-4 pl-12 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                //           />
                //           <svg
                //             width="20"
                //             height="17"
                //             className="absolute left-4 top-1/2 -translate-y-1/2"
                //             viewBox="0 0 20 17"
                //             fill="none"
                //             xmlns="http://www.w3.org/2000/svg"
                //           >
                //             <path
                //               d="M8 4V6H12V4C12 2.89687 11.1031 2 10 2C8.89687 2 8 2.89687 8 4ZM6 6V4C6 1.79063 7.79063 0 10 0C12.2094 0 14 1.79063 14 4V6C15.1031 6 16 6.89687 16 8V15C16 16.1031 15.1031 17 14 17H6C4.89688 17 4 16.1031 4 15V8C4 6.89687 4.89688 6 6 6Z"
                //               fill="#99A1AF"
                //             />
                //           </svg>
                //            <button
                //         type="button"
                //         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                //         onClick={toggleVisibilityNewPassword}
                //       >
                //         {isVisibleNewPassword ? (
                //           <FaEye className="w-5 h-4" />
                //         ) : (
                //           <FaEyeSlash className="w-5 h-4" />
                //         )}
                //       </button>
                //         </div>

                //         {fieldState.invalid && (
                //           <FieldError errors={[fieldState.error]} />
                //         )}
                //       </Field>
                //     )}
                //   />
                //   <Controller
                //     name="rePassword"
                //     control={control}
                //     render={({ field, fieldState }) => (
                //       <Field
                //         data-invalid={fieldState.invalid}
                //         className="gap-2 mb-6"
                //       >
                //         <FieldLabel
                //           htmlFor={field.name}
                //           className="text-gray-700 font-semibold"
                //         >
                //           Confirm Password
                //         </FieldLabel>
                //         <div className="relative">
                //           <Input
                //             {...field}
                //             id={field.name}
                //             aria-invalid={fieldState.invalid}
                //             placeholder="Confirm new password"
                //             type={isVisibleRePassword ? "text" : "password"}
                //             autoComplete="on"
                //             className="h-13 py-3 px-4 pl-12 text-[16px]! font-medium text-[#364153] border-2 border-gray-200 rounded-[12px] focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100! placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8] transition-all"
                //           />
                //           <svg
                //             width="20"
                //             height="17"
                //             className="absolute left-4 top-1/2 -translate-y-1/2"
                //             viewBox="0 0 20 17"
                //             fill="none"
                //             xmlns="http://www.w3.org/2000/svg"
                //           >
                //             <path
                //               d="M8 4V6H12V4C12 2.89687 11.1031 2 10 2C8.89687 2 8 2.89687 8 4ZM6 6V4C6 1.79063 7.79063 0 10 0C12.2094 0 14 1.79063 14 4V6C15.1031 6 16 6.89687 16 8V15C16 16.1031 15.1031 17 14 17H6C4.89688 17 4 16.1031 4 15V8C4 6.89687 4.89688 6 6 6Z"
                //               fill="#99A1AF"
                //             />
                //           </svg>
                //            <button
                //         type="button"
                //         className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                //         onClick={toggleVisibilityRePassword}
                //       >
                //         {isVisibleRePassword ? (
                //           <FaEye className="w-5 h-4" />
                //         ) : (
                //           <FaEyeSlash className="w-5 h-4" />
                //         )}
                //       </button>
                //         </div>

                //         {fieldState.invalid && (
                //           <FieldError errors={[fieldState.error]} />
                //         )}
                //       </Field>
                //     )}
                //   />
                //   <ResetButton loadingMsg="Resetting Password..." isLoading={isLoading}>
                //    Reset Password
                //   </ResetButton>
                // </form>
              )}
              <div
                className={`${step === 3 ? "hidden" : ""} text-center mt-8 pt-6 border-t border-gray-100`}
              >
                <p className="text-gray-600 font-medium">
                  Remember your password?{" "}
                  <Link
                    className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    href="/login"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
