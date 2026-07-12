import Product from "@/lib/models/Product";

/**
 * Checks that none of the given SKUs already exist in the database
 * (excluding the product currently being edited, if any).
 */
export async function findDuplicateSku(skus: string[], excludeProductId?: string): Promise<string | null> {
  const filter: Record<string, unknown> = { "variants.sku": { $in: skus } };
  if (excludeProductId) {
    filter._id = { $ne: excludeProductId };
  }

  const existing = await Product.findOne(filter);
  if (!existing) return null;

  const clash = existing.variants.find((v) => skus.includes(v.sku));
  return clash?.sku ?? null;
}