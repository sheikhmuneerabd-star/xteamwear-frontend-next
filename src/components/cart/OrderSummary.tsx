"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function OrderSummary() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [shippingOpen, setShippingOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);

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

  // PayPal Payment Handlers
  const createPayPalOrder = (_data: Record<string, unknown>, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total > 0 ? total.toFixed(2) : "0.01",
          },
        },
      ],
    });
  };

  const onPayPalApprove = async (_data: Record<string, unknown>, actions: any) => {
    if (actions.order) {
      try {
        const details = await actions.order.capture();

        const payer = details.payer || {};
        const shipping = details.purchase_units?.[0]?.shipping?.address || {};

        // Items Formatting - Perfect Image & Logo Extraction Fix
        const formattedItems = cart.map((item: any) => {
          // 1. Selected Color ke mutabiq Variant ki Image Nikaalein
          const selectedVariant = item.variants?.find(
            (v: any) => v.color?.toLowerCase() === item.color?.toLowerCase()
          ) || item.variants?.[0];

          // Primary Image Resolution Logic
          const resolvedImg =
            selectedVariant?.images?.[0] ||
            item.image ||
            item.img ||
            item.images?.[0] ||
            item.featuredImage ||
            item.thumbnail ||
            "";

          // 2. Safe Logo Extraction
          const sizing = item.sizingDetailData || {};
          const logoUrl =
            sizing.sponsorLogo ||
            sizing.logo ||
            sizing.logoUrl ||
            item.sponsorLogo ||
            item.logoUrl ||
            "";

          return {
            productId: item._id || item.id || item.productId,
            name: item.name || item.title || "Custom Product",
            color: item.color || "Standard",
            sku: item.sku || item.productId || item._id || "N/A",
            price: item.newPrice ?? item.price ?? 0,
            qty: item.qty || 1,
            image: resolvedImg, // Ab hamesha sahi Product/Variant Picture jayegi
            sizingDetailData: {
              ...sizing,
              sponsorLogo: logoUrl,
            },
          };
        });

        const shippingAddressPayload = {
          fullName: `${payer.name?.given_name || ""} ${payer.name?.surname || ""}`.trim() || "PayPal Customer",
          email: payer.email_address || "no-email@paypal.com",
          phone: payer.phone?.phone_number?.national_number || "N/A",
          address: shipping.address_line_1 || "PayPal Quick Checkout",
          city: shipping.admin_area_2 || "N/A",
          postalCode: shipping.postal_code || "00000",
          country: shipping.country_code || "US",
        };

        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: formattedItems,
            shippingAddress: shippingAddressPayload,
            paymentMethod: "paypal",
            paymentStatus: "paid",
            paymentId: details.id,
            notes: "Paid via PayPal Express Checkout",
          }),
        });

        const resData = await res.json();

        if (res.ok) {
          if (clearCart) clearCart();
          alert(`Order placed successfully! Transaction ID: ${details.id}`);
          if (resData.order?._id) {
            router.push(`/admin/orders/${resData.order._id}`);
          }
        } else {
          console.error("Order Creation Error Response:", resData);
          alert(`Order Save Error: ${resData.error || "Failed to process order"}`);
        }
      } catch (error) {
        console.error("PayPal Processing Error:", error);
        alert("Something went wrong while completing the payment.");
      }
    }
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
                className={`grid transition-all duration-300 ease-in-out ${
                  shippingOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden space-y-3">
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
                className={`grid transition-all duration-300 ease-in-out ${
                  couponOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
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
            <div className="flex justify-center">
              <Link
                href="/checkout"
                className="rounded text-[14px] w-full h-[48px] bg-amber-400 hover:bg-yellow-400 border-amber-400 border-[1.5px] text-black font-extrabold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>

            {/* PAYPAL SMART BUTTONS */}
            <div className="w-full my-2">
              <PayPalButtons
                style={{ layout: "vertical", color: "gold", shape: "rect", height: 48 }}
                createOrder={createPayPalOrder}
                onApprove={onPayPalApprove}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="rounded text-[14px] cursor-pointer w-full h-[48px] hover:bg-gray-100 border-gray-400 border-[1.5px] text-black font-extrabold uppercase tracking-wider transition-all duration-200"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}