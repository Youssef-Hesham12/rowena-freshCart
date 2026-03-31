import React from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner className="size-12 text-primary-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Loading FreshCart...
          </h2>
          <p className="text-gray-600">
            Please wait while we prepare your experience
          </p>
        </div>
      </div>
    </div>
  );
}
