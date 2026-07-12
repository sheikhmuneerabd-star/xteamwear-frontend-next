"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

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
      <div className="text-center py-20 px-5">
        <p className="text-xl font-medium">Your cart is empty</p>
        <p className="text-gray-500 mt-2">Add some products before checking out.</p>
        <Link href="/" className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-500 px-6 py-2.5 rounded-md font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex xl:flex-row flex-col min-h-screen">
      {/* Mobile order summary toggle (collapsed by default) */}
      <div className="xl:hidden border-b border-gray-200 bg-gray-50">
        <button
          type="button"
          onClick={() => setSummaryOpen(!summaryOpen)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            {summaryOpen ? "Hide" : "Show"} order summary
            {summaryOpen ? <IoChevronUp /> : <IoChevronDown />}
          </span>
          <span className="font-semibold">Rs.{subtotal.toLocaleString("en-PK")}</span>
        </button>

        {summaryOpen && (
          <div className="px-5 pb-5 space-y-4">
            {cart.map((item) => {
              const variant = item.variants.find((v) => v.color === item.color);
              return (
                <div key={`${item.id}-${item.color}`} className="flex gap-3 items-center">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden border border-gray-300 shrink-0">
                    {variant?.images[0] && (
                      <Image src={variant.images[0]} alt={item.name} fill sizes="56px" className="object-cover" />
                    )}
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.color}</p>
                  </div>
                  <p className="text-sm font-medium shrink-0">
                    Rs.{(item.newPrice * item.qty).toLocaleString("en-PK")}
                  </p>
                </div>
              );
            })}
            <div className="pt-3 border-t border-gray-300 flex justify-between text-sm">
              <p className="text-gray-600">Subtotal · {totalQty} item{totalQty > 1 ? "s" : ""}</p>
              <p className="font-medium">Rs.{subtotal.toLocaleString("en-PK")}</p>
            </div>
          </div>
        )}
      </div>

      {/* LEFT — FORM */}
      <div className="xl:w-1/2 w-full px-5 sm:px-10 xl:px-16 py-8 xl:py-10">
        <div className="max-w-xl xl:ml-auto w-full">
          <Link href="/" className="text-xl font-bold mb-8 inline-block">
            XTEAMWEAR
          </Link>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-2 gap-2 flex-wrap">
                <h2 className="text-lg font-semibold">Contact</h2>
                <span className="text-xs sm:text-sm text-gray-500 truncate">
                  {session?.user ? session.user.email : "Checking out as guest"}
                </span>
              </div>
              <input
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Delivery</h2>
              <div className="space-y-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                  type="text"
                  placeholder="Country/Region"
                  value={form.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  required
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  required
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                  type="text"
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                  type="text"
                  placeholder="Apartment, suite, etc. (optional)"
                  value={form.apartment}
                  onChange={(e) => handleChange("apartment", e.target.value)}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    required
                  />
                  <input
                    className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                    type="text"
                    placeholder="Postal Code"
                    value={form.postalCode}
                    onChange={(e) => handleChange("postalCode", e.target.value)}
                    required
                  />
                </div>
                <input
                  className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm"
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Order Notes (optional)</h2>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-black text-sm h-[70px] resize-none"
                placeholder="Special instructions for your order..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Payment</h2>
              <p className="text-sm text-gray-500 mb-3">All transactions are secure and encrypted.</p>
              <div className="border border-gray-300 rounded-md p-4 bg-gray-50 text-sm text-gray-600">
                Cash on Delivery — you&apos;ll pay when your order arrives.
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-3">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[52px] bg-yellow-400 hover:bg-yellow-500 rounded-md font-semibold text-[15px] transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Complete Order"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT — ORDER SUMMARY (desktop only) */}
      <div className="xl:w-1/2 w-full bg-gray-50 xl:px-16 px-5 py-10 border-l border-gray-200 hidden xl:block">
        <div className="max-w-md">
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
            {cart.map((item) => {
              const variant = item.variants.find((v) => v.color === item.color);
              return (
                <div key={`${item.id}-${item.color}`} className="flex gap-4 items-center">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-300 shrink-0">
                    {variant?.images[0] && (
                      <Image src={variant.images[0]} alt={item.name} fill sizes="64px" className="object-cover" />
                    )}
                    <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.color}</p>
                  </div>
                  <p className="text-sm font-medium shrink-0">
                    Rs.{(item.newPrice * item.qty).toLocaleString("en-PK")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 mt-6">
            <input
              type="text"
              placeholder="Discount code or gift card"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-black bg-white"
            />
            <button type="button" className="bg-gray-200 text-gray-600 px-5 rounded-md text-sm font-medium">
              Apply
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-300 space-y-2 text-sm">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal · {totalQty} item{totalQty > 1 ? "s" : ""}</p>
              <p className="font-medium">Rs.{subtotal.toLocaleString("en-PK")}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Shipping</p>
              <p className="text-gray-500">Calculated at next step</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
            <p className="font-semibold text-lg">Total</p>
            <p className="font-semibold text-lg">
              <span className="text-xs text-gray-500 font-normal mr-1">PKR</span>
              Rs.{subtotal.toLocaleString("en-PK")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}