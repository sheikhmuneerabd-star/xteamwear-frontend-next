"use client";

import { useCart } from "@/context/CartContext";
import ProductsDetailsDemo from "./ProductsDetailsDemo";
import { AiFillSafetyCertificate } from "react-icons/ai";
import OrderSummary from "./OrderSummary";

export default function ProductDetails() {
  const { cart, increase, decrease, removeFromCart } = useCart();

  return (
    <div className="mt-8 flex xl:flex-row flex-col justify-between">
      <div className="xl:w-[65%] w-full overflow-x-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center px-3 font-semibold text-sm py-3 bg-gray-50 gap-2 sm:justify-between">
          <p>PRODUCT</p>
          <div className="hidden sm:flex justify-between w-full sm:w-[50%]">
            <p>PRICE</p>
            <p>QUANTITY</p>
            <p>TOTAL</p>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center text-2xl font-medium py-10">Your cart is empty</div>
        ) : (
          cart.map((item) => (
            <ProductsDetailsDemo
              key={`${item.id}-${item.variants[0].color}`}
              item={item}
              onIncrease={increase}
              onDecrease={decrease}
              onRemove={removeFromCart}
            />
          ))
        )}

        <div className="mt-5">
          <h1 className="font-medium text-sm mb-2">Additional Comments</h1>
          <textarea
            className="xl:w-[75%] w-full h-[90px] resize-none outline-none border border-gray-400 rounded-md pt-3 pl-4 text-sm placeholder-gray-600"
            placeholder="Special instruction for seller..."
          />
          <div className="flex items-center gap-1 mt-3">
            <AiFillSafetyCertificate className="text-2xl" />
            <p className="text-gray-600 text-[15px]">Secure shopping guarantee</p>
          </div>
        </div>
      </div>
      <div className="xl:w-[33%] w-full">
        <OrderSummary />
      </div>
    </div>
  );
}