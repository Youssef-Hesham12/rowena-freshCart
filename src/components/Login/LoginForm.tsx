"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa6";
import { defaultValues } from "./login.data";
import { LoginDataType } from "./login-data.type";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import { loginSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";

export default function LoginForm() {
  const router = useRouter();
  // visible & unVisible password
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<LoginDataType>({
    defaultValues,
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function loginSubmit(data: LoginDataType) {
    const res = await signIn("credentials", { redirect: false, ...data });

    if (res?.ok) {
      toast.success("Login successful");
      router.replace("/");
    } else {
      toast.error(res?.error);
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-[16px] shadow-xl p-8 lg:p-12">
        {/* header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-primary-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back!
          </h1>
          <p className="text-gray-600 font-medium">
            Sign in to continue your fresh shopping experience
          </p>
        </div>
        {/* login with facebook or google */}
        <div className="space-y-3 mb-6">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <FaGoogle className="text-red-500 w-[22.5px] h-4.5 " />
            <span className="font-medium text-gray-700">
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <FaFacebook className="text-blue-600 w-[22.5px] h-4.5" />
            <span className="font-medium text-gray-700">
              Continue with Facebook
            </span>
          </button>
        </div>
        {/* login with email */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">
              OR CONTINUE WITH EMAIL
            </span>
          </div>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(loginSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2 mb-6">
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
                    placeholder="Enter your email"
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
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2 mb-6">
                <div className="flex items-center justify-between">
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-gray-700 font-semibold"
                  >
                    Password
                  </FieldLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    type={isVisiblePassword ? "text" : "password"}
                    autoComplete="off"
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
                    onClick={toggleVisibilityPassword}
                  >
                    {isVisiblePassword ? (
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
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                type="checkbox"
                name="rememberMe"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Keep me signed in
              </span>
            </label>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-13.25 bg-primary-600 text-white py-3 px-4 rounded-[12px] hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting && (
              <Spinner className="size-6" />
            )}
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600 font-medium">
            New to FreshCart?
            <Link
              className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
              href="/register"
            >
              Create an account
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs font-medium text-gray-500">
          <div className="flex items-center">
            <svg
              width="19"
              height="13"
              viewBox="0 0 19 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 3V4.5H9V3C9 2.17266 8.32734 1.5 7.5 1.5C6.67266 1.5 6 2.17266 6 3ZM4.5 4.5V3C4.5 1.34297 5.84297 0 7.5 0C9.15703 0 10.5 1.34297 10.5 3V4.5C11.3273 4.5 12 5.17266 12 6V11.25C12 12.0773 11.3273 12.75 10.5 12.75H4.5C3.67266 12.75 3 12.0773 3 11.25V6C3 5.17266 3.67266 4.5 4.5 4.5Z"
                fill="#6A7282"
              />
            </svg>
            SSL Secured
          </div>
          <div className="flex items-center">
            <svg
              width="19"
              height="12"
              viewBox="0 0 19 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 0.375C8.14647 0.375 8.76645 0.631807 9.22357 1.08893C9.68069 1.54605 9.9375 2.16603 9.9375 2.8125C9.9375 3.45897 9.68069 4.07895 9.22357 4.53607C8.76645 4.99319 8.14647 5.25 7.5 5.25C6.85353 5.25 6.23355 4.99319 5.77643 4.53607C5.31931 4.07895 5.0625 3.45897 5.0625 2.8125C5.0625 2.16603 5.31931 1.54605 5.77643 1.08893C6.23355 0.631807 6.85353 0.375 7.5 0.375ZM2.25 2.0625C2.47161 2.0625 2.69104 2.10615 2.89578 2.19095C3.10052 2.27576 3.28654 2.40006 3.44324 2.55676C3.59994 2.71346 3.72424 2.89948 3.80905 3.10422C3.89385 3.30896 3.9375 3.52839 3.9375 3.75C3.9375 3.97161 3.89385 4.19104 3.80905 4.39578C3.72424 4.60052 3.59994 4.78654 3.44324 4.94324C3.28654 5.09994 3.10052 5.22424 2.89578 5.30905C2.69104 5.39385 2.47161 5.4375 2.25 5.4375C2.02839 5.4375 1.80896 5.39385 1.60422 5.30905C1.39948 5.22424 1.21346 5.09994 1.05676 4.94324C0.900058 4.78654 0.775758 4.60052 0.690953 4.39578C0.606148 4.19104 0.5625 3.97161 0.5625 3.75C0.5625 3.52839 0.606148 3.30896 0.690953 3.10422C0.775758 2.89948 0.900058 2.71346 1.05676 2.55676C1.21346 2.40006 1.39948 2.27576 1.60422 2.19095C1.80896 2.10615 2.02839 2.0625 2.25 2.0625ZM0 9.75C0 8.09297 1.34297 6.75 3 6.75C3.3 6.75 3.59062 6.79453 3.86484 6.87656C3.09375 7.73906 2.625 8.87813 2.625 10.125V10.5C2.625 10.7672 2.68125 11.0203 2.78203 11.25H0.75C0.335156 11.25 0 10.9148 0 10.5V9.75ZM12.218 11.25C12.3187 11.0203 12.375 10.7672 12.375 10.5V10.125C12.375 8.87813 11.9062 7.73906 11.1352 6.87656C11.4094 6.79453 11.7 6.75 12 6.75C13.657 6.75 15 8.09297 15 9.75V10.5C15 10.9148 14.6648 11.25 14.25 11.25H12.218ZM11.0625 3.75C11.0625 3.30245 11.2403 2.87322 11.5568 2.55676C11.8732 2.24029 12.3024 2.0625 12.75 2.0625C13.1976 2.0625 13.6268 2.24029 13.9432 2.55676C14.2597 2.87322 14.4375 3.30245 14.4375 3.75C14.4375 4.19755 14.2597 4.62677 13.9432 4.94324C13.6268 5.25971 13.1976 5.4375 12.75 5.4375C12.3024 5.4375 11.8732 5.25971 11.5568 4.94324C11.2403 4.62677 11.0625 4.19755 11.0625 3.75ZM3.75 10.125C3.75 8.05312 5.42812 6.375 7.5 6.375C9.57187 6.375 11.25 8.05312 11.25 10.125V10.5C11.25 10.9148 10.9148 11.25 10.5 11.25H4.5C4.08516 11.25 3.75 10.9148 3.75 10.5V10.125Z"
                fill="#6A7282"
              />
            </svg>
            50K+ Users
          </div>
          <div className="flex items-center">
            <svg
              width="19"
              height="13"
              viewBox="0 0 19 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00375 0.307031C7.90766 0.119531 7.71313 0 7.50219 0C7.29125 0 7.09672 0.119531 7.00063 0.307031L5.27563 3.68672L1.52797 4.28203C1.31938 4.31484 1.14594 4.4625 1.08031 4.66406C1.01469 4.86562 1.0686 5.08594 1.21625 5.23594L3.8975 7.91953L3.30688 11.6672C3.27406 11.8758 3.36078 12.0867 3.53188 12.2109C3.70297 12.3352 3.92797 12.3539 4.11781 12.2578L7.50219 10.5375L10.8842 12.2578C11.0717 12.3539 11.2991 12.3352 11.4702 12.2109C11.6413 12.0867 11.728 11.8781 11.6952 11.6672L11.1022 7.91953L13.7834 5.23594C13.9334 5.08594 13.985 4.86562 13.9194 4.66406C13.8538 4.4625 13.6827 4.31484 13.4717 4.28203L9.72641 3.68672L8.00375 0.307031Z"
                fill="#6A7282"
              />
            </svg>
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  );
}
