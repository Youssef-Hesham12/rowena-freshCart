"use client"

import { updateCartProductQuantity } from "@/actions/cart.actions";
import { CartType, ProductCart } from "@/types/cart.types";
import { toast } from "sonner";

export default function ProductCount({ product, setIsLoading }: { product: ProductCart, setIsLoading: (value: boolean) => void }) {

    async function handleUpdateQuantity(productId: string , count: number) {
      setIsLoading(true)
    const res : CartType = await updateCartProductQuantity(productId, count)
    if(res.status === "success"){
      toast.success(res.message)
    }
    else{
      toast.error(res.message)
    }
    setIsLoading(false)
    }
    
  return (
    <div className="flex items-center bg-gray-50 rounded-[12px] p-1 border border-gray-200">
      <button
        className="h-8 w-8 rounded-[8px] bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer"
        aria-label="Decrease quantity"
        disabled={product.count === 1}
        onClick={()=> handleUpdateQuantity(product.product._id, product.count - 1)}
      >
        <svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 6C2.25 5.58516 2.58516 5.25 3 5.25H12C12.4148 5.25 12.75 5.58516 12.75 6C12.75 6.41484 12.4148 6.75 12 6.75H3C2.58516 6.75 2.25 6.41484 2.25 6Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <span className="w-12 text-center font-bold text-gray-900">{product.count}</span>
      <button
        className="h-8 w-8 rounded-[8px] bg-primary-600 shadow-sm shadow-primary-600/30 flex items-center justify-center text-white hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        aria-label="Increase quantity"
        onClick={()=> handleUpdateQuantity(product.product._id, product.count + 1)}
        disabled={product.count === product.product.quantity}
      >
        <svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.25 1.5C8.25 1.08516 7.91484 0.75 7.5 0.75C7.08516 0.75 6.75 1.08516 6.75 1.5V5.25H3C2.58516 5.25 2.25 5.58516 2.25 6C2.25 6.41484 2.58516 6.75 3 6.75H6.75V10.5C6.75 10.9148 7.08516 11.25 7.5 11.25C7.91484 11.25 8.25 10.9148 8.25 10.5V6.75H12C12.4148 6.75 12.75 6.41484 12.75 6C12.75 5.58516 12.4148 5.25 12 5.25H8.25V1.5Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
