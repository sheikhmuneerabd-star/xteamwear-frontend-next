import { LiaCcVisa } from "react-icons/lia";
import { FaCcPaypal, FaCcMastercard } from "react-icons/fa";
import { FaCcAmazonPay } from "react-icons/fa6";

export default function CopyRightFooter() {
  return (
    <div className="flex xl:flex-row flex-col justify-between items-center px-6 py-3">
      <div className="md:text-[14px] text-[12.5px] xl:text-start text-center">
        <p>© 2026 XTeamwear All Rights Reserved.</p>
        <p>Designing Unity. Delivering Performance. Trusted by Thousands of Teams Worldwide.</p>
        <div className="flex gap-2 xl:justify-start justify-center">
          <p className="cursor-pointer hover:underline">About Us |</p>
          <p className="cursor-pointer hover:underline">Contact |</p>
          <p className="cursor-pointer hover:underline">Privacy |</p>
          <p className="cursor-pointer hover:underline">Returns</p>
        </div>
      </div>
      <div className="flex justify-between text-[42px] xl:w-[20%] lg:w-[23%] md:w-[29%] w-[60%] xl:mt-0 mt-3">
        <LiaCcVisa className="text-blue-500" />
        <FaCcPaypal className="text-cyan-500" />
        <FaCcMastercard className="text-orange-500" />
        <FaCcAmazonPay className="text-yellow-500" />
      </div>
    </div>
  );
}