"use client";

import { useCart } from "@/context/CartContext";

export default function ProgressBar() {
  const { cart } = useCart();
  const target = 150;

  const cartTotal = cart.reduce((sum, item) => sum + item.newPrice * item.qty, 0);
  const remaining = Math.max(target - cartTotal, 0).toFixed(2);
  const progress = Math.min((cartTotal / target) * 100, 100);

  return (
    <div className="w-full bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
      <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden relative">
        <div
          className="bg-red-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
        {progress >= 100 ? (
          <span className="text-emerald-600 font-semibold">
            🎉 Congratulations! You unlocked Free Shipping.
          </span>
        ) : (
          <>
            Only <span className="font-bold text-gray-900">${remaining} USD</span> away from Free Shipping
          </>
        )}
      </p>
    </div>
  );
}