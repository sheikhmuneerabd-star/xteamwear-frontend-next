"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { RiMessage2Fill, RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { GrFacebookOption } from "react-icons/gr";
import { AiFillTikTok } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi2";
import {
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaApplePay,
} from "react-icons/fa";
import { SiShopify, SiRevolut, SiCashapp, SiZelle, SiMeta } from "react-icons/si";

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
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Track Your Order", href: "/track-order" },
    ],
  },
];

const socialIcons = [
  { Icon: FaYoutube, label: "YouTube", href: "#" },
  { Icon: GrFacebookOption, label: "Facebook", href: "https://www.facebook.com/bespoketeamwear/" },
  { Icon: RiInstagramFill, label: "Instagram", href: "https://www.instagram.com/bespoketeamwear/?hl=en" },
  { Icon: AiFillTikTok, label: "TikTok", href: "#" },
];

const MaestroIcon = () => (
  <svg viewBox="0 0 32 20" className="h-5 w-8" aria-hidden="true">
    <defs>
      <clipPath id="maestro-clip">
        <circle cx="11" cy="10" r="9" />
      </clipPath>
    </defs>
    <circle cx="11" cy="10" r="9" fill="#eb001b" />
    <circle cx="21" cy="10" r="9" fill="#00a2e5" />
    <circle cx="21" cy="10" r="9" fill="#7375cf" clipPath="url(#maestro-clip)" />
  </svg>
);

const ChimeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
    <path
      d="M17 8.5A6 6 0 1 0 17 15.5"
      fill="none"
      stroke="#1ec677"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

const cardPayments = [
  { name: "Visa", icon: <FaCcVisa className="text-[#1a1f71]" /> },
  { name: "Mastercard", icon: <FaCcMastercard className="text-[#eb001b]" /> },
  { name: "American Express", icon: <FaCcAmex className="text-[#006fcf]" /> },
  { name: "Maestro", icon: <MaestroIcon /> },
  { name: "Shopify", icon: <SiShopify className="text-[#95bf47]" /> },
  { name: "PayPal", icon: <FaCcPaypal className="text-[#003087]" /> },
];

const walletPayments = [
  { name: "Cash App", icon: <SiCashapp className="text-[#00d632]" /> },
  { name: "Revolut", icon: <SiRevolut className="text-black" /> },
  { name: "Chime", icon: <ChimeIcon /> },
  { name: "Zelle", icon: <SiZelle className="text-[#6d1ed4]" /> },
  { name: "Apple Pay", icon: <FaApplePay className="text-black" /> },
  { name: "Meta Pay", icon: <SiMeta className="text-[#0866ff]" /> },
];

const PaymentBadge = ({ name, icon }: { name: string; icon: React.ReactNode }) => (
  <div
    title={name}
    aria-label={name}
    className="flex h-8 min-w-[48px] items-center justify-center rounded-sm bg-white px-2 text-2xl shadow-sm transition-transform duration-200 hover:scale-105"
  >
    {icon}
  </div>
);

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
                href="https://wa.me/13475804219"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <RiMessage2Fill className="text-emerald-400 text-lg" />
                <span>WhatsApp Live Chat</span>
              </a>

              <a
                href="mailto:info@bespoketeamwear.com"
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
              <a href="https://wa.me/13475804219" className="flex items-center gap-2 text-sm text-emerald-400">
                <RiMessage2Fill className="text-lg" /> WhatsApp
              </a>
              <a href="mailto:info@bespoketeamwear.com" className="flex items-center gap-2 text-sm text-amber-400">
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
              © {new Date().getFullYear()} <Link href="/">BESPOKE WEAR.</Link> All Rights Reserved.
            </p>
            <p>Designing Unity. Delivering Performance. Trusted by Teams Worldwide.</p>
          </div>

          {/* Payment Gateways */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
              {cardPayments.map((p) => (
                <PaymentBadge key={p.name} {...p} />
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
              {walletPayments.map((p) => (
                <PaymentBadge key={p.name} {...p} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}