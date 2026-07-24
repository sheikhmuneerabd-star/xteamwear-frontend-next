"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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

  // PayPal Payment Handler Functions
  const createPayPalOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
          },
        },
      ],
    });
  };

  const onPayPalApprove = async (data: any, actions: any) => {
    const details = await actions.order.capture();
    alert(`Transaction completed by ${details.payer.name.given_name}!`);
    // Payment success ke baad user ko order confirmation page par bhej sakte hain
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
        currency: "USD",
      }}
    >
      <div ref={containerRef} className="xl:mt-0 mt-10">
        <div className="flex xl:flex-col md:flex-row flex-col justify-between">
          <div className="space-y-4 xl:w-full md:w-[48%] w-[98%]">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-wide text-gray-900 border-b-2 border-black pb-1 uppercase">
                ORDER SUMMARY
              </h1>
            </div>

            <div className="flex justify-between items-center border-b border-gray-300 pb-3">
              <p className="text-[16px] text-gray-700">Subtotal</p>
              <p className="font-bold text-[18px] text-gray-900">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </p>
            </div>

            {/* SHIPPING ESTIMATE */}
            <div>
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer py-1"
                  onClick={() => setShippingOpen(!shippingOpen)}
                >
                  <p className="text-[16px] font-medium text-gray-800">Get shipping estimate:</p>
                  <div className="relative mb-2 w-3 h-3 flex items-center justify-center">
                    <div
                      className={`absolute transition-all duration-500 ${
                        shippingOpen ? "rotate-90 opacity-0" : ""
                      } w-[2px] h-[12px] bg-gray-800`}
                    />
                    <div
                      className={`absolute transition-all duration-500 ${
                        shippingOpen ? "rotate-180" : ""
                      } w-[12px] h-[2px] bg-gray-800`}
                    />
                  </div>
                </div>
                <div
                  style={{ height: shippingOpen ? shippingRef.current?.scrollHeight + "px" : "0px" }}
                  ref={shippingRef}
                  className="space-y-3 overflow-hidden transition-all duration-500 ease-in-out"
                >
                  <select className="w-full text-[15px] p-3 border-[1.5px] border-gray-300 outline-none hover:border-gray-400 transition-all duration-200 rounded-md bg-white mt-2">
                    <option value="United States">United States</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Afghanistan">Afghanistan</option>
                  </select>
                  <input
                    className="border-[1.3px] rounded-md w-full text-[15px] p-3 border-gray-400 outline-none placeholder-gray-500"
                    type="text"
                    placeholder="Postal code"
                  />
                  <div className="flex justify-center border-b border-gray-300 pb-5">
                    <button
                      type="button"
                      className="rounded text-[14px] w-full h-[45px] bg-amber-400 hover:bg-yellow-400 border-amber-400 border-[1.5px] text-black font-extrabold tracking-wider transition-all duration-200 hover:-translate-y-0.5 uppercase"
                    >
                      CALCULATE SHIPPING
                    </button>
                  </div>
                </div>
              </div>

              {/* COUPON CODE */}
              <div className="mt-3 border-b border-gray-300 pb-4">
                <div
                  className="flex justify-between items-center cursor-pointer py-1"
                  onClick={() => setCouponOpen(!couponOpen)}
                >
                  <p className="text-[16px] font-medium text-gray-800">Coupon code</p>
                  <div className="relative mb-2 w-3 h-3 flex items-center justify-center">
                    <div
                      className={`absolute transition-all duration-500 ${
                        couponOpen ? "rotate-90 opacity-0" : ""
                      } w-[2px] h-[12px] bg-gray-800`}
                    />
                    <div
                      className={`absolute transition-all duration-500 ${
                        couponOpen ? "rotate-180" : ""
                      } w-[12px] h-[2px] bg-gray-800`}
                    />
                  </div>
                </div>
                <div
                  style={{ height: couponOpen ? couponRef.current?.scrollHeight + "px" : "0px" }}
                  ref={couponRef}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                >
                  <input
                    className="border-[1.3px] rounded-md w-full text-[15px] p-3 border-gray-400 outline-none placeholder-gray-500 mt-2"
                    type="text"
                    placeholder="Enter coupon code"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Coupon code will be applied on the checkout page
                  </p>
                </div>
              </div>
            </div>

            {/* TOTAL & TAX TEXT */}
            <div className="md:flex justify-between items-center border-b border-gray-300 pb-4 hidden pt-2">
              <p className="text-[18px] font-extrabold text-gray-900">Total:</p>
              <p className="text-[20px] font-black text-gray-900">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </p>
            </div>
            <p className="text-[14px] text-gray-500 font-normal">
              Tax included and shipping calculated at checkout
            </p>
          </div>

          {/* BUTTON ACTIONS */}
          <div className="space-y-3 mt-5 xl:w-full md:w-[48%] w-full">
            <div className="md:flex justify-center hidden">
              <Link
                href="/checkout"
                className="rounded text-[14px] w-full h-[48px] bg-amber-400 hover:bg-yellow-400 border-amber-400 border-[1.5px] text-black font-extrabold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>

            {/* LIVE PAYPAL SMART BUTTON (Desktop) */}
            <div className="hidden md:block w-full">
              {total > 0 && (
                <PayPalButtons
                  style={{ layout: "vertical", color: "gold", shape: "rect", height: 48 }}
                  createOrder={createPayPalOrder}
                  onApprove={onPayPalApprove}
                />
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                className="rounded text-[14px] cursor-pointer w-full h-[48px] hover:bg-gray-100 border-gray-400 border-[1.5px] text-black font-extrabold uppercase tracking-wider transition-all duration-200"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>

          {/* MOBILE STICKY BOTTOM BAR */}
          <div className="relative z-50 md:hidden block">
            <div className="fixed left-0 bottom-0 w-full bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] p-4 border-t border-gray-200 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-bold">TOTAL:</p>
                <p className="font-extrabold text-[18px]">
                  ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/checkout"
                  className="rounded text-xs w-full h-[44px] bg-amber-400 text-black font-bold flex items-center justify-center uppercase"
                >
                  PROCEED TO CHECKOUT
                </Link>
                {/* Mobile PayPal Button */}
                <div className="w-full min-h-[44px]">
                  {total > 0 && (
                    <PayPalButtons
                      style={{ layout: "horizontal", color: "gold", shape: "rect", tagline: false, height: 44 }}
                      createOrder={createPayPalOrder}
                      onApprove={onPayPalApprove}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PayPalScriptProvider>
  );
}