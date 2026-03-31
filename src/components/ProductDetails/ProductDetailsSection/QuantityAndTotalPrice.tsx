"use client"
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ProductDetailsType } from "./product-details.type";

export default function QuantityAndTotalPrice({ product , offer }: ProductDetailsType) {
  const [Quantity, setQuantity] = useState(1);

  function incrementQuantity() {
    if(Quantity < product.quantity){
      const newQuantity = Quantity + 1;
      setQuantity(newQuantity)
    }
  }
  function decrementQuantity() {
    if(Quantity > 1){
      const newQuantity = Quantity - 1;
      setQuantity(newQuantity)
    }
  }
  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={decrementQuantity}
              disabled={Quantity === 1}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50 cursor-pointer"
            >
              <FaMinus className="w-5" />
            </button>
            <input
              min="1"
              max={product.quantity}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
              type="number"
              value={Quantity}
              readOnly
            />
            <button
              onClick={incrementQuantity}
              disabled={Quantity === product.quantity}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50 cursor-pointer"
            >
              <FaPlus className="w-5" />
            </button>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {product.quantity} available
          </span>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-medium">Total Price:</span>
          <span className="text-2xl font-bold text-primary-600">
            {offer ? (product.priceAfterDiscount! * Quantity).toFixed(2) : (product.price * Quantity).toFixed(2)} EGP
          </span>
        </div>
      </div>
    </>
  );
}
