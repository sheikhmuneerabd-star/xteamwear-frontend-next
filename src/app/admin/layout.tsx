import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LuLayoutDashboard, LuPackage, LuShoppingBag, LuArrowLeft, LuTags, LuSettings } from "react-icons/lu";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-[220px] bg-gray-900 text-white p-5 space-y-4">
        <Link href="/" className="text-xl font-bold mb-6 cursor-pointer">Xteamwear Admin</Link>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:bg-gray-800 rounded px-3 py-2">
            Dashboard
          </Link>
          <Link href="/admin/products" className="hover:bg-gray-800 rounded px-3 py-2">
            Products
          </Link>
          <Link href="/admin/orders" className="hover:bg-gray-800 rounded px-3 py-2">
            Orders
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LuTags className="text-lg" />
            Categories
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LuSettings className="text-lg" />
            Site Settings
          </Link>
          <Link href="/" className="hover:bg-gray-800 rounded px-3 py-2 text-gray-400 mt-8">
            ← Back to Store
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-8">{children}</main>
    </div>
  );
}