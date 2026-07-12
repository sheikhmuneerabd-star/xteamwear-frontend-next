import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditPageProps) {
  const { id } = await params;
  await connectDB();

  const product = await Product.findById(id).lean();
  if (!product) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <ProductForm
        productId={id}
        initialValues={{
          name: product.name,
          oldPrice: String(product.oldPrice),
          newPrice: String(product.newPrice),
          category: product.category,
          subCategory: product.subCategory || "",
          available: product.available,
          variants: product.variants.map((v) => ({
            color: v.color,
            icon: v.icon,
            images: v.images,
            sku: v.sku,
            stock: String(v.stock),
          })),
        }}
      />
    </div>
  );
}