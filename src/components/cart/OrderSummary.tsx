"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FaCheckCircle, FaTimes, FaTruck, FaLock, FaShieldAlt, FaWhatsapp } from "react-icons/fa";

export default function OrderSummary() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [shippingOpen, setShippingOpen] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);

  // Dynamic Shipping Settings State
  const [shippingConfig, setShippingConfig] = useState({
    freeShippingThreshold: 150,
    standardShippingFee: 15,
  });

  // Success Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch Site Settings for Shipping Rates
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings?.shippingConfig) {
          setShippingConfig({
            freeShippingThreshold: Number(data.settings.shippingConfig.freeShippingThreshold) || 150,
            standardShippingFee: Number(data.settings.shippingConfig.standardShippingFee) || 15,
          });
        }
      } catch (err) {
        console.error("Failed to load shipping settings:", err);
      }
    }
    fetchSettings();
  }, []);

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

  // Calculation Logic
  const subtotal = cart.reduce((sum, item) => sum + item.newPrice * item.qty, 0);
  const isFreeShipping = subtotal >= shippingConfig.freeShippingThreshold;
  const shippingCost = subtotal > 0 ? (isFreeShipping ? 0 : shippingConfig.standardShippingFee) : 0;
  const grandTotal = subtotal + shippingCost;

  // Free Shipping Progress Calculation
  const amountLeftForFree = Math.max(0, shippingConfig.freeShippingThreshold - subtotal);
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / shippingConfig.freeShippingThreshold) * 100)
  );

  // PayPal Payment Handlers
  const createPayPalOrder = (_data: Record<string, unknown>, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: grandTotal > 0 ? grandTotal.toFixed(2) : "0.01",
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

        // Items Formatting
        const formattedItems = cart.map((item: any) => {
          const selectedVariant =
            item.variants?.find(
              (v: any) => v.color?.toLowerCase() === item.color?.toLowerCase()
            ) || item.variants?.[0];

          const resolvedImg =
            selectedVariant?.images?.[0] ||
            item.image ||
            item.img ||
            item.images?.[0] ||
            item.featuredImage ||
            item.thumbnail ||
            "";

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
            image: resolvedImg,
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
            shippingFee: shippingCost,
            totalAmount: grandTotal,
            notes: "Paid via PayPal Express Checkout",
          }),
        });

        const resData = await res.json();

        if (res.ok) {
          // 📲 WHATSAPP MESSAGE FORMATTING
          const whatsappNumber = "923069110314"; // 👈 Apne Business WhatsApp Number se replace karein (Country code ke sath)
          
          let itemsListText = cart
            .map((item: any, i: number) => `${i + 1}. *${item.name || "Product"}* (x${item.qty}) - $${(item.newPrice * item.qty).toFixed(2)}`)
            .join("%0A");

          const message = `*NEW PAID ORDER RECEIVED (PAYPAL)*%0A%0A` +
            `*Transaction ID:* ${details.id}%0A` +
            `*Customer Name:* ${shippingAddressPayload.fullName}%0A` +
            `*Email:* ${shippingAddressPayload.email}%0A` +
            `*Address:* ${shippingAddressPayload.address}, ${shippingAddressPayload.city}, ${shippingAddressPayload.country}%0A%0A` +
            `*ORDER ITEMS:*%0A${itemsListText}%0A%0A` +
            `*Subtotal:* $${subtotal.toFixed(2)} USD%0A` +
            `*Shipping:* $${shippingCost.toFixed(2)} USD%0A` +
            `*Total Paid:* *$${grandTotal.toFixed(2)} USD*%0A%0A` +
            `_Payment Status: PAID_`;

          const waUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
          setWhatsappUrl(waUrl);

          if (clearCart) clearCart();
          setTransactionId(details.id);
          setIsModalOpen(true);

          // Direct Redirect to WhatsApp (Optional: User popup modal se bhi click kar sakta hai)
          window.open(waUrl, "_blank");
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
      <div ref={containerRef} className="xl:mt-0 mt-6 space-y-5">
        
        {/* 🚚 DYNAMIC FREE SHIPPING PROGRESS BAR */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="flex items-center gap-2 text-gray-800">
              <FaTruck className="text-amber-500 text-base" />
              {isFreeShipping ? (
                <span className="text-emerald-600 font-bold">You've Unlocked Free Shipping! 🎉</span>
              ) : (
                <span>
                  Add <strong className="text-black">${amountLeftForFree.toFixed(2)} USD</strong> for <strong className="text-amber-600">Free Shipping</strong>
                </span>
              )}
            </span>
            <span className="text-xs text-gray-500 font-bold">{progressPercent}%</span>
          </div>

          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? "bg-emerald-500" : "bg-amber-400"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ORDER SUMMARY BOX */}
        <div className="flex xl:flex-col md:flex-row flex-col justify-between">
          <div className="space-y-4 xl:w-full md:w-[48%] w-[98%]">
            <div>
              <h1 className="text-[22px] font-extrabold tracking-wide text-gray-900 border-b-2 border-black pb-1 uppercase">
                ORDER SUMMARY
              </h1>
            </div>

            {/* SUBTOTAL */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-3">
              <p className="text-[16px] text-gray-700">Subtotal</p>
              <p className="font-bold text-[18px] text-gray-900">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </p>
            </div>

            {/* SHIPPING COST LINE */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-3 text-[15px]">
              <p className="text-gray-700 font-medium">Shipping</p>
              {subtotal === 0 ? (
                <span className="text-gray-400 text-xs">Calculated next</span>
              ) : isFreeShipping ? (
                <span className="font-extrabold text-emerald-600 uppercase">FREE</span>
              ) : (
                <span className="font-bold text-gray-900">
                  ${shippingCost.toFixed(2)} USD
                </span>
              )}
            </div>

            {/* SHIPPING ESTIMATE ACCORDION */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer py-1"
                onClick={() => setShippingOpen(!shippingOpen)}
              >
                <p className="text-[15px] font-medium text-gray-800">Get shipping estimate:</p>
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
                <p className="text-[15px] font-medium text-gray-800">Coupon code</p>
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
                  <p className="text-xs text-gray-500 mt-2">
                    Coupon code will be applied on the checkout page
                  </p>
                </div>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-4 pt-2">
              <p className="text-[18px] font-extrabold text-gray-900">Total:</p>
              <p className="text-[20px] font-black text-gray-900">
                ${grandTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
              </p>
            </div>

            {/* TRUST & ESTIMATE INFO */}
            <div className="pt-2 space-y-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 font-medium text-gray-800">
                <FaTruck className="text-amber-500" /> Estimated Delivery: <span className="font-bold">3 - 5 Business Days</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-emerald-700">
                <FaLock /> 256-Bit SSL Encrypted & Secure Checkout
              </div>
            </div>
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
            <div className="w-full my-2 z-0">
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

      {/* 🚀 ORDER SUCCESS CONFIRMATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all p-6 text-center border border-gray-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <FaTimes className="text-lg" />
            </button>

            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="text-green-600 text-4xl" />
            </div>

            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Order Placed Successfully!
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Thank you for your purchase. We have received your order and are processing it.
            </p>

            <div className="mt-4 p-3 z-50 bg-gray-50 border border-gray-200 rounded-lg text-left">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Transaction ID
              </p>
              <p className="text-sm font-mono font-bold text-gray-800 break-all mt-0.5">
                {transactionId}
              </p>
            </div>

            <div className="mt-6 space-y-2">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="text-lg" /> Open WhatsApp Chat
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  router.push("/");
                }}
                className="w-full h-11 bg-black hover:bg-gray-800 text-white font-bold text-sm uppercase tracking-wider rounded-lg transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </PayPalScriptProvider>
  );
}