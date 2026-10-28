import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.bespoketeamwear.com";

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

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}