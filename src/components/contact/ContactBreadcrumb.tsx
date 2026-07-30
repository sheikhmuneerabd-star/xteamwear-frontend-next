import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function ContactBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-xs md:text-sm">
      <ol className="flex items-center gap-1 text-gray-500">
        <li>
          <Link
            href="/"
            className="hover:text-black transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <MdOutlineKeyboardArrowRight className="text-gray-400 text-base" />
        </li>
        <li className="font-semibold text-gray-900" aria-current="page">
          Contact Us
        </li>
      </ol>
    </nav>
  );
}