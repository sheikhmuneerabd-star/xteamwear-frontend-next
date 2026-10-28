import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";

const baseUrl = "https://www.bespoketeamwear.com";

// Har ghante naya data (build ke waqt bhi chalega)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/bespoke", priority: 0.9, changeFrequency: "monthly" },
    { path: "/custom-kit", priority: 0.9, changeFrequency: "monthly" },
    { path: "/partners", priority: 0.6, changeFrequency: "monthly" },
    { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
    { path: "/faqs", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact-us", priority: 0.5, changeFrequency: "yearly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  ] as const;

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  try {
    await connectDB();

    // ---------- Categories + Subcategories ----------
    const categories = await Category.find().lean();
    const seen = new Set<string>();

    for (const cat of categories as any[]) {
      const names = [cat.name, ...(cat.subcategories || []).map((s: any) => s.name)];
      for (const name of names) {
        if (!name || seen.has(name)) continue;
        seen.add(name);
        entries.push({
          url: `${baseUrl}/category/${encodeURIComponent(name)}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }

    // ---------- Products ----------
    const products = await Product.find({ available: true }).lean();

    for (const p of products as any[]) {
      const color = p.variants?.[0]?.color;
      if (!p._id || !color) continue;
      entries.push({
        url: `${baseUrl}/card/${p._id}/${encodeURIComponent(color)}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  } catch (error) {
    // DB na chale to bhi static pages wali sitemap kaam karti rahe
    console.error("Sitemap DB error:", error);
  }

  return entries;
}