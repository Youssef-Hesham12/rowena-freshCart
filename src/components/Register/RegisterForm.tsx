"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { defaultValues } from "./register.data";
import { RegisterDataType } from "./register-data.type";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schema/register.schema";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { registerHandler } from "@/actions/auth.actions";
import { Spinner } from "../ui/spinner";

export default function RegisterForm() {
  const router = useRouter();

  const { handleSubmit, control, formState:{isSubmitting} } = useForm<RegisterDataType>({
    defaultValues,
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const passwordValue = useWatch<RegisterDataType>({
    name: "password",
    control,
    defaultValue: "",
  });

  async function registerSubmit(data: RegisterDataType) {

    const result = await registerHandler(data);
    if (result.message === "success") {
      toast.success("Registration successful");
      router.push("/login");
    } else {
      toast.error(result.message);
    }
  }

  function getPasswordStrength(password: string = "") {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[#?!@$%^&*-]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    switch (score) {
      case 1:
        return { label: "Weak", width: "10%", color: "bg-red-500" };
      case 2:
        return { label: "Weak", width: "25%", color: "bg-red-500" };
      case 3:
        return { label: "Fair", width: "45%", color: "bg-orange-500" };
      case 4:
        return { label: "Fair", width: "55%", color: "bg-orange-500" };
      case 5:
        return { label: "Good", width: "75%", color: "bg-blue-500" };
      case 6:
        return { label: "Strong", width: "100%", color: "bg-green-500" };
      default:
        return { label: "Weak", width: "0%", color: "bg-gray-200" };
    }
  }

  const strength = getPasswordStrength(passwordValue);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[16px] shadow-lg px-6 py-10">
        {/* header */}
        <h2 className="text-center text-3xl font-semibold mb-2">
          Create Your Account
        </h2>
        <p className="text-center font-medium">
          Start your fresh journey with us today
        </p>
        {/* login with facebook or google */}
        <div className="flex gap-2 *:bg-transparent *:rounded-[8px] *:py-2 *:px-3 *:font-semibold *:text-gray-900 *:border *:border-gray-300 *:hover:bg-gray-100 *:flex *:justify-center *:items-center *:disabled:opacity-50 *:disabled:cursor-not-allowed *:transition-all *:grow my-10">
          <button type="button" aria-label="Sign up with Google">
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.625 8.18125C17.625 12.6031 14.5969 15.75 10.125 15.75C5.8375 15.75 2.375 12.2875 2.375 8C2.375 3.7125 5.8375 0.25 10.125 0.25C12.2125 0.25 13.9688 1.01562 15.3219 2.27813L13.2125 4.30625C10.4531 1.64375 5.32188 3.64375 5.32188 8C5.32188 10.7031 7.48125 12.8938 10.125 12.8938C13.1938 12.8938 14.3438 10.6938 14.525 9.55313H10.125V6.8875H17.5031C17.575 7.28437 17.625 7.66562 17.625 8.18125Z"
                fill="#E7000B"
              />
            </svg>

            <span>Google</span>
          </button>
          <button type="button" aria-label="Sign up with Facebook">
            <svg
              className="mr-2"
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 8C18 3.58125 14.4187 0 10 0C5.58125 0 2 3.58125 2 8C2 11.75 4.58437 14.9 8.06875 15.7656V10.4438H6.41875V8H8.06875V6.94688C8.06875 4.225 9.3 2.9625 11.975 2.9625C12.4813 2.9625 13.3562 3.0625 13.7156 3.1625V5.375C13.5281 5.35625 13.2 5.34375 12.7906 5.34375C11.4781 5.34375 10.9719 5.84062 10.9719 7.13125V8H13.5844L13.1344 10.4438H10.9688V15.9406C14.9312 15.4625 18 12.0906 18 8Z"
                fill="#155DFC"
              />
            </svg>

            <span>Facebook</span>
          </button>
        </div>
        {/* login with email */}
        <div
          className="relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4"
          aria-hidden="true"
        >
          <span className="sr-only">or</span>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit(registerSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2 mb-7">
                <FieldLabel
                  className="text-[16px] font-medium text-[#364153]"
                  htmlFor={field.name}
                >
                  Name*
                </FieldLabel>
                <div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Ali"
                    autoComplete="on"
                    className="h-10.5 py-2 px-3 text-[16px]! font-medium text-[#364153] border border-[#99a1af66] rounded-[6px] focus:outline-none focus:border-primary-600! focus-visible:ring-0 placeholder:text-[16px] placeholder:text-[#9AA0A8] aria-invalid:ring-0 aria-invalid:border-[#99a1af66] shadow-none! transition-all"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError
                    className="font-medium text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2 mb-7">
                <FieldLabel
                  className="text-[16px] font-medium text-[#364153]"
                  htmlFor={field.name}
                >
                  Email*
                </FieldLabel>
                <div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="ali@example.com"
                    autoComplete="on"
                    className="h-10.5 py-2 px-3 text-[16px]! font-medium text-[#364153] border border-[#99a1af66] rounded-[6px] focus:outline-none focus:border-primary-600! focus-visible:ring-0 placeholder:text-[16px] placeholder:text-[#9AA0A8] aria-invalid:ring-0 aria-invalid:border-[#99a1af66] shadow-none! transition-all"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError
                    className="font-medium text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field className="gap-2 mb-7">
                <FieldLabel
                  className="text-[16px] font-medium text-[#364153]"
                  htmlFor={field.name}
                >
                  Password*
                </FieldLabel>
                <div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="create a strong password"
                    autoComplete="off"
                    className="h-10.5 py-2 px-3 text-[16px]! font-medium text-[#364153] border border-[#99a1af66] rounded-[6px] focus:outline-none focus:border-primary-600! focus-visible:ring-0 placeholder:text-[16px] placeholder:text-[#9AA0A8] aria-invalid:ring-0 aria-invalid:border-[#99a1af66] shadow-none! transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className="grow h-1 bg-gray-200 rounded-md overflow-hidden">
                    <div
                      className={`${strength.color} h-full transition-all duration-300 ease-out`}
                      style={{ width: strength.width }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium min-w-12.5">
                    {strength.label}
                  </span>
                </div>

                <p className="text-gray-500 -mt-2 text-xs font-medium">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </Field>
            )}
          />
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2 mb-7">
                <FieldLabel
                  className="text-[16px] font-medium text-[#364153]"
                  htmlFor={field.name}
                >
                  Confirm Password*
                </FieldLabel>
                <div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="confirm your password"
                    autoComplete="off"
                    className="h-10.5 py-2 px-3 text-[16px]! font-medium text-[#364153] border border-[#99a1af66] rounded-[6px] focus:outline-none focus:border-primary-600! focus-visible:ring-0 placeholder:text-[16px] placeholder:text-[#9AA0A8] aria-invalid:ring-0 aria-invalid:border-[#99a1af66] shadow-none! transition-all"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError
                    className="font-medium text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="gap-2 mb-7">
                <FieldLabel
                  className="text-[16px] font-medium text-[#364153]"
                  htmlFor={field.name}
                >
                  Phone Number*
                </FieldLabel>
                <div>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="+20 1245036458"
                    autoComplete="off"
                    className="h-10.5 py-2 px-3 text-[16px]! font-medium text-[#364153] border border-[#99a1af66] rounded-[6px] focus:outline-none focus:border-primary-600! focus-visible:ring-0 placeholder:text-[16px] placeholder:text-[#9AA0A8] aria-invalid:ring-0 aria-invalid:border-[#99a1af66] shadow-none! transition-all"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError
                    className="font-medium text-red-500"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <div className="flex items-center justify-between mb-7">
            <Field orientation="horizontal">
              <Checkbox
                id="terms-checkbox"
                name="terms-checkbox"
                required
                className="border border-[#767676] hover:border-gray-600 rounded-[2.5px] data-checked:text-white data-checked:bg-primary-600 data-checked:hover:bg-primary-700 data-checked:border-primary-600 [&_[data-slot=checkbox-indicator]>svg]:stroke-4 cursor-pointer"
              />
              <Label
                className="text-md font-medium text-gray-700 gap-1 ml-1"
                htmlFor="terms-checkbox"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary-600 hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                *
              </Label>
            </Field>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-10.5 bg-primary-600 text-white py-2 px-4 rounded-[8px] hover:bg-primary-700 transition-all duration-200 gap-2 font-semibold text-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <><Spinner className="size-6" />
              <span>creating account...</span></>
            ) : ( <>
            <svg
              width="20"
              height="16"
              className="w-5!"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.25 4C4.25 3.00544 4.64509 2.05161 5.34835 1.34835C6.05161 0.645088 7.00544 0.25 8 0.25C8.99456 0.25 9.94839 0.645088 10.6517 1.34835C11.3549 2.05161 11.75 3.00544 11.75 4C11.75 4.99456 11.3549 5.94839 10.6517 6.65165C9.94839 7.35491 8.99456 7.75 8 7.75C7.00544 7.75 6.05161 7.35491 5.34835 6.65165C4.64509 5.94839 4.25 4.99456 4.25 4ZM1.5 15.0719C1.5 11.9937 3.99375 9.5 7.07188 9.5H8.92813C12.0063 9.5 14.5 11.9937 14.5 15.0719C14.5 15.5844 14.0844 16 13.5719 16H2.42812C1.91562 16 1.5 15.5844 1.5 15.0719ZM17 3C17.4156 3 17.75 3.33437 17.75 3.75V5.25H19.25C19.6656 5.25 20 5.58437 20 6C20 6.41563 19.6656 6.75 19.25 6.75H17.75V8.25C17.75 8.66562 17.4156 9 17 9C16.5844 9 16.25 8.66562 16.25 8.25V6.75H14.75C14.3344 6.75 14 6.41563 14 6C14 5.58437 14.3344 5.25 14.75 5.25H16.25V3.75C16.25 3.33437 16.5844 3 17 3Z"
                fill="currentColor"
              />
            </svg>
            <span>Create My Account</span>
            </> )}
          </Button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center font-medium">
          Already have an account?{" "}
          <Link className="text-primary-600 hover:underline" href="/login">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
