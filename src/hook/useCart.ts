"use client"
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { toast } from "sonner";

export function useCart(){
    const context = useContext(CartContext)

    if(!context){
        toast.error("useCart muxt be used within CartProvider")
    }

    return context
}