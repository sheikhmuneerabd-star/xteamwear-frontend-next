"use client";

import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";
import { useState, useEffect } from "react";

interface VariantInput {
  color: string;
  icon: string;
  images: string[];
  sku: string;
  stock: string; // form mein string rakha hai, submit pe Number() se convert hoga
}

interface ProductFormValues {
  name: string;
  oldPrice: string;
  newPrice: string;
  category: string;
  subCategory: string;
  item: string;
  available: boolean;
  variants: VariantInput[];
}

interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>;
  productId?: string; // agar exist karta hai, to Edit mode hai
}

interface DbSubcategory {
  name: string;
  items: string[];
}

interface DbCategory {
  name: string;
  subcategories: DbSubcategory[];
}

const emptyVariant: VariantInput = { color: "", icon: "", images: ["", ""], sku: "", stock: "0" };

export default function ProductForm({ initialValues, productId }: ProductFormProps) {
  const router = useRouter();
  const [dbCategories, setDbCategories] = useState<DbCategory[]>([]);
  const [values, setValues] = useState<ProductFormValues>({
    name: initialValues?.name || "",
    oldPrice: initialValues?.oldPrice || "",
    newPrice: initialValues?.newPrice || "",
    category: initialValues?.category || "",
    subCategory: initialValues?.subCategory || "",
    item: initialValues?.item || "",
    available: initialValues?.available ?? true,
    variants: initialValues?.variants?.length ? initialValues.variants : [emptyVariant],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setDbCategories(data.categories || []);
    }
    fetchCategories();
  }, []);

  const handleColorChange = (index: number, value: string) => {
    setValues((prev) => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], color: value };
      return { ...prev, variants: updated };
    });
  };

  const handleVariantFieldChange = (index: number, field: "sku" | "stock", value: string) => {
    setValues((prev) => {
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const addVariant = () => {
    setValues((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...emptyVariant, images: ["", ""] }],
    }));
  };

  const removeVariant = (index: number) => {
    setValues((prev) => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Image URL validation — Next.js Image ko "/" ya "http(s)://" se shuru hona chahiye
    const isValidImagePath = (path: string) =>
      path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://");

    for (const variant of values.variants) {
      if (!variant.icon || !isValidImagePath(variant.icon.trim())) {
        setError(`"${variant.color || "Variant"}" ka Icon upload karna zaroori hai.`);
        return;
      }
      const imageList = variant.images.filter(Boolean);
      if (imageList.length === 0) {
        setError(`"${variant.color || "Variant"}" ki kam se kam ek image upload karna zaroori hai.`);
        return;
      }
      for (const img of imageList) {
        if (!isValidImagePath(img)) {
          setError(`"${variant.color || "Variant"}" ki ek image sahi format mein nahi hai.`);
          return;
        }
      }
    }

    setLoading(true);

    const payload = {
      name: values.name,
      oldPrice: Number(values.oldPrice),
      newPrice: Number(values.newPrice),
      category: values.category,
      subCategory: values.subCategory || undefined,
      item: values.item || undefined,
      available: values.available,
      variants: values.variants.map((v) => ({
        color: v.color,
        icon: v.icon,
        images: v.images.filter(Boolean),
        sku: v.sku.trim().toUpperCase(),
        stock: Number(v.stock) || 0,
      })),
    };

    try {
      const res = await fetch(productId ? `/api/products/${productId}` : "/api/products", {
        method: productId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-5 max-w-3xl">
      <div>
        <label className="block text-sm font-medium mb-1">Product Name</label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-black"
          type="text"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Old Price (USD)</label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-black"
            type="number"
            step="0.01"
            value={values.oldPrice}
            onChange={(e) => setValues((prev) => ({ ...prev, oldPrice: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">New Price (USD)</label>
          <input
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-black"
            type="number"
            step="0.01"
            value={values.newPrice}
            onChange={(e) => setValues((prev) => ({ ...prev, newPrice: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-black bg-white"
            value={values.category}
            onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value, subCategory: "" }))}
            required
          >
            <option value="">Select category</option>
            {dbCategories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subcategory (optional)</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-black bg-white disabled:bg-gray-100"
            value={values.subCategory}
            onChange={(e) => setValues((prev) => ({ ...prev, subCategory: e.target.value }))}
            disabled={!values.category}
          >
            <option value="">None</option>
            {dbCategories
              .find((cat) => cat.name === values.category)
              ?.subcategories.map((sub) => (
                <option key={sub.name} value={sub.name}>
                  {sub.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Item (optional)</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-black bg-white disabled:bg-gray-100"
            value={values.item}
            onChange={(e) => setValues((prev) => ({ ...prev, item: e.target.value }))}
            disabled={!values.subCategory}
          >
            <option value="">None</option>
            {dbCategories
              .find((cat) => cat.name === values.category)
              ?.subcategories.find((sub) => sub.name === values.subCategory)
              ?.items.map((it) => (
                <option key={it} value={it}>
                  {it}
                </option>
              ))}
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={values.available}
          onChange={(e) => setValues((prev) => ({ ...prev, available: e.target.checked }))}
        />
        <span className="text-sm font-medium">In Stock</span>
      </label>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Color Variants</label>
          <button
            type="button"
            onClick={addVariant}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium transition-colors duration-150"
          >
            + Add Variant
          </button>
        </div>

        <div className="space-y-4">
          {values.variants.map((variant, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Variant {index + 1}</span>
                {values.variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVariant(index)}
                    className="text-sm bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium transition-colors duration-150"
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm"
                type="text"
                placeholder="Color name (e.g. Red)"
                value={variant.color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm uppercase"
                  type="text"
                  placeholder="SKU (e.g. JERSEY-RED-M)"
                  value={variant.sku}
                  onChange={(e) => handleVariantFieldChange(index, "sku", e.target.value)}
                  required
                />
                <input
                  className="w-full border border-gray-300 rounded-md p-2 outline-none text-sm"
                  type="number"
                  min="0"
                  placeholder="Stock quantity"
                  value={variant.stock}
                  onChange={(e) => handleVariantFieldChange(index, "stock", e.target.value)}
                  required
                />
              </div>

              <div>
                <ImageUploader
                  label="Icon (color swatch)"
                  value={variant.icon}
                  onChange={(url) =>
                    setValues((prev) => {
                      const updated = [...prev.variants];
                      updated[index] = { ...updated[index], icon: url };
                      return { ...prev, variants: updated };
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Images (front, back, extra views)</label>
                <div className="flex gap-3 flex-wrap">
                  {variant.images.map((img, imgIndex) => (
                    <ImageUploader
                      key={imgIndex}
                      value={img}
                      onChange={(url) =>
                        setValues((prev) => {
                          const updated = [...prev.variants];
                          const updatedImages = [...updated[index].images];
                          updatedImages[imgIndex] = url;
                          updated[index] = { ...updated[index], images: updatedImages };
                          return { ...prev, variants: updated };
                        })
                      }
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setValues((prev) => {
                        const updated = [...prev.variants];
                        updated[index] = { ...updated[index], images: [...updated[index].images, ""] };
                        return { ...prev, variants: updated };
                      })
                    }
                    className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400 hover:border-gray-500 hover:text-gray-600 text-sm"
                  >
                    + More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2.5 rounded-md font-medium disabled:opacity-60"
      >
        {loading ? "Saving..." : productId ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}