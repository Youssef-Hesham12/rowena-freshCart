import { ProductCart } from "@/types/cart.types";
import Image from "next/image";
import Link from 'next/link';

export default function CartItemsCard({product}: {product : ProductCart}) {
  return (
    <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-[12px] p-4">
      <Link href={`/products/${product.product._id}`} className="w-16 h-16 bg-gray-50 rounded-[12px] p-2">
        <Image
          alt={product.product.title}
          src={product.product.imageCover}
          width={48}
          height={48}
          className="w-12 h-12 object-contain"
        />
      </Link>
      <div className="flex-1">
        <Link href={`/products/${product.product._id}`} className="font-medium text-gray-900 mb-1">{product.product.title}</Link>
        <p className="text-sm font-medium text-gray-500">{product.count} × {product.price.toLocaleString()} EGP</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">{(product.count * product.price).toLocaleString()}</p>
        <p className="text-xs font-medium text-gray-400">EGP</p>
      </div>
    </div>
  );
}
