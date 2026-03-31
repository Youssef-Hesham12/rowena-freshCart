"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qFromUrl = searchParams.get("q") || "";

  const [value, setValue] = useState(qFromUrl);

  // sync state with URL
  useEffect(() => {
    setValue(qFromUrl);
  }, [qFromUrl]);

  // debounce for URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set("q", value);
      else params.delete("q");

      router.replace(`/search?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timer);
  }, [value, router, searchParams]);

  return (
    <input
      type="text"
      placeholder="Search for products..."
      value={value}
      onChange={(e)=> setValue(e.target.value)}
      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg"
    />
  );
}