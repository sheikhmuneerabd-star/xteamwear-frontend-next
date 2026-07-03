"use client";

import { useState } from "react";
import faqData from "@/data/faqData";

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="xl:w-[92%] w-[95%] mx-auto xl:mt-0 mt-16">
      <h1 className="text-[30px] mt-6">FAQ</h1>
      <div className="xl:w-[60%] lg:w-[70%] w-[90%] lg:mt-0 mt-6 mx-auto">
        <h1 className="text-[23px]">Frequently Asked Questions</h1>
        <div className="mt-[50px] space-y-7">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="space-y-3">
                <h3
                  className="hover:text-orange-400 cursor-pointer w-fit font-medium text-[14px]"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {faq.question}
                </h3>
                <p className={`text-gray-800 text-[14px] ${isOpen ? "flex" : "hidden"}`}>{faq.answer}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}