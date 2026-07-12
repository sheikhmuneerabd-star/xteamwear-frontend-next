"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function OrderSummary() {
  const { cart } = useCart();
  const [shippingOpen, setShippingOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);

  const shippingRef = useRef<HTMLDivElement>(null);
  const couponRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShippingOpen(false);
        setCouponOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.newPrice * item.qty, 0);

  return (
    <div ref={containerRef} className="xl:mt-0 mt-10">
      <div className="flex xl:flex-col md:flex-row flex-col justify-between">
        <div className="space-y-4 xl:w-full md:w-[48%] w-[98%]">
          <div>
            <h1 className="text-[21px] border-b-2 border-black pb-1">ORDER SUMMARY</h1>
          </div>
          <div className="flex justify-between border-b border-gray-400 pb-3">
            <p className="text-[14px]">Subtotal</p>
            <p className="font-semibold">Rs.{total.toLocaleString("en-PK")} PKR</p>
          </div>

          <div>
            <div>
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShippingOpen(!shippingOpen)}
              >
                <p className="text-[14px]">Get shipping estimate:</p>
                <div className="relative mb-2">
                  <div className={`absolute transition-all duration-500 ${shippingOpen ? "rotate-90" : ""} top-0 left-1 w-[2px] h-[10px] bg-gray-800`} />
                  <div className={`absolute transition-all duration-500 ${shippingOpen ? "rotate-180" : ""} top-1 w-[10px] h-[2px] bg-gray-800`} />
                </div>
              </div>
              <div
                style={{ height: shippingOpen ? shippingRef.current?.scrollHeight + "px" : "0px" }}
                ref={shippingRef}
                className="space-y-3 mt-2 overflow-hidden transition-all duration-500"
              >
                <select className="w-full text-[14px] p-3 border-[1.5px] border-gray-300 outline-none hover:border-gray-400 transition-all duration-200 rounded-md">
                  <option value="United States">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="France">France</option>
                  <option value="Afghanistan">Afghanistan</option>
                </select>
                <input
                  className="border-[1.3px] rounded-md w-[45%] text-[14px] p-3 border-gray-400 pl-3 outline-none placeholder-gray-600"
                  type="text"
                  placeholder="Postal code"
                />
                <div className="flex justify-center border-b border-gray-400 pb-6">
                  <button
                    type="button"
                    className="rounded text-sm w-full md:h-[45px] h-[42px] hover:bg-yellow-400 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200 hover:-translate-y-1"
                  >
                    CALCULATE SHIPPING
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 border-b border-gray-400 pb-5">
              <div className="flex justify-between items-center cursor-pointer" onClick={() => setCouponOpen(!couponOpen)}>
                <p>Coupon code</p>
                <div className="relative mb-2">
                  <div className={`absolute transition-all duration-500 ${couponOpen ? "rotate-90" : ""} top-0 left-1 w-[2px] h-[10px] bg-gray-800`} />
                  <div className={`absolute transition-all duration-500 ${couponOpen ? "rotate-180" : ""} top-1 w-[10px] h-[2px] bg-gray-800`} />
                </div>
              </div>
              <div
                style={{ height: couponOpen ? couponRef.current?.scrollHeight + "px" : "0px" }}
                ref={couponRef}
                className="mt-3 overflow-hidden transition-all duration-500"
              >
                <input
                  className="border-[1.3px] rounded-md w-full text-[14px] p-3 border-gray-400 pl-3 outline-none placeholder-gray-600"
                  type="text"
                  placeholder="Enter coupon code"
                />
                <p className="text-sm text-gray-600 mt-2">Coupon code will be applied on the checkout page</p>
              </div>
            </div>
          </div>

          <div className="md:flex justify-between border-b border-gray-400 pb-5 hidden">
            <p className="text-sm font-medium">TOTAL:</p>
            <p className="font-semibold">Rs.{total.toLocaleString("en-PK")} PKR</p>
          </div>
          <p className="text-[14px] text-gray-500">Tax included and shipping calculated at checkout</p>
        </div>

        <div className="space-y-4 mt-4 xl:w-full md:w-[48%] w-full">
          <div className="md:flex justify-center hidden">
            <Link
              href="/checkout"
              className="rounded text-sm w-full md:h-[45px] h-[42px] hover:bg-yellow-400 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200 hover:-translate-y-1 flex items-center justify-center"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
          <div className="md:flex justify-center hidden">
            <button
              type="button"
              className="rounded text-sm w-full cursor-pointer md:h-[45px] h-[42px] bg-yellow-400 hover:bg-yellow-500 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200"
            >
              <span className="text-blue-600 text-[20px]">Pay</span>
              <span className="text-blue-400 text-[20px]">Pal</span>
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="rounded text-sm cursor-pointer w-full md:h-[45px] h-[42px] hover:bg-yellow-400 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200 hover:-translate-y-1"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>

        <div className="relative z-50 md:hidden block">
          <div className="fixed left-0 bottom-0 w-full h-[160px] bg-white shadow-md shadow-gray-600">
            <div className="flex justify-between p-3">
              <p className="text-sm font-medium">TOTAL:</p>
              <p className="font-semibold">Rs.{total.toLocaleString("en-PK")} PKR</p>
            </div>
            <div className="md:flex justify-center px-3 py-1">
              <Link
                href="/checkout"
                className="rounded text-sm w-full md:h-[45px] h-[42px] hover:bg-yellow-400 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200 hover:-translate-y-1 flex items-center justify-center"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
            <div className="md:flex justify-center px-3 py-1">
              <button
                type="button"
                className="rounded text-sm w-full cursor-pointer md:h-[45px] h-[42px] bg-yellow-400 hover:bg-yellow-500 border-yellow-400 border-[1.5px] text-black font-medium transition-all duration-200"
              >
                <span className="text-blue-600 text-[20px]">Pay</span>
                <span className="text-blue-400 text-[20px]">Pal</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}