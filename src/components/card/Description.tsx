"use client";

import { useState } from "react";

export default function Description() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-[100px] md:w-[100%] w-[90%] mx-auto">
      <div className="relative">
        <div className="border-b flex justify-center">
          <h2 className="font-semibold border-b-[3px] w-fit border-black pb-4">Description</h2>
        </div>
        <div
          className={`mt-7 ${
            open ? "max-h-[1000px]" : "max-h-[180px]"
          } transition-all duration-500 ease-in-out overflow-hidden`}
        >
          <h2 className="font-semibold text-[20px]">Feature</h2>
          <div className="ml-5">
            <ul className="list-disc mb-2 mt-2 text-sm text-gray-700">
              <li>CONVEX-FIT fabric</li>
            </ul>
            <ul className="list-disc space-y-3 text-sm text-gray-700 ml-5">
              <li>
                Made from 100% polyester wicking knit with 92% polyester / 8% spandex
                wicking pinhole mesh
              </li>
              <li>High-tech fabrics that are soft, breathable and quick to dry</li>
              <li>Elastic fabrics that help create a perfect fit</li>
            </ul>
            <ul
              className={`list-disc space-y-3 mt-4 text-sm text-gray-700 ${
                open ? "opacity-100" : "opacity-25"
              }`}
            >
              <li>Hot print tag with no friction to the skin</li>
              <li>Colorful and bright design</li>
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-[20px]">Guaranteed Delivery</h2>
            <p className="text-sm text-gray-700">
              2-Day Turnaround Time, Plus Free 3-Day Shipping on Orders Over $199
            </p>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-[20px]">Decoration</h2>
            <p className="text-[13px] cursor-pointer text-gray-700 border-b w-fit border-gray-600">
              Dye Sublimated
            </p>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-[20px]">Minimum Quantity</h2>
            <p className="text-sm text-gray-700">1</p>
            <p className="text-sm text-gray-700">
              Custom Soccer Jersey, Foam Soccer Jersey, Men Soccer Jersey, Soccer Jersey
              blue black orange, soccer jerseys design for team
            </p>
          </div>
        </div>
        <div className="text-center mt-3">
          <button
            type="button"
            className="rounded text-sm md:w-[310px] w-[280px] md:h-[45px] h-[42px] mt-2 bg-yellow-400 text-black font-medium transition-all cursor-pointer duration-200 hover:-translate-y-1"
            onClick={() => setOpen(!open)}
          >
            {open ? "READ LESS" : "READ MORE"}
          </button>
        </div>
      </div>
    </div>
  );
}