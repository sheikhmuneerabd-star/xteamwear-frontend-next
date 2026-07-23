"use client";

import { useEffect, useState } from "react";
import { PiWarningCircle } from "react-icons/pi";

export default function Timer() {
  const [leftTime, setLeftTime] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(leftTime / 60);
  const seconds = leftTime % 60;

  return (
    <div className="flex items-center justify-center gap-2.5 bg-amber-50 border border-amber-200/80 rounded-lg p-3 text-amber-900 text-xs sm:text-sm">
      <PiWarningCircle className="text-lg text-amber-600 shrink-0" />
      <span>
        Please, hurry! Someone has placed an order on one of the items in your cart. We&apos;ll reserve it for{" "}
        <span className="font-bold text-amber-950">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>{" "}
        minutes.
      </span>
    </div>
  );
}