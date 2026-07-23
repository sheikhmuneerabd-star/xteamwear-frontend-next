import TopLinks from "@/components/cart/TopLinks";
import ProgressBar from "@/components/cart/ProgressBar";
import Timer from "@/components/cart/Timer";
import ProductDetails from "@/components/cart/ProductDetails";
import ProductCarts from "@/components/cart/ProductCarts";

export default function CartPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <TopLinks />
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight uppercase">
        Your Cart
      </h1>
      <ProgressBar />
      <Timer />
      <ProductDetails />
      <ProductCarts />
    </main>
  );
}