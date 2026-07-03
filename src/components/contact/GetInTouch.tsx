import { GrContact } from "react-icons/gr";
import { MdEmail } from "react-icons/md";

export default function GetInTouch() {
  return (
    <div className="md:w-[40%] w-full mt-7">
      <div className="space-y-5">
        <h2 className="text-[20px] font-medium">Get In Touch!</h2>
        <p className="text-[13.5px] text-gray-800">
          Have a question, concern, or just something on your mind? We&apos;re here to help — simply fill out the
          form to get in touch with us. You can also stop by for a chat (we&apos;ll have tea and cookies ready)!
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GrContact className="text-[19px]" />
            <p className="text-blue-500 cursor-pointer text-[16px]">Chat on WhatsApp</p>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-[19px]" />
            <p className="text-blue-500 cursor-pointer text-[16px]">Email us</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-[14px] text-gray-800">685 Market Street</p>
          <p className="text-[14px] text-gray-800">San Francisco, CA 94105,</p>
          <p className="text-[14px] text-gray-800">United States</p>
        </div>
        <div className="text-[14px]">
          <div className="w-full bg-gray-200 h-[1px]"></div>
          <p className="font-medium text-gray-800 mt-1">📦 Looking for your order status?</p>
          <p className="text-gray-800">You can easily track your shipment anytime by visiting our tracking page:</p>
          <p className="text-blue-500 underline">https://xteamwear.com/a/track-order</p>
        </div>
      </div>
    </div>
  );
}