import React from "react";
import NewsletterForm from "./NewsletterForm";
import AppDownloadCard from "./AppDownloadCard";

export default function NewsletterSection() {
  return (
    <section className="py-16 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="relative">
          <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
            <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
              <NewsletterForm/>
              <AppDownloadCard/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
