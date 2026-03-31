"use client";
import { addProductToWishlist, removeProductFromWishlist } from "@/actions/wishlist.actions";
import { Spinner } from "@/components/ui/spinner";
import { RemoveProductWishlistType } from "@/components/Wishlist/ProductCardInWishlist/remove-product-wishlist.type";
import { useWishlist } from "@/hook/useWishlist";
import React, { useState } from "react";
import { toast } from "sonner";

export default function AddToWishlistDetailsButton({
  productId,
}: {
  productId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const { updateWishlist, wishlistItems } = useWishlist();

  async function addToWishlist(productId: string) {
    setIsLoading(true);
    const res: RemoveProductWishlistType =
      await addProductToWishlist(productId);
    if (res.status === "success") {
      updateWishlist(res.data);
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    setIsLoading(false);
  }
   async function handelRemoveProduct(id:string) {  
      setIsLoading(true);
  
      const res: RemoveProductWishlistType = await removeProductFromWishlist(id);
  
      if (res.status === "success") {
        toast.success(res.message);
        updateWishlist(res.data);
      } else {
        toast.error(res.message);
      }
  
      setIsLoading(false);
    }
  const isInWishlist = wishlistItems.includes(productId);

  return (
    <button
      className={`flex-1 border-2 py-3 px-4 rounded-[12px] font-medium transition flex items-center justify-center gap-2 ${isInWishlist ? "border-red-200 text-red-600 bg-red-50" : "border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600"} cursor-pointer`}
      onClick={() => isInWishlist? handelRemoveProduct(productId) : addToWishlist(productId)}
    >
      {isInWishlist ? (
        <>
          {isLoading? <Spinner/> : <svg
            data-prefix="fas"
            data-icon="heart"
            className="w-5 h-4"
            role="img"
            viewBox="0 0 512 512"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z"
            ></path>
          </svg>}
          In Wishlist
        </>
      ) : (
        <>
          {isLoading ? <Spinner/> : <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8406 1.5C10.9875 1.5 10.1844 1.90937 9.68437 2.6L8.60938 4.0875C8.46875 4.28125 8.24375 4.39687 8.00313 4.39687C7.7625 4.39687 7.5375 4.28125 7.39687 4.0875L6.32188 2.6C5.82188 1.90937 5.01875 1.5 4.16563 1.5C2.69688 1.5 1.50625 2.69063 1.50625 4.15938C1.50625 5.71875 2.50625 7.23438 3.63438 8.60625C4.91875 10.1687 6.49062 11.5438 7.56875 12.3656C7.66875 12.4406 7.81563 12.4969 8.00625 12.4969C8.19688 12.4969 8.34375 12.4406 8.44375 12.3656C9.52188 11.5438 11.0938 10.1656 12.3781 8.60625C13.5094 7.23438 14.5063 5.71875 14.5063 4.15938C14.5063 2.69063 13.3156 1.5 11.8469 1.5H11.8406ZM8.46875 1.72187C9.25 0.640625 10.5062 0 11.8406 0C14.1375 0 16 1.8625 16 4.15938C16 6.30313 14.6594 8.1875 13.5281 9.55937C12.15 11.2344 10.4875 12.6875 9.34688 13.5562C8.9625 13.85 8.4875 13.9969 8 13.9969C7.5125 13.9969 7.0375 13.85 6.65312 13.5562C5.5125 12.6875 3.85 11.2344 2.47187 9.5625C1.34062 8.19063 0 6.30313 0 4.15938C0 1.8625 1.8625 0 4.15938 0C5.49375 0 6.75 0.640625 7.53125 1.72187L8 2.36875L8.46875 1.72187Z"
              fill="currentColor"
            />
          </svg>}
          Add to Wishlist
        </>
      )}
    </button>
  );
}
