import React from "react";
import HeaderSection from "../HeaderSection/HeaderSection";
import { getAllProducts } from "@/services/products.service";
import { ProductsResponseType } from "@/types/response.types";
import ProductCard from "../../shared/ProductCard/ProductCard";

export default async function Products() {
  const products: ProductsResponseType = await getAllProducts();

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <HeaderSection headerName="Featured" sectionName="Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
