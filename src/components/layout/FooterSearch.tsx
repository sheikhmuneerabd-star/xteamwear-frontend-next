"use client";

import { useState } from "react";

export default function FooterSearch() {
  const [focus, setFocus] = useState(false);

  return (
    <div className="mt-9 flex items-center bg-gray-100 h-[50vh]">
      <div className="md:w-[50%] w-[85%] mx-auto space-y-2">
        <h2 className="md:text-[24px] text-[18px] font-medium">SIGN UP FOR OUR NEWSLETTER</h2>
        <p className="text-sm rec">Receive our latest updates about our products & promotions.</p>
        <div className="flex gap-2 searchBox md:flex-row flex-col">
          <div className="relative h-[40px]">
            <label
              className={`absolute top-[7px] left-3 transition-all duration-300 ${
                focus ? "-translate-x-1 opacity-0" : "translate-x-0 opacity-100"
              }`}
            >
              enter your email address
            </label>
            <input
              className="xl:w-[470px] lg:w-[370px] md:w-[260px] bg-white w-full h-full border border-gray-300 rounded-xl outline-none pl-3 text-[15px] placeholder-gray-600"
              type="email"
              onFocus={() => setFocus(true)}
              onBlur={(e) => !e.target.value && setFocus(false)}
            />
          </div>
          <button
            type="button"
            className="bg-white rounded-xl cursor-pointer border hover:-translate-y-2 transition-all duration-300 border-yellow-400 md:w-[155px] w-full h-[40px] text-[15px] hover:bg-yellow-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}