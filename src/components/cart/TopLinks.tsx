import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function TopLinks() {
  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
      <ol className="flex items-center space-x-1.5 text-gray-500">
        <li>
          <Link
            href="/"
            className="hover:text-black transition-colors duration-150 font-medium"
          >
            Home
          </Link>
        </li>
        <li className="flex items-center">
          <MdOutlineKeyboardArrowRight className="text-base text-gray-400 shrink-0" />
          <span className="ml-1 text-gray-900 font-medium">Your Cart</span>
        </li>
      </ol>
    </nav>
  );
}