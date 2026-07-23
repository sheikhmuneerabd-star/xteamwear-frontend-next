"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { IoChevronDown, IoChevronUp, IoBagHandleOutline, IoLockClosed } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";

interface ShippingForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
}

const emptyForm: ShippingForm = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  apartment: "",
  city: "",
  postalCode: "",
  country: "Pakistan",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();

  const [form, setForm] = useState<ShippingForm>({
    ...emptyForm,
    email: session?.user?.email || "",
    fullName: session?.user?.name || "",
  });
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.newPrice * item.qty, 0);
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleChange = (field: keyof ShippingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);

    const items = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      color: item.color,
      sku: item.variants.find((v) => v.color === item.color)?.sku || "",
      price: item.newPrice,
      qty: item.qty,
      image: item.variants.find((v) => v.color === item.color)?.images[0] || "",
      sizingDetailData: item.sizingDetailData,
    }));

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress: {
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            address: `${form.address}${form.apartment ? ", " + form.apartment : ""}`,
            city: form.city,
            postalCode: form.postalCode,
            country: form.country,
          },
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to place order");
        setLoading(false);
        return;
      }

      clearCart();
      router.push(`/order-confirmation/${data.order._id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          <IoBagHandleOutline className="text-5xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            Add items to your cart to proceed with checkout.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex xl:flex-row flex-col min-h-screen bg-white">
      {/* Mobile order summary toggle */}
      <div className="xl:hidden border-b border-gray-200 bg-gray-50/80 sticky top-0 z-30 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setSummaryOpen(!summaryOpen)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-700"
        >
          <span className="flex items-center gap-2">
            <IoBagHandleOutline className="text-lg" />
            <span>{summaryOpen ? "Hide" : "Show"} order summary</span>
            {summaryOpen ? <IoChevronUp /> : <IoChevronDown />}
          </span>
          <span className="font-bold text-gray-900">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
          </span>
        </button>

        {summaryOpen && (
          <div className="px-5 pb-5 space-y-4 border-t border-gray-200/60 pt-4 bg-gray-50">
            {cart.map((item) => {
              const variant = item.variants.find((v) => v.color === item.color);
              return (
                <div key={`${item.id}-${item.color}`} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 bg-white shrink-0">
                    {variant?.images[0] && (
                      <Image
                        src={variant.images[0]}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute -top-1.5 -right-1.5 bg-gray-800 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-gray-500">{item.color}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-900 shrink-0">
                    ${(item.newPrice * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                  </p>
                </div>
              );
            })}
            <div className="pt-3 border-t border-gray-200 flex justify-between text-xs font-semibold text-gray-700">
              <span>Subtotal ({totalQty} items)</span>
              <span>${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD</span>
            </div>
          </div>
        )}
      </div>

      {/* LEFT COLUMN — FORM */}
      <div className="xl:w-1/2 w-full px-5 sm:px-10 xl:px-16 py-8 xl:py-12">
        <div className="max-w-xl xl:ml-auto w-full space-y-8">
          <Link href="/" className="text-2xl font-black tracking-tight text-gray-900 inline-block">
            XTEAMWEAR
          </Link>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-base font-bold text-gray-900">Contact Information</h2>
                <span className="text-xs text-gray-500 truncate max-w-[200px]">
                  {session?.user ? session.user.email : "Guest Checkout"}
                </span>
              </div>
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                type="email"
                placeholder="Email address for order updates"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            {/* Delivery */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-gray-900">Shipping Address</h2>
              
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                type="text"
                placeholder="Country/Region"
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
                required
              />
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                type="text"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                required
              />
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                type="text"
                placeholder="Street Address"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                required
              />
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                type="text"
                placeholder="Apartment, suite, unit (optional)"
                value={form.apartment}
                onChange={(e) => handleChange("apartment", e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
                <input
                  className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                  type="text"
                  placeholder="Postal Code"
                  value={form.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  required
                />
              </div>
              <input
                className="w-full h-11 border border-gray-300 rounded-lg px-3.5 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
                type="tel"
                placeholder="Phone number for delivery updates"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>

            {/* Notes */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-2">Order Notes (Optional)</h2>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black transition h-20 resize-none"
                placeholder="Special instructions or customization details..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-base font-bold text-gray-900 mb-1">Payment Method</h2>
              <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                <IoLockClosed className="text-green-600" />
                All transactions are encrypted and secure.
              </p>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 flex items-center gap-3">
                <input type="radio" checked readOnly className="accent-black" />
                <span className="text-sm font-semibold text-gray-800">
                  Cash on Delivery (COD)
                </span>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-13 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <ImSpinner2 className="animate-spin text-lg" />
                  <span>Processing Order...</span>
                </>
              ) : (
                "Complete Order"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT COLUMN — ORDER SUMMARY (Desktop) */}
      <div className="xl:w-1/2 w-full bg-gray-50/80 xl:px-16 px-6 py-12 border-l border-gray-200 hidden xl:block">
        <div className="max-w-md sticky top-12">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {cart.map((item) => {
              const variant = item.variants.find((v) => v.color === item.color);
              return (
                <div key={`${item.id}-${item.color}`} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-white shrink-0 shadow-sm">
                    {variant?.images[0] && (
                      <Image
                        src={variant.images[0]}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                    <span className="absolute -top-1.5 -right-1.5 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.color}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    ${(item.newPrice * item.qty).toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-6 pt-6 border-t border-gray-200">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="flex-1 border border-gray-300 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-black bg-white"
            />
            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 rounded-lg text-xs font-semibold transition"
            >
              Apply
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 space-y-2.5 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal · {totalQty} item{totalQty > 1 ? "s" : ""}</span>
              <span className="font-semibold text-gray-900">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-xs text-gray-500 font-medium">Free / Calculated at next step</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
            <span className="font-bold text-lg text-gray-900">Total</span>
            <div className="text-right">
              <span className="text-xs font-medium text-gray-500 mr-1.5">USD</span>
              <span className="font-black text-xl text-gray-900">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}