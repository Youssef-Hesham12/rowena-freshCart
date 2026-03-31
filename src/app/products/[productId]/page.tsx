import ProductDetailsSection from "@/components/ProductDetails/ProductDetailsSection/ProductDetailsSection";
import ProductDetailsTabsSection from "@/components/ProductDetails/ProductDetailsTabsSection/ProductDetailsTabsSection";
import SimilarProductsSection from "@/components/ProductDetails/SimilarProductsSection/SimilarProductsSection";
import { getProductDetails } from "@/services/products.service";
import { SingleProductType } from "@/types/product.types";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const { productId } = await params;

  const product: SingleProductType = await getProductDetails(productId);

  const {data: productInfo} = product

  return (
    <>
      {/* nav */}
      <nav aria-label="Breadcrumb" className="py-4">
        <div className="container mx-auto px-4!">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link
                className="text-gray-500 font-medium hover:text-primary-600 transition flex items-center gap-1.5"
                href="/"
              >
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 15 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.01091 0.20155C7.72263 -0.0656372 7.27732 -0.0656372 6.99138 0.20155L1.74138 5.07655C1.51638 5.28749 1.44138 5.61327 1.55388 5.89921C1.66638 6.18514 1.9406 6.37499 2.24998 6.37499H2.62498V10.5C2.62498 11.3273 3.29763 12 4.12498 12H10.875C11.7023 12 12.375 11.3273 12.375 10.5V6.37499H12.75C13.0594 6.37499 13.3359 6.18514 13.4484 5.89921C13.5609 5.61327 13.4859 5.28514 13.2609 5.07655L8.01091 0.20155ZM7.12498 7.49999H7.87498C8.49607 7.49999 8.99998 8.00389 8.99998 8.62499V10.875H5.99998V8.62499C5.99998 8.00389 6.50388 7.49999 7.12498 7.49999Z"
                    fill="currentColor"
                  />
                </svg>
                Home
              </Link>
              <FaChevronRight className="w-3.75 text-gray-400 text-xs mx-2" />
            </li>
            <li className="flex items-center">
              <Link
                className="text-gray-500 font-medium hover:text-primary-600 transition flex items-center gap-1.5"
                href={`/categories/${productInfo?.category._id}`}
              >
                {productInfo?.category.name}
              </Link>
              <FaChevronRight className="w-3.75 text-gray-400 text-xs mx-2" />
            </li>
            <li className="flex items-center">
              <Link
                className="text-gray-500 font-medium hover:text-primary-600 transition flex items-center gap-1.5"
                href={`/categories/${productInfo?.subcategory[0]._id}`}
              >
                {productInfo?.subcategory[0].name}
              </Link>
              <FaChevronRight className="w-3.75 text-gray-400 text-xs mx-2" />
            </li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {productInfo?.title}
            </li>
          </ol>
        </div>
      </nav>

      {/* product details */}
      <ProductDetailsSection product={productInfo} />

      {/* product details tabs */}
      <ProductDetailsTabsSection product={productInfo} />

      {/* similar products */}
      <SimilarProductsSection product={productInfo} />
    </>
  );
}
