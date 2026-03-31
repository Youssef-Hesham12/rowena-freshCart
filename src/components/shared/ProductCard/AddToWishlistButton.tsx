"use client";

import { useWishlist } from "@/hook/useWishlist";
import { useState } from "react";
import { toast } from "sonner";
import { RemoveProductWishlistType } from "./../../Wishlist/ProductCardInWishlist/remove-product-wishlist.type";
import { Spinner } from "@/components/ui/spinner";
import { addProductToWishlist, removeProductFromWishlist } from "@/actions/wishlist.actions";

export default function AddToWishlistButton({
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
      className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500 cursor-pointer"
      title="Add to wishlist"
      onClick={() => isInWishlist? handelRemoveProduct(productId) : addToWishlist(productId)}
    >
      {isLoading ? (
        <Spinner />
      ) : isInWishlist ? (
        <svg
          data-prefix="fas"
          data-icon="heart"
          className="w-5 h-4"
          role="img"
          viewBox="0 0 512 512"
          aria-hidden="true"
        >
          <path
            fill="#fb2c36"
            d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1l0 2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7l0-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z"
          ></path>
        </svg>
      ) : (
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8406 2.5C12.9875 2.5 12.1844 2.90937 11.6844 3.6L10.6094 5.0875C10.4688 5.28125 10.2438 5.39687 10.0031 5.39687C9.7625 5.39687 9.5375 5.28125 9.39687 5.0875L8.32188 3.6C7.82188 2.90937 7.01875 2.5 6.16563 2.5C4.69688 2.5 3.50625 3.69063 3.50625 5.15938C3.50625 6.71875 4.50625 8.23438 5.63438 9.60625C6.91875 11.1687 8.49062 12.5438 9.56875 13.3656C9.66875 13.4406 9.81563 13.4969 10.0063 13.4969C10.1969 13.4969 10.3438 13.4406 10.4438 13.3656C11.5219 12.5438 13.0938 11.1656 14.3781 9.60625C15.5094 8.23438 16.5063 6.71875 16.5063 5.15938C16.5063 3.69063 15.3156 2.5 13.8469 2.5H13.8406ZM10.4688 2.72187C11.25 1.64062 12.5062 1 13.8406 1C16.1375 1 18 2.8625 18 5.15938C18 7.30313 16.6594 9.1875 15.5281 10.5594C14.15 12.2344 12.4875 13.6875 11.3469 14.5562C10.9625 14.85 10.4875 14.9969 10 14.9969C9.5125 14.9969 9.0375 14.85 8.65312 14.5562C7.5125 13.6875 5.85 12.2344 4.47187 10.5625C3.34062 9.19063 2 7.30313 2 5.15938C2 2.8625 3.8625 1 6.15938 1C7.49375 1 8.75 1.64062 9.53125 2.72187L10 3.36875L10.4688 2.72187Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
