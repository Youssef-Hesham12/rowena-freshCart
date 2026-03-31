import React from "react";
import { ProductDetailsType } from "../ProductDetailsSection/product-details.type";
import { getAllProducts } from "@/services/products.service";
import { ProductType } from "@/types/product.types";

import SwiperSimilarProduct from "./SwiperSimilarProduct";

export default async function SimilarProductsSection({
  product,
}: ProductDetailsType) {
  const { data: AllProducts }: { data: ProductType[] } = await getAllProducts();
  const similarProducts = AllProducts?.filter(
    (item) => item.category._id === product.category._id && item.id !== product.id,
  );
  return (
    <section className="py-10">
      <div className="container mx-auto px-4!">
        <SwiperSimilarProduct Products={similarProducts} />
      </div>
    </section>
  );
}
