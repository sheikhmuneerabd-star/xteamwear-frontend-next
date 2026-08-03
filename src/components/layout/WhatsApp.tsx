import Image from "next/image";
import Link from "next/link"; // Next.js Link import karein
import whatsapp from "@/assets/whatsapp/WhatsApp.svg";

export default function WhatsApp() {
  const phoneNumber = "(347) 580-4219"; // Apna number daalein
  const message = encodeURIComponent("Hi! I have a question regarding bespoke sportswear.");

  return (
    <div className="relative z-50">
      <Link
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 hover:scale-125 cursor-pointer transition-all duration-500 w-[65px] h-[65px] block"
        aria-label="Chat on WhatsApp"
      >
        <Image
          className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(37,211,102,0.9)]"
          src={whatsapp}
          alt="Whatsapp"
        />
      </Link>
    </div>
  );
}