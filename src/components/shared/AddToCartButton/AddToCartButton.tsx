"use client"
import { addToCart } from "@/actions/cart.actions";
import { ButtonProps } from "./button-props.type";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useCart } from "@/hook/useCart";

export default function AddToCartButton({
  productId,
  children,
  className,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {updateCart} =useCart()

  async function addProductToCart(productId: string) {
    setIsLoading(true)
    const res = await addToCart(productId)
    if(res.status === "success"){
      updateCart(res.data.products,res.numOfCartItems)
      toast.success(res.message)
    }
    else{
      toast.error(res.message);
    }
    setIsLoading(false)
  }

  return (
    <button
      onClick={() => addProductToCart(productId)}
      className={`bg-primary-600 text-white hover:bg-primary-700 flex items-center justify-center transition-all cursor-pointer ${className}`}
    >
      {isLoading ? (
        <Spinner className="size-6" /> 
      ) : (
        children
      )}
    </button>
  );
}
