import type { Product } from "@/types/product";

interface AvailableProps {
  categoryCardImg: Product[];
  setStockOpen: (v: boolean) => void;
  stockOpen: boolean;
  outStockOpen: boolean;
  setOutStockOpen: (v: boolean) => void;
}

export default function Available({ categoryCardImg, setStockOpen, stockOpen, outStockOpen, setOutStockOpen }: AvailableProps) {
  const inStock = categoryCardImg.filter((a) => a.available).length;
  const outStock = categoryCardImg.filter((a) => !a.available).length;

  return (
    <div className="p-4 space-y-5 mt-6">
      <h1 className="font-medium text-[15px] border-b pb-2 border-gray-600">AVAILABILITY</h1>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 border border-gray-300 accent-black rounded-md checked:bg-black checked:border-black text-white"
            type="checkbox"
            checked={stockOpen}
            onChange={(e) => setStockOpen(e.target.checked)}
          />
          <span className="text-[15px]">In Stock ({inStock})</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            className="w-4 h-4 border border-gray-300 accent-black rounded-md checked:bg-black checked:border-black text-white"
            type="checkbox"
            checked={outStockOpen}
            onChange={(e) => setOutStockOpen(e.target.checked)}
          />
          <span className="text-[15px]">Out Of Stock ({outStock})</span>
        </label>
        <span
          className="text-sm text-gray-600 underline cursor-pointer"
          onClick={() => {
            setStockOpen(false);
            setOutStockOpen(false);
          }}
        >
          Clear All
        </span>
      </div>
    </div>
  );
}