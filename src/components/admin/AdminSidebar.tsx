"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LuLayoutDashboard, 
  LuPackage, 
  LuShoppingBag, 
  LuCreditCard, 
  LuTags, 
  LuSettings, 
  LuArrowLeft 
} from "react-icons/lu";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LuLayoutDashboard },
    { name: "Products", href: "/admin/products", icon: LuPackage },
    { name: "Orders", href: "/admin/orders", icon: LuShoppingBag },
    { name: "Payments", href: "/admin/payments", icon: LuCreditCard },
    { name: "Categories", href: "/admin/categories", icon: LuTags },
    { name: "Site Settings", href: "/admin/settings", icon: LuSettings },
  ];

  return (
    <aside className="w-[220px] bg-[#0b1329] text-white p-5 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="space-y-6">
        <Link href="/" prefetch={true} className="text-xl font-bold block cursor-pointer text-white">
          Xteamwear Admin
        </Link>
        
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/admin" 
              ? pathname === "/admin" 
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true} // High speed routing prefetch
                onMouseEnter={() => router.prefetch(item.href)} // Hover hote hi route load kar lega
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-[#18233c] text-amber-400 font-semibold border border-amber-400/20 shadow-sm"
                    : "text-slate-400 hover:bg-[#151f38] hover:text-slate-200"
                }`}
              >
                <Icon className={`text-lg ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <Link 
        href="/" 
        prefetch={true}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:bg-[#151f38] hover:text-white transition-colors"
      >
        <LuArrowLeft /> Back to Store
      </Link>
    </aside>
  );
}