"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  RiMessage2Fill, 
  RiInstagramFill 
} from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillTikTok } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { LiaCcVisa } from "react-icons/lia";
import { FaCcPaypal, FaCcMastercard } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa6";
import { HiChevronDown } from "react-icons/hi2";

interface FooterColumn {
  id: number;
  title: string;
  links: { label: string; href: string }[];
}

const footerNavigation: FooterColumn[] = [
  {
    id: 1,
    title: "COMPANY INFO",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "After-Sales Service", href: "/service" },
      { label: "Reviews & Feedback", href: "/reviews" },
    ],
  },
  {
    id: 2,
    title: "SERVICES",
    links: [
      { label: "Tailored Bespoke", href: "/bespoke" },
      { label: "Heat Transfer", href: "/transfer" },
      { label: "Dye Sublimation", href: "/sublimation" },
      { label: "Sample Kit Order", href: "/sample" },
      { label: "OEM & ODM Production", href: "/oem" },
    ],
  },
  {
    id: 3,
    title: "HELP & SUPPORT",
    links: [
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Track Your Order", href: "/track-order" },
    ],
  },
];

const socialIcons = [
  { Icon: FaYoutube, label: "YouTube", href: "#" },
  { Icon: GrFacebookOption, label: "Facebook", href: "#" },
  { Icon: RiInstagramFill, label: "Instagram", href: "#" },
  { Icon: AiFillTikTok, label: "TikTok", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!accordionRef.current?.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert("Thank you for subscribing to Bespoke Wear!");
    setEmail("");
  };

  return (
    <footer className="bg-[#0B1426] text-slate-300 font-sans border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        
        {/* ================= 1. NEWSLETTER SECTION ================= */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Stay Connected
            </span>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-white mt-3 tracking-tight">
              SIGN UP FOR OUR NEWSLETTER
            </h3>
            <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">
              Receive exclusive team apparel discounts, new drops, and custom design updates straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full sm:w-[320px] lg:w-[360px] px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-amber-500/10 shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* ================= 2. MAIN FOOTER CONTENT ================= */}
        
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {footerNavigation.map((col) => (
            <div key={col.id} className="space-y-4">
              <h4 className="text-sm font-bold tracking-wider text-white uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-amber-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase">
              GET IN TOUCH
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions or custom team requests? Our team is available 7 days a week.
            </p>
            
            <div className="space-y-2 pt-1 text-sm">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <RiMessage2Fill className="text-emerald-400 text-lg" />
                <span>WhatsApp Live Chat</span>
              </a>

              <a
                href="mailto:support@bespokewear.com"
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <MdEmail className="text-amber-400 text-lg" />
                <span>Email Our Specialists</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700/80 hover:border-amber-500 hover:bg-amber-500 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Accordion Layout */}
        <div ref={accordionRef} className="block md:hidden space-y-4 pb-10 border-b border-slate-800">
          {footerNavigation.map((col, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={col.id} className="border-b border-slate-800/80 pb-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-2 text-left font-bold text-white text-base"
                >
                  <span>{col.title}</span>
                  <HiChevronDown
                    className={`text-lg text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-2 pb-1 space-y-2 pl-1">
                    {col.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block text-sm text-slate-400 hover:text-amber-400 py-1"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Mobile Contact Block */}
          <div className="pt-6 space-y-3">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase">
              GET IN TOUCH
            </h4>
            <p className="text-xs text-slate-400">
              Hours: 9:00 AM - 6:00 PM (EST), 7 Days a week.
            </p>
            <div className="flex gap-4 pt-1">
              <a href="https://wa.me/1234567890" className="flex items-center gap-2 text-sm text-emerald-400">
                <RiMessage2Fill className="text-lg" /> WhatsApp
              </a>
              <a href="mailto:support@bespokewear.com" className="flex items-center gap-2 text-sm text-amber-400">
                <MdEmail className="text-lg" /> Email
              </a>
            </div>

            <div className="pt-3 flex items-center gap-3">
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center"
                >
                  <Icon className="text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ================= 3. COPYRIGHT & PAYMENT METHODS ================= */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="text-center md:text-left space-y-1">
            <p className="text-slate-300 font-medium">
              © {new Date().getFullYear()} BESPOKE WEAR. All Rights Reserved.
            </p>
            <p>Designing Unity. Delivering Performance. Trusted by Teams Worldwide.</p>
          </div>

          {/* Payment Gateways */}
          <div className="flex items-center gap-4 text-3xl opacity-90">
            <LiaCcVisa className="text-blue-400 hover:opacity-100" />
            <FaCcPaypal className="text-cyan-400 hover:opacity-100" />
            <FaCcMastercard className="text-orange-400 hover:opacity-100" />
            <FaCcAmazonPay className="text-amber-400 hover:opacity-100" />
          </div>
        </div>

      </div>
    </footer>
  );
}