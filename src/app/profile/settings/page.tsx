"use client";
import { Controller, useForm } from "react-hook-form";
import { defaultValues } from "./../../../components/Settings/userInfo.data";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/schema/userInfo.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signOut, useSession } from "next-auth/react";
import { UserInfoDataType } from "@/components/Settings/userInfo-data.type";
import { updateUserData, updateUserPassword } from "@/actions/auth.actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { defaultValuesPassword } from "./../../../components/Settings/userPasswords.data";
import { userPasswordsSchema } from "@/schema/userPasswords.schema";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { UserPasswordsDataType } from "@/components/Settings/userPasswords-data.type";

export default function Settings() {
  const { data: sessionData, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const [isVisibleCurrentPassword, setIsVisibleCurrentPassword] =
    useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleRePassword, setIsVisibleRePassword] = useState(false);
  const toggleVisibilityCurrentPassword = () =>
    setIsVisibleCurrentPassword(!isVisibleCurrentPassword);
  const toggleVisibilityPassword = () =>
    setIsVisiblePassword(!isVisiblePassword);
  const toggleVisibilityRePassword = () =>
    setIsVisibleRePassword(!isVisibleRePassword);

  const { handleSubmit, control, reset } = useForm<UserInfoDataType>({
    defaultValues,
    resolver: zodResolver(userInfoSchema),
    mode: "onChange",
  });

  const passwordForm = useForm({
    defaultValues: defaultValuesPassword,
    resolver: zodResolver(userPasswordsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (sessionData?.user) {
      reset({
        name: sessionData.user.name || "",
      });
    }
  }, [sessionData, reset]);

  async function userInfoSubmit(data: UserInfoDataType) {
    console.log("userInfoSubmit", data);
    setIsLoading(true);
    const res = await updateUserData(data);
    if (res.message === "success") {
      toast.success("Profile updated successfully");
      await update({
        name: data.name,
        email: data.email,
      });
      reset(data);
      console.log("session data", sessionData);
    } else {
      toast.error(res.errors?.msg);
    }
    setIsLoading(false);
  }
  async function userPasswordSubmit(data: UserPasswordsDataType) {
    console.log("userPasswordSubmit", data);
    setIsLoadingPassword(true);
    const res = await updateUserPassword(data);
    if (res.message === "success") {
      toast.success("Password changed successfully");
      passwordForm.reset();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await signOut({
        callbackUrl: "/login",
      });
    } else {
      toast.error(res.errors?.msg);
    }
    setIsLoadingPassword(false);
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm font-medium mt-1">
          Update your profile information and change your password
        </p>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-[16px] bg-primary-100 flex items-center justify-center">
              <svg
                width="30"
                height="24"
                viewBox="0 0 30 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 11.625C15.7387 11.625 16.4701 11.4795 17.1526 11.1968C17.8351 10.9141 18.4551 10.4998 18.9775 9.97748C19.4998 9.45515 19.9141 8.83505 20.1968 8.15259C20.4795 7.47014 20.625 6.73869 20.625 6C20.625 5.26131 20.4795 4.52986 20.1968 3.84741C19.9141 3.16495 19.4998 2.54485 18.9775 2.02252C18.4551 1.50019 17.8351 1.08586 17.1526 0.803178C16.4701 0.520495 15.7387 0.375 15 0.375C14.2613 0.375 13.5299 0.520495 12.8474 0.803178C12.1649 1.08586 11.5449 1.50019 11.0225 2.02252C10.5002 2.54485 10.0859 3.16495 9.80318 3.84741C9.52049 4.52986 9.375 5.26131 9.375 6C9.375 6.73869 9.52049 7.47014 9.80318 8.15259C10.0859 8.83505 10.5002 9.45515 11.0225 9.97748C11.5449 10.4998 12.1649 10.9141 12.8474 11.1968C13.5299 11.4795 14.2613 11.625 15 11.625ZM13.6078 14.25C8.99063 14.25 5.25 17.9906 5.25 22.6078C5.25 23.3766 5.87344 24 6.64219 24H23.3578C24.1266 24 24.75 23.3766 24.75 22.6078C24.75 17.9906 21.0094 14.25 16.3922 14.25H13.6078Z"
                  fill="#16A34A"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm font-medium text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(userInfoSubmit)} className="space-y-5">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100!  transition-all placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8]"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Enter your email"
                    autoComplete="name"
                    className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100!  transition-all placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8]"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    placeholder="01xxxxxxxxx"
                    autoComplete="name"
                    className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100!  transition-all placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8]"
                  />

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Spinner /> Saving...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 1C3.89688 1 3 1.89688 3 3V13C3 14.1031 3.89688 15 5 15H15C16.1031 15 17 14.1031 17 13V5.41563C17 4.88438 16.7906 4.375 16.4156 4L14 1.58438C13.625 1.20938 13.1156 1 12.5844 1H5ZM6 4C6 3.44688 6.44688 3 7 3H12C12.5531 3 13 3.44688 13 4V6C13 6.55312 12.5531 7 12 7H7C6.44688 7 6 6.55312 6 6V4ZM10 9C10.5304 9 11.0391 9.21071 11.4142 9.58579C11.7893 9.96086 12 10.4696 12 11C12 11.5304 11.7893 12.0391 11.4142 12.4142C11.0391 12.7893 10.5304 13 10 13C9.46957 13 8.96086 12.7893 8.58579 12.4142C8.21071 12.0391 8 11.5304 8 11C8 10.4696 8.21071 9.96086 8.58579 9.58579C8.96086 9.21071 9.46957 9 10 9Z"
                        fill="currentColor"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        <div className="p-6 sm:p-8 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">User ID</span>
              <span className="font-mono text-gray-700">
                {sessionData?.user?.id}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-medium">Role</span>
              <span className="px-3 py-1 rounded-lg bg-primary-100 text-primary-700 font-medium capitalize">
                user
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-[16px] bg-amber-100 flex items-center justify-center">
              <svg
                width="30"
                height="26"
                viewBox="0 0 30 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6V9H18V6C18 4.34531 16.6547 3 15 3C13.3453 3 12 4.34531 12 6ZM9 9V6C9 2.68594 11.6859 0 15 0C18.3141 0 21 2.68594 21 6V9C22.6547 9 24 10.3453 24 12V22.5C24 24.1547 22.6547 25.5 21 25.5H9C7.34531 25.5 6 24.1547 6 22.5V12C6 10.3453 7.34531 9 9 9Z"
                  fill="#E17100"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Change Password</h3>
              <p className="text-sm font-medium text-gray-500">
                Update your account password
              </p>
            </div>
          </div>
          <form
            onSubmit={passwordForm.handleSubmit(userPasswordSubmit)}
            className="space-y-5"
          >
            <Controller
              name="currentPassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Current Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter your current password"
                      type={isVisibleCurrentPassword ? "text" : "password"}
                      autoComplete="name"
                      className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100!  transition-all placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8]"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                      onClick={toggleVisibilityCurrentPassword}
                    >
                      {isVisibleCurrentPassword ? (
                        <FaEye className="w-5 h-4" />
                      ) : (
                        <FaEyeSlash className="w-5 h-4" />
                      )}
                    </button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={passwordForm.control}
              render={({ field }) => (
                <Field className="gap-0">
                  <FieldLabel
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter your new password"
                      type={isVisiblePassword ? "text" : "password"}
                      autoComplete="name"
                      className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100!  transition-all placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8]"
                    />
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
                  <p className="text-xs font-medium text-gray-500 mt-1">
                    Must be at least 6 characters
                  </p>
                </Field>
              )}
            />
            <Controller
              name="rePassword"
              control={passwordForm.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm New Password
                  </FieldLabel>

                  <div className="relative">
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Confirm your new password"
                      type={isVisibleRePassword ? "text" : "password"}
                      autoComplete="name"
                      className="w-full h-[49.6px] px-4 py-3 text-[16px]! font-medium text-gray-700 rounded-[12px] border border-gray-200 focus:outline-none focus:border-primary-500! focus:ring-2! focus:ring-primary-100!  transition-all placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9AA0A8]"
                    />
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
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-xs text-red-500 mt-1"
                    />
                  )}
                </Field>
              )}
            />
            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25 cursor-pointer"
              >
                {isLoadingPassword ? (
                  <>
                    <Spinner /> saving...
                  </>
                ) : (
                  <>
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 4V6H12V4C12 2.89687 11.1031 2 10 2C8.89687 2 8 2.89687 8 4ZM6 6V4C6 1.79063 7.79063 0 10 0C12.2094 0 14 1.79063 14 4V6C15.1031 6 16 6.89687 16 8V15C16 16.1031 15.1031 17 14 17H6C4.89688 17 4 16.1031 4 15V8C4 6.89687 4.89688 6 6 6Z"
                        fill="currentColor"
                      />
                    </svg>
                    Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
