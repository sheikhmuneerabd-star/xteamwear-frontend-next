"use client";

import { useCart } from "@/context/CartContext";
import { Truck, CheckCircle2, Sparkles } from "lucide-react";

export default function ProgressBar() {
  const { cart } = useCart();
  const target = 150;

  const cartTotal = cart.reduce((sum, item) => sum + item.newPrice * item.qty, 0);
  const remaining = Math.max(target - cartTotal, 0).toFixed(2);
  const progress = Math.min((cartTotal / target) * 100, 100);

  const isUnlocked = progress >= 100;

  return (
    <div className="w-full bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm space-y-3">
      {/* HEADER WITH TEXT & STATUS */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2">
          {isUnlocked ? (
            <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-1.5 bg-amber-100 text-amber-600 rounded-full">
              <Truck className="w-4 h-4" />
            </div>
          )}
          <span className="text-gray-800">
            {isUnlocked ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                Free Express Shipping Unlocked! <Sparkles className="w-3.5 h-3.5 inline text-amber-500" />
              </span>
            ) : (
              <>
                Add <span className="font-extrabold text-gray-900">${remaining} USD</span> for{" "}
                <span className="font-bold text-amber-600">Free Shipping</span>
              </>
            )}
          </span>
        </div>
        <span className="text-xs font-bold text-gray-500">{progress.toFixed(0)}%</span>
      </div>

      {/* PROGRESS BAR TRACK */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden relative p-0.5 border border-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out relative ${
            isUnlocked
              ? "bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
              : "bg-gradient-to-r from-amber-500 to-yellow-400"
          }`}
          style={{ width: `${progress}%` }}
        >
          {/* Subtle shine effect animation */}
          <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite]" />
        </div>
      </div>
    </div>
  );
}