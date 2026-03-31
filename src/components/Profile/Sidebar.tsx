"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathName = usePathname();
  const [activeBtn, setActiveBtn] = useState("addresses");
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-[16px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2">
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 group ${pathName === "/profile/addresses" ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              href="/profile/addresses"
              onClick={() => setActiveBtn("addresses")}
            >
              <div
                className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition-colors ${pathName === "/profile/addresses" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}
              >
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.49883 5.15703C3.49883 2.30781 5.85039 0 8.74883 0C11.6473 0 13.9988 2.30781 13.9988 5.15703C13.9988 8.41914 10.7121 12.3293 9.33945 13.8195C9.0168 14.1695 8.47813 14.1695 8.15547 13.8195C6.78281 12.3293 3.49609 8.41914 3.49609 5.15703H3.49883ZM8.74883 7C9.21296 7 9.65808 6.81563 9.98627 6.48744C10.3145 6.15925 10.4988 5.71413 10.4988 5.25C10.4988 4.78587 10.3145 4.34075 9.98627 4.01256C9.65808 3.68437 9.21296 3.5 8.74883 3.5C8.2847 3.5 7.83958 3.68437 7.51139 4.01256C7.1832 4.34075 6.99883 4.78587 6.99883 5.25C6.99883 5.71413 7.1832 6.15925 7.51139 6.48744C7.83958 6.81563 8.2847 7 8.74883 7Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-medium flex-1">My Addresses</span>
              <svg
                width="15"
                height="12"
                className={`transition-transform ${pathName === "/profile/addresses" ? "text-primary-500" : "text-gray-400"}`}
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0432 5.4703C11.3361 5.76327 11.3361 6.23905 11.0432 6.53202L6.54316 11.032C6.2502 11.325 5.77441 11.325 5.48145 11.032C5.18848 10.7391 5.18848 10.2633 5.48145 9.9703L9.45176 5.99999L5.48379 2.02968C5.19082 1.73671 5.19082 1.26093 5.48379 0.967957C5.77676 0.674988 6.25254 0.674988 6.54551 0.967957L11.0455 5.46796L11.0432 5.4703Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-[12px] transition-all duration-200 group ${pathName === "/profile/settings" ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              href="/profile/settings"
              onClick={() => setActiveBtn("settings")}
            >
              <div
                className={`w-9 h-9 rounded-[8px] flex items-center justify-center transition-colors ${pathName === "/profile/settings" ? "bg-primary-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}
              >
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.08644 0.697266C7.16847 0.292578 7.52668 0 7.9423 0H9.57746C9.99308 0 10.3513 0.292578 10.4333 0.697266L10.8298 2.61133C11.2153 2.77539 11.5763 2.98594 11.9044 3.23477L13.7583 2.61953C14.1521 2.48828 14.5841 2.65234 14.7919 3.01328L15.6095 4.42969C15.8173 4.79063 15.7435 5.24453 15.4318 5.5207L13.9743 6.8168C13.9989 7.01914 14.0099 7.22695 14.0099 7.4375C14.0099 7.64805 13.9962 7.85586 13.9743 8.0582L15.4345 9.35703C15.7462 9.6332 15.8173 10.0898 15.6122 10.448L14.7946 11.8645C14.5868 12.2227 14.1548 12.3895 13.7611 12.2582L11.9071 11.643C11.5763 11.8918 11.2153 12.0996 10.8325 12.2664L10.4388 14.1777C10.354 14.5852 9.99582 14.875 9.58293 14.875H7.94777C7.53214 14.875 7.17394 14.5824 7.09191 14.1777L6.69816 12.2664C6.31261 12.1023 5.95441 11.8918 5.62355 11.643L3.76144 12.2582C3.36769 12.3895 2.93566 12.2254 2.72785 11.8645L1.91027 10.448C1.70246 10.0871 1.77628 9.6332 2.088 9.35703L3.54816 8.0582C3.52355 7.85586 3.51261 7.64805 3.51261 7.4375C3.51261 7.22695 3.52628 7.01914 3.54816 6.8168L2.088 5.51797C1.77628 5.2418 1.70519 4.78516 1.91027 4.42695L2.72785 3.01055C2.93566 2.64961 3.36769 2.48555 3.76144 2.6168L5.61535 3.23203C5.94621 2.9832 6.30714 2.77539 6.68996 2.60859L7.08644 0.697266ZM8.75988 9.625C9.04714 9.62392 9.33139 9.56627 9.59637 9.45535C9.86136 9.34442 10.1019 9.18239 10.3043 8.9785C10.5066 8.77461 10.6669 8.53285 10.7758 8.26704C10.8847 8.00123 10.9403 7.71656 10.9392 7.4293C10.9381 7.14203 10.8805 6.85779 10.7695 6.5928C10.6586 6.32781 10.4966 6.08727 10.2927 5.8849C10.0888 5.68254 9.84703 5.52231 9.58122 5.41337C9.31541 5.30444 9.03074 5.24892 8.74347 5.25C8.45621 5.25108 8.17196 5.30873 7.90698 5.41965C7.64199 5.53058 7.40145 5.69261 7.19908 5.8965C6.99671 6.10039 6.83649 6.34215 6.72755 6.60796C6.61861 6.87377 6.5631 7.15844 6.56418 7.4457C6.56525 7.73297 6.6229 8.01721 6.73383 8.2822C6.84476 8.54719 7.00679 8.78773 7.21068 8.9901C7.41457 9.19246 7.65632 9.35269 7.92213 9.46163C8.18795 9.57056 8.47261 9.62608 8.75988 9.625Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-medium flex-1">Settings</span>
              <svg
                width="15"
                height="12"
                className={`transition-transform ${pathName === "/profile/settings" ? "text-primary-500" : "text-gray-400"}`}
                viewBox="0 0 15 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0432 5.4703C11.3361 5.76327 11.3361 6.23905 11.0432 6.53202L6.54316 11.032C6.2502 11.325 5.77441 11.325 5.48145 11.032C5.18848 10.7391 5.18848 10.2633 5.48145 9.9703L9.45176 5.99999L5.48379 2.02968C5.19082 1.73671 5.19082 1.26093 5.48379 0.967957C5.77676 0.674988 6.25254 0.674988 6.54551 0.967957L11.0455 5.46796L11.0432 5.4703Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
