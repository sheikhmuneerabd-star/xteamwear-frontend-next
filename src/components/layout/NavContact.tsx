"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoMail } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

interface CurrencyOption {
  name: string;
  code: string;
}

const countries: CurrencyOption[] = [
  { name: "USD", code: "us" },
  { name: "EUR", code: "eu" },
  { name: "GBP", code: "gb" },
  { name: "CHF", code: "ch" },
  { name: "AUD", code: "au" },
  { name: "CAD", code: "ca" },
];

export default function NavContact() {
  const [countryFlagShow, setCountryFlagShow] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<CurrencyOption>(countries[0]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setCountryFlagShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-slate-100 w-full h-[33px] xl:flex hidden">
      <div className="w-[93%] h-[33px] flex justify-between mx-auto">
        <div className="flex gap-5">
          <div className="flex justify-center items-center gap-1 text-gray-800 cursor-pointer">
            <TfiHeadphoneAlt className="text-[15px]" />
            <span className="text-[13px]">Call: +12025347325</span>
          </div>
          <div className="flex justify-center items-center gap-1 text-gray-800 cursor-pointer">
            <GoMail className="text-[15px]" />
            <span className="text-[13px]">support@xteamwear.com</span>
          </div>
        </div>

        <div className="flex items-center text-[13px] w-fit">
          <span className="font-semibold mr-[130px]">Free Shipping Over $199*</span>
        </div>

        <div className="flex gap-4 items-center text-gray-800 text-[13px] relative" ref={boxRef}>
          <Link href="/faqs" className="cursor-pointer">FAQs</Link>
          <Link href="/contact-us" className="cursor-pointer">Need Help?</Link>
          <div
            className="flex items-center gap-[3px] cursor-pointer"
            onClick={() => setCountryFlagShow(!countryFlagShow)}
          >
            <span className="text-black">{selectedCountry.name}</span>
            <IoIosArrowDown className="text-gray-600" />
          </div>
          <div
            id="countryBox"
            className="bg-white z-50 w-[98px] py-3 flex flex-col gap-[12px] justify-center items-center rounded-md absolute top-9 right-3 shadowNavCon transition-all duration-300"
            style={{
              opacity: countryFlagShow ? 1 : 0,
              transform: countryFlagShow ? "translateY(0)" : "translateY(-10px)",
              pointerEvents: countryFlagShow ? "auto" : "none",
            }}
          >
            {countries.map((item) => (
              <div
                key={item.code}
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => {
                  setSelectedCountry(item);
                  setCountryFlagShow(false);
                }}
              >
                <Image
                  src={`https://flagcdn.com/w40/${item.code}.png`}
                  width={24}
                  height={24}
                  unoptimized
                  alt={item.name}
                  className="w-6 h-6 rounded-full"
                />
                <span
                  className={`font-medium group-hover:border-black ${
                    selectedCountry.name === item.name ? "border-black" : "border-white"
                  } border-b-[1.5px]`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}