"use client";
import ProductCard from "@/components/shared/ProductCard/ProductCard";
import { Spinner } from "@/components/ui/spinner";
import { BrandType } from "@/types/brand.types";
import { CategoryType } from "@/types/category.types";
import { ProductType } from "@/types/product.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useMemo } from "react";

export default function SearchResult({
  productsRes,
  categoriesRes,
  brandsRes,
}: {
  productsRes: ProductType[];
  categoriesRes: CategoryType[];
  brandsRes: BrandType[];
}) {
  const [view, setView] = useState("grid");
  const [priceTimeout, setPriceTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const q = searchParams.get("q") || "";
    

  const selectedCategories = searchParams.getAll("category");

  const selectedBrands = searchParams.getAll("brand");

  const products = useMemo(() => {
    return productsRes?.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category._id);

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand._id);

      const matchesMinPrice =
        !searchParams.get("minPrice") ||
        product.price >= Number(searchParams.get("minPrice"));

      const matchesMaxPrice =
        !searchParams.get("maxPrice") ||
        product.price <= Number(searchParams.get("maxPrice"));

      const matchesSearch =
        !q || product.title.toLowerCase().includes(q.toLowerCase());

      return (
        matchesCategory &&
        matchesBrand &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesSearch
      );
    });
  }, [productsRes, selectedCategories, selectedBrands, searchParams, q]);

  const categories = searchParams.getAll("category");
  const brands = searchParams.getAll("brand");
  function removeParam(key: string, value?: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(key);
    } else {
      const values = params.getAll(key).filter((v) => v !== value);

      params.delete(key);

      values.forEach((v) => params.append(key, v));
    }

    startTransition(() => {
      router.replace(`/search?${params.toString()}`);
    });
  }

  const clearAllFilters = () => {
    startTransition(() => {
      router.replace("/search");
    });
  };

  function updateParams(params: URLSearchParams) {
    startTransition(() => {
      router.replace(`/search?${params.toString()}`);
    });
  }

  const handlePriceChange = (key: "minPrice" | "maxPrice", value: string) => {
    if (priceTimeout) clearTimeout(priceTimeout);

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      updateParams(params);
    }, 400);

    setPriceTimeout(timeout);
  };

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="bg-white rounded-[16px] border border-gray-100 p-6 sticky top-24">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Categories</h3>
              </div>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {categoriesRes?.map((category) => (
                  <label
                    key={category._id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={searchParams
                        .getAll("category")
                        .includes(category._id)}
                      onChange={() => {
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );
                        const categories = params.getAll("category");

                        if (categories.includes(category._id)) {
                          const newCategories = categories.filter(
                            (c) => c !== category._id,
                          );

                          params.delete("category");

                          newCategories.forEach((c) =>
                            params.append("category", c),
                          );
                        } else {
                          params.append("category", category._id);
                        }

                        updateParams(params);
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <hr className="border-gray-100" />
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Min (EGP)
                  </label>
                  <input
                    placeholder="0"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                    type="number"
                    value={searchParams.get("minPrice") || ""}
                    onChange={(e) =>
                      handlePriceChange("minPrice", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    Max (EGP)
                  </label>
                  <input
                    placeholder="No limit"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                    type="number"
                    value={searchParams.get("maxPrice") || ""}
                    onChange={(e) =>
                      handlePriceChange("maxPrice", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());

                    params.set("maxPrice", "500");

                    updateParams(params);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                >
                  Under 500
                </button>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());

                    params.set("maxPrice", "1000");

                    updateParams(params);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                >
                  Under 1K
                </button>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());

                    params.set("maxPrice", "5000");

                    updateParams(params);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                >
                  Under 5K
                </button>
                <button
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());

                    params.set("maxPrice", "10000");

                    updateParams(params);
                  }}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
                >
                  Under 10K
                </button>
              </div>
            </div>
            <hr className="border-gray-100" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Brands</h3>
              </div>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {brandsRes?.map((brand) => (
                  <label
                    key={brand._id}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={searchParams.getAll("brand").includes(brand._id)}
                      onChange={() => {
                        const params = new URLSearchParams(
                          searchParams.toString(),
                        );
                        const brands = params.getAll("brand");

                        if (brands.includes(brand._id)) {
                          const newBrands = brands.filter(
                            (b) => b !== brand._id,
                          );

                          params.delete("brand");

                          newBrands.forEach((b) => params.append("brand", b));
                        } else {
                          params.append("brand", brand._id);
                        }

                        updateParams(params);
                      }}
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                      {brand.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <hr className="border-gray-100" />
            <button
              onClick={clearAllFilters}
              className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <button className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
              <svg
                data-prefix="fas"
                data-icon="sliders"
                className="svg-inline--fa fa-sliders"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 224zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384z"
                ></path>
              </svg>
              Filters
            </button>
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-[6px] transition-colors ${view === "grid" ? "bg-primary-600 text-white" : "text-gray-500 hover:text-gray-700"} cursor-pointer`}
              >
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 1.25C9 0.559375 8.44062 0 7.75 0H6.25C5.55937 0 5 0.559375 5 1.25V2.75C5 3.44062 5.55937 4 6.25 4H7.75C8.44062 4 9 3.44062 9 2.75V1.25ZM9 7.25C9 6.55937 8.44062 6 7.75 6H6.25C5.55937 6 5 6.55937 5 7.25V8.75C5 9.44063 5.55937 10 6.25 10H7.75C8.44062 10 9 9.44063 9 8.75V7.25ZM5 13.25V14.75C5 15.4406 5.55937 16 6.25 16H7.75C8.44062 16 9 15.4406 9 14.75V13.25C9 12.5594 8.44062 12 7.75 12H6.25C5.55937 12 5 12.5594 5 13.25ZM15 1.25C15 0.559375 14.4406 0 13.75 0H12.25C11.5594 0 11 0.559375 11 1.25V2.75C11 3.44062 11.5594 4 12.25 4H13.75C14.4406 4 15 3.44062 15 2.75V1.25ZM11 7.25V8.75C11 9.44063 11.5594 10 12.25 10H13.75C14.4406 10 15 9.44063 15 8.75V7.25C15 6.55937 14.4406 6 13.75 6H12.25C11.5594 6 11 6.55937 11 7.25ZM15 13.25C15 12.5594 14.4406 12 13.75 12H12.25C11.5594 12 11 12.5594 11 13.25V14.75C11 15.4406 11.5594 16 12.25 16H13.75C14.4406 16 15 15.4406 15 14.75V13.25Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-[6px] transition-colors ${view === "list" ? "bg-primary-600 text-white" : "text-gray-500 hover:text-gray-700"} cursor-pointer`}
              >
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.25 1.5C2.83437 1.5 2.5 1.83437 2.5 2.25V3.75C2.5 4.16563 2.83437 4.5 3.25 4.5H4.75C5.16563 4.5 5.5 4.16563 5.5 3.75V2.25C5.5 1.83437 5.16563 1.5 4.75 1.5H3.25ZM8 2C7.44688 2 7 2.44687 7 3C7 3.55312 7.44688 4 8 4H17C17.5531 4 18 3.55312 18 3C18 2.44687 17.5531 2 17 2H8ZM8 7C7.44688 7 7 7.44688 7 8C7 8.55312 7.44688 9 8 9H17C17.5531 9 18 8.55312 18 8C18 7.44688 17.5531 7 17 7H8ZM8 12C7.44688 12 7 12.4469 7 13C7 13.5531 7.44688 14 8 14H17C17.5531 14 18 13.5531 18 13C18 12.4469 17.5531 12 17 12H8ZM2.5 7.25V8.75C2.5 9.16563 2.83437 9.5 3.25 9.5H4.75C5.16563 9.5 5.5 9.16563 5.5 8.75V7.25C5.5 6.83437 5.16563 6.5 4.75 6.5H3.25C2.83437 6.5 2.5 6.83437 2.5 7.25ZM3.25 11.5C2.83437 11.5 2.5 11.8344 2.5 12.25V13.75C2.5 14.1656 2.83437 14.5 3.25 14.5H4.75C5.16563 14.5 5.5 14.1656 5.5 13.75V12.25C5.5 11.8344 5.16563 11.5 4.75 11.5H3.25Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">Sort by:</span>
            <select
              value={searchParams.get("sort") || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString());

                if (e.target.value) {
                  params.set("sort", e.target.value);
                } else {
                  params.delete("sort");
                }

                updateParams(params);
              }}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-white"
            >
              <option value="">Relevance</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratingsAverage">Rating: High to Low</option>
              <option value="title">Name: A to Z</option>
              <option value="-title">Name: Z to A</option>
            </select>
          </div>
        </div>
        {searchParams.size > 0 && <div className="mb-6 flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
            <svg
              data-prefix="fas"
              data-icon="filter"
              className="w-3.75 h-3"
              role="img"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M32 64C19.1 64 7.4 71.8 2.4 83.8S.2 109.5 9.4 118.6L192 301.3 192 416c0 8.5 3.4 16.6 9.4 22.6l64 64c9.2 9.2 22.9 11.9 34.9 6.9S320 492.9 320 480l0-178.7 182.6-182.6c9.2-9.2 11.9-22.9 6.9-34.9S492.9 64 480 64L32 64z"
              ></path>
            </svg>
            Active:
          </span>
          {/* Search keyword */}
          {q && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
              &quot;{q}&quot;
              <button
                onClick={() => removeParam("q")}
                className="hover:text-red-500 cursor-pointer"
              >
                <svg
                  data-prefix="fas"
                  data-icon="xmark"
                  className="w-3.75 h-3"
                  role="img"
                  viewBox="0 0 384 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
                  ></path>
                </svg>
              </button>
            </span>
          )}

          {/* Categories */}
          {categories?.map((cat) => {
            const categoryName =
              categoriesRes?.find((c) => c._id === cat)?.name || cat;

            return (
              <span
                key={cat}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs"
              >
                {categoryName}
                <button
                  onClick={() => removeParam("category", cat)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <svg
                    data-prefix="fas"
                    data-icon="xmark"
                    className="w-3.75 h-3"
                    role="img"
                    viewBox="0 0 384 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
                    ></path>
                  </svg>
                </button>
              </span>
            );
          })}

          {/* Brands */}
          {brands?.map((brand) => {
            const brandName =
              brandsRes?.find((b) => b._id === brand)?.name || brand;

            return (
              <span
                key={brand}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs"
              >
                {brandName}
                <button
                  onClick={() => removeParam("brand", brand)}
                  className="hover:text-red-500 cursor-pointer"
                >
                  <svg
                    data-prefix="fas"
                    data-icon="xmark"
                    className="w-3.75 h-3"
                    role="img"
                    viewBox="0 0 384 512"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"
                    ></path>
                  </svg>
                </button>
              </span>
            );
          })}
          <button
            onClick={clearAllFilters}
            className="text-xs font-medium text-gray-500 hover:text-gray-700 underline ml-2 cursor-pointer"
          >
            Clear all
          </button>
        </div>}
        {isPending ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <Spinner className="size-8 text-primary-500" />
              <p className="text-gray-500 font-medium">Searching products...</p>
            </div>
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <svg
                data-prefix="fas"
                data-icon="magnifying-glass"
                className="w-[37.5px] h-7.5 text-gray-400"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 font-medium mb-6">
              Try adjusting your search or filters to find what you&apos;re
              looking for.
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors cursor-pointer">
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`${view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" : "space-y-4"}`}
          >
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
