"use client"
import { WishlistContext } from "@/context/WishListContext";
import { useContext } from "react";
import { toast } from "sonner";

export function useWishlist(){
    const context = useContext(WishlistContext)

    if(!context){
        toast.error("useWishlist muxt be used within WishlistProvider")
    }

    return context
}