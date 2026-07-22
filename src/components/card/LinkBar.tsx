import Link from "next/link";
import { HiChevronRight } from "react-icons/hi2";

interface LinkBarProps {
  productName: string;
}

export default function LinkBar({ productName }: LinkBarProps) {
  return (
    <nav className="py-4 font-sans text-xs font-bold tracking-wider uppercase text-slate-400">
      <div className="flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-amber-500 transition-colors">
          Home
        </Link>
        <HiChevronRight className="text-slate-300" />
        <Link href="/products" className="hover:text-amber-500 transition-colors">
          Products
        </Link>
        <HiChevronRight className="text-slate-300" />
        <span className="text-slate-900 font-extrabold line-clamp-1">{productName}</span>
      </div>
    </nav>
  );
}