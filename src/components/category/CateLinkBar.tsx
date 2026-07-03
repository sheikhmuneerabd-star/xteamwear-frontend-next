import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function CateLinkBar({ cateName }: { cateName: string }) {
  return (
    <div className="w-[92%] mx-auto">
      <div className="xl:pt-5 lg:py-3 md:py-2 py-3">
        <div className="flex gap-1 items-center">
          <div className="flex gap-1 items-center">
            <Link href="/" className="text-gray-400 md:text-[14px] text-[10.8px] hover:text-black cursor-pointer transition-all duration-200">
              Home
            </Link>
            <MdOutlineKeyboardArrowRight className="text-gray-400 text-[15px] md:mt-1 mt-[1.5px]" />
          </div>
          <div className="flex gap-1 items-center">
            <h1 className="text-gray-400 md:text-[14px] text-[10.8px] hover:text-black cursor-pointer transition-all duration-200">
              {cateName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}