"use client";

import { useCart } from "@/context/CartContext";

export default function ProgressBar() {
  const { cart } = useCart();
  const target = 150;

  // Original had cartTotal hardcoded at 8.58 — now derived from actual cart
  const cartTotal = cart.reduce((sum, item) => sum + item.newPrice * item.qty, 0);
  const remaining = Math.max(target - cartTotal, 0).toFixed(2);
  const progress = Math.min((cartTotal / target) * 100, 100);

  return (
    <div className="w-full py-4">
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden relative">
        <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        <div
          className="absolute top-[-10px] text-red-500 transition-all duration-500"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        >
          🚚
        </div>
      </div>
      <p className="lg:text-sm text-[13px] mt-2 text-gray-700">
        Only <span className="font-semibold">${remaining} USD</span> away from Free Shipping
      </p>
    </div>
  );
}