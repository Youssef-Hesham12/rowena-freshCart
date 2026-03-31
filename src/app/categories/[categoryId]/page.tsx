import SubcategoryCard from "@/components/Subcategories/SubcategoryCard/SubcategoryCard";
import {
  getSpecificCategory,
  getSubcategoriesOnCategory,
} from "@/services/categories.service";
import { CategoryType } from "@/types/category.types";
import { SubcategoryResponseType } from "@/types/response.types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryDetailsProps {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryDetails({
  params,
}: CategoryDetailsProps) {
  const { categoryId } = await params;
  const category: { data: CategoryType } =
    await getSpecificCategory(categoryId);

  const subCategories: SubcategoryResponseType =
    await getSubcategoriesOnCategory(categoryId);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4! py-12! sm:py-16!">
          <nav className="flex items-center gap-2 text-sm font-medium text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <Link
              className="hover:text-white transition-colors"
              href="/categories"
            >
              Categories
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">
              {category.data?.name}
            </span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[16px] bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              <Image
                alt={category.data?.name}
                className="w-12 h-12 object-contain"
                src={category.data?.image}
                width={48}
                height={48}
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category.data?.name}
              </h1>
              <p className="text-white/80 font-medium mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4! py-10!">
        <Link
          className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-primary-600 transition-colors mb-6"
          href="/categories"
        >
          <svg
            data-prefix="fas"
            data-icon="arrow-left"
            className="w-5 h-4"
            role="img"
            viewBox="0 0 512 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 105.4-105.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            ></path>
          </svg>
          <span>Back to Categories</span>
        </Link>
        {subCategories.data?.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <svg
                data-prefix="fas"
                data-icon="folder-open"
                className="w-[37.5px] h-7.5 text-gray-400"
                role="img"
                viewBox="0 0 576 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M56 225.6L32.4 296.2 32.4 96c0-35.3 28.7-64 64-64l138.7 0c13.8 0 27.3 4.5 38.4 12.8l38.4 28.8c5.5 4.2 12.3 6.4 19.2 6.4l117.3 0c35.3 0 64 28.7 64 64l0 16-365.4 0c-41.3 0-78 26.4-91.1 65.6zM477.8 448L99 448c-32.8 0-55.9-32.1-45.5-63.2l48-144C108 221.2 126.4 208 147 208l378.8 0c32.8 0 55.9 32.1 45.5 63.2l-48 144c-6.5 19.6-24.9 32.8-45.5 32.8z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Subcategories Found
            </h3>
            <p className="text-gray-500 font-medium mb-6">
              This category doesn&apos;t have any subcategories yet.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
              href={`/products?category=${category.data?._id}`}
            >
              View All Products in {category.data?.name}
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                {subCategories.data?.length} Subcategories in{" "}
                {category.data?.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {subCategories?.data?.map((subCategory)=> (
                <SubcategoryCard key={subCategory._id} subCategory={subCategory} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
