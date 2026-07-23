"use client";

import { useCart } from "@/context/CartContext";
import ProductsDetailsDemo from "./ProductsDetailsDemo";
import { AiFillSafetyCertificate } from "react-icons/ai";
import OrderSummary from "./OrderSummary";

export default function ProductDetails() {
  const { cart, increase, decrease, removeFromCart } = useCart();

  return (
    <div className="mt-8 flex xl:flex-row flex-col justify-between items-start gap-8">
      <div className="xl:w-[65%] w-full">
        {/* TABLE HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center px-4 font-bold text-xs py-3 bg-gray-50 text-gray-600 gap-2 sm:justify-between tracking-wider uppercase border-b border-gray-200">
          <p>PRODUCT</p>
          <div className="hidden sm:flex justify-between w-full sm:w-[45%]">
            <p>PRICE</p>
            <p>QUANTITY</p>
            <p className="text-right">TOTAL</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center text-2xl font-medium py-16 text-gray-500 border-b border-gray-200">
            Your cart is empty
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {cart.map((item) => (
              <ProductsDetailsDemo
                key={`${item.id}-${item.color}`}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        )}

        {/* ADDITIONAL COMMENTS */}
        <div className="mt-8">
          <h1 className="font-bold text-sm mb-2 text-gray-900 uppercase tracking-wide">
            Additional Comments
          </h1>
          <textarea
            className="xl:w-[80%] w-full h-[95px] resize-none outline-none border border-gray-300 rounded-md p-3 text-sm placeholder-gray-400 focus:border-black transition-colors"
            placeholder="Special instruction for seller..."
          />
          <div className="flex items-center gap-2 mt-3">
            <AiFillSafetyCertificate className="text-2xl text-emerald-600" />
            <p className="text-gray-700 text-[15px] font-medium">Secure shopping guarantee</p>
          </div>
        </div>
      </div>

      <div className="xl:w-[32%] w-full">
        <OrderSummary />
      </div>
    </div>
  );
}