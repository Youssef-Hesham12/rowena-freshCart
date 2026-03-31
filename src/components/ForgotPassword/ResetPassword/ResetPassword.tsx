import React from "react";

export default function ResetPassword() {
  return (
    <div className="hidden lg:block">
      <div className="text-center space-y-6">
        <div className="w-full h-96 bg-linear-to-br from-primary-50 via-green-50 to-emerald-50 rounded-[16px] shadow-lg flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-primary-100/50"></div>
          <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50"></div>
          <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50"></div>
          <div className="relative flex flex-col items-center gap-6 z-10">
            <div className="w-28 h-28 rounded-[24px] bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-20 h-20 rounded-[16px] bg-primary-100 flex items-center justify-center">
                <svg
                  data-prefix="fas"
                  data-icon="lock"
                  className="text-primary-600 w-11.25 h-9"
                  role="img"
                  viewBox="0 0 384 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M128 96l0 64 128 0 0-64c0-35.3-28.7-64-64-64s-64 28.7-64 64zM64 160l0-64C64 25.3 121.3-32 192-32S320 25.3 320 96l0 64c35.3 0 64 28.7 64 64l0 224c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 224c0-35.3 28.7-64 64-64z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="absolute -left-16 top-4 w-14 h-14 rounded-[12px] bg-white shadow-lg flex items-center justify-center -rotate-12">
              <svg
                data-prefix="fas"
                data-icon="envelope"
                className="w-6.25 h-5 text-primary-500"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z"
                ></path>
              </svg>
            </div>
            <div className="absolute -right-16 top-8 w-14 h-14 rounded-[12px] bg-white shadow-lg flex items-center justify-center rotate-12">
              <svg
                data-prefix="fas"
                data-icon="shield-halved"
                className="w-6.25 h-5 text-green-500"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M256 0c4.6 0 9.2 1 13.4 2.9L457.8 82.8c22 9.3 38.4 31 38.3 57.2-.5 99.2-41.3 280.7-213.6 363.2-16.7 8-36.1 8-52.8 0-172.4-82.5-213.1-264-213.6-363.2-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.9 1 251.4 0 256 0zm0 66.8l0 378.1c138-66.8 175.1-214.8 176-303.4l-176-74.6 0 0z"
                ></path>
              </svg>
            </div>
            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-primary-400 animate-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse [animation-delay:150ms]"></div>
              <div className="w-3 h-3 rounded-full bg-primary-600 animate-pulse [animation-delay:300ms]"></div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-lg font-medium text-gray-600">
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you
            get back into your account in no time.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm font-medium text-gray-500">
            <div className="flex items-center">
              <svg
                width="26"
                height="14"
                viewBox="0 0 26 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.0625 1.75C2.33789 1.75 1.75 2.33789 1.75 3.0625C1.75 3.47539 1.94414 3.86367 2.275 4.1125L7.9625 8.37812C8.43008 8.72812 9.06992 8.72812 9.5375 8.37812L15.225 4.1125C15.5559 3.86367 15.75 3.47539 15.75 3.0625C15.75 2.33789 15.1621 1.75 14.4375 1.75H3.0625ZM1.75 5.35938V10.5C1.75 11.4652 2.53477 12.25 3.5 12.25H14C14.9652 12.25 15.75 11.4652 15.75 10.5V5.35938L10.325 9.42812C9.39258 10.1281 8.10742 10.1281 7.175 9.42812L1.75 5.35938Z"
                  fill="#16A34A"
                />
              </svg>
              Email Verification
            </div>
            <div className="flex items-center">
              <svg
                width="26"
                height="14"
                viewBox="0 0 26 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75118 0C8.87697 0 9.00275 0.0273438 9.11759 0.0792969L14.2692 2.26406C14.8707 2.51836 15.3192 3.11172 15.3164 3.82812C15.3027 6.54063 14.1871 11.5035 9.47579 13.7594C9.01915 13.9781 8.48868 13.9781 8.03204 13.7594C3.31798 11.5035 2.20509 6.54063 2.19142 3.82812C2.18868 3.11172 2.63712 2.51836 3.23868 2.26406L8.38751 0.0792969C8.50236 0.0273438 8.6254 0 8.75118 0ZM8.75118 1.82656V12.1652C12.5246 10.3387 13.5391 6.2918 13.5637 3.86914L8.75118 1.8293V1.82656Z"
                  fill="#16A34A"
                />
              </svg>
              Secure Reset
            </div>
            <div className="flex items-center">
              <svg
                width="26"
                height="15"
                viewBox="0 0 26 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3.5V5.25H10.5V3.5C10.5 2.53477 9.71523 1.75 8.75 1.75C7.78477 1.75 7 2.53477 7 3.5ZM5.25 5.25V3.5C5.25 1.5668 6.8168 0 8.75 0C10.6832 0 12.25 1.5668 12.25 3.5V5.25C13.2152 5.25 14 6.03477 14 7V13.125C14 14.0902 13.2152 14.875 12.25 14.875H5.25C4.28477 14.875 3.5 14.0902 3.5 13.125V7C3.5 6.03477 4.28477 5.25 5.25 5.25Z"
                  fill="#16A34A"
                />
              </svg>
              Encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
