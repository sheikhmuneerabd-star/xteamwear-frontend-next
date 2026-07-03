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
    <div className="md:flex hidden justify-center gap-2 items-center bg-orange-100 h-[50px]">
      <PiWarningCircle className="text-2xl lg:block hidden" />
      <span className="lg:text-sm text-[13px]">
        Please, hurry! Someone has placed an order on one of the items you have in the cart. We&apos;ll keep it
        for you for <span className="font-medium">{minutes}:{seconds.toString().padStart(2, "0")}</span> minutes.
      </span>
    </div>
  );
}