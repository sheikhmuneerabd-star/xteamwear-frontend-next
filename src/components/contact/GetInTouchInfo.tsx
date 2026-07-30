import Link from "next/link";
import { IoLogoWhatsapp, IoMail, IoCubeOutline } from "react-icons/io5";

export default function GetInTouchInfo() {
  const whatsappNumber = "923069110314";

  return (
    <div className="bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Get In Touch!</h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
          Have a question, concern, or special design request? We&apos;re here to help! Reach out directly or drop by our office.
        </p>
      </div>

      {/* Quick Contact Links */}
      <div className="space-y-3 pt-2">
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 text-emerald-700 hover:text-emerald-800 font-semibold text-sm transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
            <IoLogoWhatsapp className="text-lg text-emerald-600" />
          </div>
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href="mailto:support@bespokewear.com"
          className="flex items-center gap-3 text-blue-700 hover:text-blue-800 font-semibold text-sm transition-colors group"
        >
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
            <IoMail className="text-lg text-blue-600" />
          </div>
          <span>Email Us</span>
        </a>
      </div>

      {/* Office Address */}
      <div className="pt-4 border-t border-gray-200 text-xs sm:text-sm text-gray-600 space-y-1">
        <p className="font-semibold text-gray-900">Address:</p>
        <p>685 Market Street</p>
        <p>San Francisco, CA 94105</p>
        <p>United States</p>
      </div>

      {/* Order Tracking Notice */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <div className="flex items-center gap-2 text-gray-900 font-semibold text-xs sm:text-sm">
          <IoCubeOutline className="text-base text-yellow-600" />
          <span>Looking for your order status?</span>
        </div>
        <p className="text-xs text-gray-600">
          You can easily track your shipment anytime by visiting our tracking page:
        </p>
        <Link
          href="/track-order"
          className="inline-block text-xs font-semibold text-blue-600 hover:underline break-all"
        >
          https://xteamwear.com/a/track-order
        </Link>
      </div>
    </div>
  );
}