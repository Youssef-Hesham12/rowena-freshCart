import { ProductCart } from "@/types/cart.types";
import Image from "next/image";

export default function CheckoutProductCard({product}:{product: ProductCart}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
        <Image
          alt={product.product.title}
          className="w-full h-full object-contain"
          src={product.product.imageCover}
          width={56}
          height={56}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {product.product.title}
        </p>
        <p className="text-xs font-medium text-gray-500 mt-0.5">{product.count} × {product.price.toLocaleString()} EGP</p>
      </div>
      <p className="text-sm font-bold text-gray-900 shrink-0">{(product.count * product.price).toLocaleString()}</p>
    </div>
  );
}
