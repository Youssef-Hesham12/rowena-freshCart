"use client";
import { removeProductFromCart } from "@/actions/cart.actions";
import { DeleteButtonProps } from "@/components/shared/delete-btn.type";
import { useCart } from "@/hook/useCart";
import { confirmDialog } from "@/lib/confirmDialog-utils";
import { CartType } from "@/types/cart.types";
import { toast } from "sonner";


export default function DeleteProductButton({
  productId,
  productTitle,
  setIsLoading,
}: DeleteButtonProps) {
  const { updateCart } = useCart();

  async function handleRemoveProduct(id: string) {
    const result = await confirmDialog({
      title: "Remove Item?",
      description: `Remove ${productTitle} from your cart?`,
      confirmText: "Remove",
      cancelText: "Cancel",
      icon: "trash",
    });

    if (!result.isConfirmed) return;

    setIsLoading(true);

    const res: CartType = await removeProductFromCart(id);

    if (res.status === "success") {
      toast.success(res.message);
      updateCart(res.data.products,res.numOfCartItems);
    } else {
      toast.error(res.message);
    }

    setIsLoading(false);
  }
  return (
    <button
      className="h-10 w-10 rounded-[12px] border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer"
      title="Remove item"
      aria-label="Remove from cart"
      onClick={() => handleRemoveProduct(productId)}
    >
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.36289 0.598828L6.125 1.3125H3.5C3.01602 1.3125 2.625 1.70352 2.625 2.1875C2.625 2.67148 3.01602 3.0625 3.5 3.0625H14C14.484 3.0625 14.875 2.67148 14.875 2.1875C14.875 1.70352 14.484 1.3125 14 1.3125H11.375L11.1371 0.598828C11.0168 0.240625 10.6832 0 10.3059 0H7.19414C6.8168 0 6.4832 0.240625 6.36289 0.598828ZM14 4.375H3.5L4.07695 13.2098C4.1207 13.9016 4.69492 14.4375 5.38672 14.4375H12.1133C12.8051 14.4375 13.3793 13.9016 13.423 13.2098L14 4.375Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
