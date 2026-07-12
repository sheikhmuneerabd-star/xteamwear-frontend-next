"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface AdminProduct {
  _id: string;
  name: string;
  oldPrice: number;
  newPrice: number;
  category: string;
  available: boolean;
  variants: { color: string; icon: string; images: string[]; sku: string; stock: number }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2 rounded-md font-medium"
        >
          + Add Product
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products yet. Add your first one.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3">Available</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">
                    <div className="relative w-12 h-12">
                      <Image
                        src={product.variants[0]?.icon || "/placeholder.png"}
                        alt={product.name}
                        fill
                        sizes="48px"
                        className="object-cover rounded"
                      />
                    </div>
                  </td>
                  <td className="p-3 max-w-[250px] truncate">{product.name}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">Rs.{product.newPrice.toLocaleString("en-PK")}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        product.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/products/${product._id}/edit`}
                      className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium transition-colors duration-150"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="text-sm bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}