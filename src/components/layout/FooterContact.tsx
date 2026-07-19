"use client";

import { useEffect, useRef, useState } from "react";
import { RiMessage2Fill, RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";

interface FooterColumn {
  id: number;
  title: string;
  subTitle: string[];
}

const footerAbout: FooterColumn[] = [
  { id: 1, title: "COMPANY INFO", subTitle: ["About Us", "Contact Us", "After-Sales Service"] },
  { id: 2, title: "SERVICE", subTitle: ["Bespoke", "Transfer", "Sublimation", "Sample", "OEM & ODM"] },
  {
    id: 3,
    title: "HELP & SUPPORT",
    subTitle: [
      "Shipping & Delivery",
      "Returns & Exchanges",
      "Privacy Policy",
      "Terms & Conditions",
      "Intellectual Property Rights",
      "Track Your Order",
    ],
  },
];

const socialIcons = [
  { Icon: FaYoutube, label: "YouTube" },
  { Icon: GrFacebookOption, label: "Facebook" },
  { Icon: RiInstagramFill, label: "Instagram" },
  { Icon: AiFillTikTok, label: "TikTok" },
];

function ContactBlock({ widthClass = "w-[80%]" }: { widthClass?: string }) {
  return (
    <div>
      <h2 className="text-[21px] font-bold text-gray-800">Contact</h2>
      <p className="text-[14px]">We&apos;d love to hear from you-please send us your message or ideas.</p>
      <p className="text-[14px] mt-4">Time: 9:00AM-6:00 PM(EST),7 Days a week.</p>
      <p className="text-[14px] mt-2">Our Team will Be In Touch Within 12 Hours.</p>
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-[25px] gap-2">
          <RiMessage2Fill className="text-gray-700" />
          <p className="text-[14px] border-b border-black cursor-pointer">whatsapp</p>
        </div>
        <div className="flex items-center text-[25px] gap-2">
          <MdEmail className="text-gray-700" />
          <p className="text-[14px] border-b border-black cursor-pointer">Email us</p>
        </div>
      </div>
      <div className={`flex justify-between mt-3 text-[25px] ${widthClass}`}>
        {socialIcons.map(({ Icon, label }) => (
          <div
            key={label}
            className="group hover:bg-white hover:shadow-lg shadow-gray-500 transition-all duration-300 flex justify-center items-center cursor-pointer rounded-full w-[57px] h-[57px]"
          >
            <div className="group-hover:bg-gray-300 flex justify-center items-center transition-all duration-300 rounded-full w-[40px] h-[40px]">
              <Icon className="text-gray-700" aria-label={label} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FooterContact() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!aboutContainerRef.current?.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gray-100 footerContact">
      {/* Desktop */}
      <div className="w-[90%] mx-auto hidden md:grid lg:grid-cols-4 md:grid-cols-3">
        {footerAbout.map((col) => (
          <div key={col.id} className="text-center lg:mr-16">
            <h2 className="text-[21px] font-bold text-gray-800">{col.title}</h2>
            <div className="text-[15px] mt-[4px] space-y-2">
              {col.subTitle.map((item) => (
                <p key={item} className="cursor-pointer hover:underline w-fit mx-auto">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
        <div className="md:pl-0 pl-6">
          <ContactBlock widthClass="w-[80%]" />
        </div>
      </div>

      {/* Mobile accordion */}
      <div className="bg-gray-100 mt-20 mb-5 md:hidden block" ref={aboutContainerRef}>
        {footerAbout.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.id}>
              <div
                aria-expanded={isOpen}
                aria-controls={`section-${index}`}
                className="border-b border-black cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex items-center justify-between ml-auto w-[66%] font-medium p-1">
                  <h2 className="text-[20px]">{item.title}</h2>
                  <div className="relative mb-2 mr-4">
                    <div
                      className={`absolute transition-all duration-500 ${
                        isOpen ? "rotate-90" : ""
                      } top-0 left-1 w-[2px] h-[10px] bg-gray-800`}
                    />
                    <div
                      className={`absolute transition-all duration-500 ${
                        isOpen ? "rotate-180" : ""
                      } top-1 w-[10px] h-[2px] bg-gray-800`}
                    />
                  </div>
                </div>
              </div>
              <div
                id={`section-${index}`}
                role="region"
                className={`grid transition-all duration-500 overflow-hidden ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 flex flex-col items-center">
                  {item.subTitle.map((subItem) => (
                    <p key={subItem} className="hover:underline cursor-pointer">
                      {subItem}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="md:pl-0 pl-6 mt-8">
          <ContactBlock widthClass="w-[60%]" />
        </div>
      </div>
    </div>
  );
}