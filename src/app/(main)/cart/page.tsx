import TopLinks from "@/components/cart/TopLinks";
import ProgressBar from "@/components/cart/ProgressBar";
import Timer from "@/components/cart/Timer";
import ProductDetails from "@/components/cart/ProductDetails";
import ProductCarts from "@/components/cart/ProductCarts";

export default function CartPage() {
  return (
    <div className="lg:w-[92%] w-[95%] mx-auto">
      <TopLinks />
      <h2 className="text-[28px]">YOUR CART</h2>
      <ProgressBar />
      <Timer />
      <ProductDetails />
      <ProductCarts />
    </div>
  );
}