"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface HeroSlide {
  imageDesktop: string;
  imageTablet: string;
  imageMobile: string;
}

interface Advantage {
  image: string;
  title: string;
}

interface SocialPost {
  image: string;
  caption: string;
  link: string;
}

interface CategoryShowcaseItem {
  id: string;
  title: string;
  itemCount: string;
  image: string;
  link: string;
  tag?: string;
}

interface ProductItem {
  _id: string;
  title?: string;
  name?: string;
  images?: string[];
  image?: string;
  price?: number;
}

interface PackageBanner {
  title: string;
  imageDesktop: string;
  imageTablet: string;
  imageMobile: string;
}

interface PromoMainBanner {
  title: string;
  highlight: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  imageMobile: string;
}

interface PromoBottomBanner {
  badge: string;
  title: string;
  tags: string[];
  imageMobile: string;
}

interface PromoBanners {
  mainBanner: PromoMainBanner;
  bottomBanner: PromoBottomBanner;
}

const defaultPromoBanners: PromoBanners = {
  mainBanner: {
    title: "ORDER ONLINE",
    highlight: "EASILY.",
    features: [
      "Instant Quote Tool",
      "Automated Ordering",
      "Create Your Package",
      "Free Custom Designs",
      "Add Team Rosters",
      "Run Your Fan Shop",
    ],
    buttonText: "START CUSTOM ORDER",
    buttonLink: "/custom-order",
    imageMobile: "",
  },
  bottomBanner: {
    badge: "EXCLUSIVE FOR",
    title: "Schools & Non-Profits Discount",
    tags: ["Schools", "Colleges", "High Schools", "Non-Profit Organizations"],
    imageMobile: "",
  },
};

const emptyPackageBanner: PackageBanner = { title: "", imageDesktop: "", imageTablet: "", imageMobile: "" };

const emptySlide: HeroSlide = { imageDesktop: "", imageTablet: "", imageMobile: "" };
const emptyAdvantage: Advantage = { image: "", title: "" };
const emptyPost: SocialPost = { image: "", caption: "", link: "" };

const initialCategories: CategoryShowcaseItem[] = [
  { id: "football", title: "Football Kits", itemCount: "48+ Products", image: "", link: "/category/football", tag: "Popular" },
  { id: "basketball", title: "Basketball Wear", itemCount: "32+ Products", image: "", link: "/category/basketball", tag: "" },
  { id: "baseball", title: "Baseball Jerseys", itemCount: "24+ Products", image: "", link: "/category/baseball", tag: "" },
  { id: "winterwear", title: "Outerwear & Vests", itemCount: "18+ Products", image: "", link: "/category/Winter Wear", tag: "" },
  { id: "training", title: "Athletic Training", itemCount: "50+ Products", image: "", link: "/category/training", tag: "New" },
];

export default function SiteSettingsPage() {
  const [logo, setLogo] = useState("");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [squadImages, setSquadImages] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [trendingTags, setTrendingTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");
  const [packageBanners, setPackageBanners] = useState<PackageBanner[]>([]);
  const [promoBanners, setPromoBanners] = useState<PromoBanners>(defaultPromoBanners);

  const [shippingConfig, setShippingConfig] = useState({
    freeShippingThreshold: 150,
    standardShippingFee: 15,
  });

  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [selectedPopularProductIds, setSelectedPopularProductIds] = useState<string[]>([]);

  const [categoriesShowcase, setCategoriesShowcase] = useState<CategoryShowcaseItem[]>(initialCategories);

  useEffect(() => {
    async function load() {
      try {
        const [settingsRes, prodRes] = await Promise.all([
          fetch("/api/settings", { cache: "no-store" }),
          fetch("/api/products/search?q="),
        ]);

        const data = await settingsRes.json();
        const prodData = await prodRes.json();

        setAllProducts(prodData.products || []);

        const settings = data.settings || data;

        setLogo(settings?.logo || "");
        setSlides(settings?.heroSlides?.length ? settings.heroSlides : [emptySlide]);
        setSquadImages(settings?.squadImages?.length ? settings.squadImages : ["", "", "", ""]);
        setAdvantages(settings?.advantages?.length ? settings.advantages : [emptyAdvantage]);
        setSocialPosts(settings?.socialPosts?.length ? settings.socialPosts : [emptyPost]);
        setTrendingTags(settings?.trendingTags || []);
        setPackageBanners(settings?.packageBanners?.length ? settings.packageBanners : [emptyPackageBanner]);

        if (settings?.popularProducts && Array.isArray(settings.popularProducts)) {
          const ids = settings.popularProducts.map((p: any) => (typeof p === "object" ? p._id : p));
          setSelectedPopularProductIds(ids);
        }

        if (settings?.categoriesShowcase && Array.isArray(settings.categoriesShowcase) && settings.categoriesShowcase.length > 0) {
          const merged = initialCategories.map((def, idx) => {
            const dbCat = settings.categoriesShowcase[idx];
            if (!dbCat) return def;
            return {
              id: dbCat.id || def.id,
              title: dbCat.title || def.title,
              itemCount: dbCat.itemCount || def.itemCount,
              image: dbCat.image || "",
              link: dbCat.link || def.link,
              tag: dbCat.tag !== undefined ? dbCat.tag : def.tag,
            };
          });
          setCategoriesShowcase(merged);
        }

        if (settings?.promoBanners) {
          setPromoBanners({
            mainBanner: { ...defaultPromoBanners.mainBanner, ...settings.promoBanners.mainBanner },
            bottomBanner: { ...defaultPromoBanners.bottomBanner, ...settings.promoBanners.bottomBanner },
          });
        }

        if (settings?.shippingConfig) {
          setShippingConfig(settings.shippingConfig);
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const addSlide = () => setSlides((prev) => [...prev, { ...emptySlide }]);
  const removeSlide = (index: number) => setSlides((prev) => prev.filter((_, i) => i !== index));

  const updateSquadImage = (index: number, url: string) => {
    setSquadImages((prev) => {
      const updated = [...prev];
      updated[index] = url;
      return updated;
    });
  };
  const addSquadImage = () => setSquadImages((prev) => [...prev, ""]);
  const removeSquadImage = (index: number) => setSquadImages((prev) => prev.filter((_, i) => i !== index));

  /* --- Advantages (Factory Cards) Handlers --- */
  const addAdvantage = () => setAdvantages((prev) => [...prev, { ...emptyAdvantage }]);
  const removeAdvantage = (index: number) => setAdvantages((prev) => prev.filter((_, i) => i !== index));
  const updateAdvantage = (index: number, field: keyof Advantage, value: string) => {
    setAdvantages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  /* --- Package Banners Handlers --- */
  const updatePackageBanner = (index: number, field: keyof PackageBanner, value: string) => {
    setPackageBanners((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const addPackageBanner = () => setPackageBanners((prev) => [...prev, { ...emptyPackageBanner }]);
  const removePackageBanner = (index: number) => setPackageBanners((prev) => prev.filter((_, i) => i !== index));

  /* --- Promo Banners Handlers --- */
  const updateMainBannerField = (field: keyof Omit<PromoMainBanner, "features">, value: string) => {
    setPromoBanners((prev) => ({
      ...prev,
      mainBanner: { ...prev.mainBanner, [field]: value },
    }));
  };

  const updateMainBannerFeature = (index: number, value: string) => {
    setPromoBanners((prev) => {
      const updated = [...prev.mainBanner.features];
      updated[index] = value;
      return { ...prev, mainBanner: { ...prev.mainBanner, features: updated } };
    });
  };

  const updateBottomBannerField = (field: keyof Omit<PromoBottomBanner, "tags">, value: string) => {
    setPromoBanners((prev) => ({
      ...prev,
      bottomBanner: { ...prev.bottomBanner, [field]: value },
    }));
  };

  const updateBottomBannerTag = (index: number, value: string) => {
    setPromoBanners((prev) => {
      const updated = [...prev.bottomBanner.tags];
      updated[index] = value;
      return { ...prev, bottomBanner: { ...prev.bottomBanner, tags: updated } };
    });
  };

  const updateCategoryShowcase = (index: number, field: keyof CategoryShowcaseItem, value: string) => {
    setCategoriesShowcase((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    if (trendingTags.includes(newTagInput.trim())) return;
    setTrendingTags([...trendingTags, newTagInput.trim()]);
    setNewTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTrendingTags(trendingTags.filter((t) => t !== tagToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logo,
          heroSlides: slides,
          squadImages: squadImages.filter(Boolean),
          advantages,
          socialPosts,
          trendingTags,
          categoriesShowcase,
          popularProducts: selectedPopularProductIds,
          shippingConfig,
          packageBanners,
          promoBanners,
        }),
      });

      if (res.ok) {
        setMessage("Settings updated & cache revalidated successfully!");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6">Loading settings...</p>;

  return (
    <div className="p-6 max-w-4xl space-y-8 font-sans pb-16">
      <h1 className="text-2xl font-semibold text-gray-900">Site Settings</h1>

      {/* Logo */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
        <h2 className="font-medium mb-3 text-gray-800">Navbar Logo</h2>
        <ImageUploader label="Logo" value={logo} onChange={setLogo} />
      </div>

      {/* Shipping Settings Section */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-100 space-y-4">
        <div className="border-b pb-3">
          <h2 className="font-medium text-lg text-gray-900">Shipping Configuration</h2>
          <p className="text-xs text-gray-500">
            Set default shipping charges and free shipping threshold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Free Shipping Minimum Amount ($)
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-[#0B1E3D]"
              value={shippingConfig.freeShippingThreshold}
              onChange={(e) =>
                setShippingConfig((prev) => ({
                  ...prev,
                  freeShippingThreshold: Number(e.target.value),
                }))
              }
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Standard Shipping Fee ($)
            </label>
            <input
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-[#0B1E3D]"
              value={shippingConfig.standardShippingFee}
              onChange={(e) =>
                setShippingConfig((prev) => ({
                  ...prev,
                  standardShippingFee: Number(e.target.value),
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Trending Search Tags Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-[#0B1E3D] mb-1">Navbar Trending / Search Tags</h3>
        <p className="text-xs text-gray-500 mb-4">
          Add custom tags that appear in the navbar search dropdown.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTagInput}
            onChange={(e) => setNewTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="Type a tag & press enter (e.g. Football Uniform)..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#A9762F]"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="bg-[#A9762F] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#8e6226] transition-colors"
          >
            Add Tag
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {trendingTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 bg-[#F3EFE6] text-[#0B1E3D] text-xs font-medium px-3 py-1.5 rounded-full border border-[#E6E1D6]"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-600 font-bold ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))}
          {trendingTags.length === 0 && (
            <p className="text-xs text-gray-400 italic">No search tags added yet.</p>
          )}
        </div>
      </div>

      {/* Curated Category Cards */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="border-b pb-3">
          <h2 className="font-medium text-lg text-gray-900">
            Curated Category Cards (Explore by Sport)
          </h2>
          <p className="text-xs text-gray-500">
            Upload images and text for the category banner cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesShowcase.map((cat, idx) => (
            <div key={idx} className="border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50">
              <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                Card #{idx + 1} ({cat.id})
              </span>

              <ImageUploader
                label="Background Image"
                value={cat.image}
                onChange={(url) => updateCategoryShowcase(idx, "image", url)}
              />

              <input
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs font-semibold"
                placeholder="Category Title"
                value={cat.title}
                onChange={(e) => updateCategoryShowcase(idx, "title", e.target.value)}
              />

              <input
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                placeholder="Item Count"
                value={cat.itemCount}
                onChange={(e) => updateCategoryShowcase(idx, "itemCount", e.target.value)}
              />

              <input
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                placeholder="Badge Tag"
                value={cat.tag || ""}
                onChange={(e) => updateCategoryShowcase(idx, "tag", e.target.value)}
              />

              <input
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                placeholder="Link URL"
                value={cat.link}
                onChange={(e) => updateCategoryShowcase(idx, "link", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hero Slider */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Hero Slider ({slides.length} slides)</h2>
          <button
            type="button"
            onClick={addSlide}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium"
          >
            + Add Slide
          </button>
        </div>

        {slides.map((slide, i) => (
          <div key={i} className="border border-gray-200 rounded-md p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Slide {i + 1}</span>
              {slides.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSlide(i)}
                  className="text-sm bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium"
                >
                  Remove
                </button>
              )}
            </div>
            <div className="flex gap-4">
              <ImageUploader
                label="Desktop Image"
                value={slide.imageDesktop}
                onChange={(url) => updateSlide(i, "imageDesktop", url)}
              />
              <ImageUploader
                label="Tablet Image"
                value={slide.imageTablet}
                onChange={(url) => updateSlide(i, "imageTablet", url)}
              />
              <ImageUploader
                label="Mobile Image"
                value={slide.imageMobile}
                onChange={(url) => updateSlide(i, "imageMobile", url)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Package Bundle Banners */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Package Bundle Banners ({packageBanners.length})</h2>
          <button
            type="button"
            onClick={addPackageBanner}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium"
          >
            + Add Banner
          </button>
        </div>

        {packageBanners.map((banner, i) => (
          <div key={i} className="border border-gray-200 rounded-md p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Banner {i + 1}</span>
              {packageBanners.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePackageBanner(i)}
                  className="text-sm bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            <input
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              placeholder="Title (e.g. Soccer Packages)"
              value={banner.title}
              onChange={(e) => updatePackageBanner(i, "title", e.target.value)}
            />

            <div className="flex gap-4">
              <ImageUploader
                label="Desktop Image"
                value={banner.imageDesktop}
                onChange={(url) => updatePackageBanner(i, "imageDesktop", url)}
              />
              <ImageUploader
                label="Tablet Image"
                value={banner.imageTablet}
                onChange={(url) => updatePackageBanner(i, "imageTablet", url)}
              />
              <ImageUploader
                label="Mobile Image"
                value={banner.imageMobile}
                onChange={(url) => updatePackageBanner(i, "imageMobile", url)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Factory Precision & Craftsmanship (Why Choose Us) */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4 border border-gray-100">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h2 className="font-medium text-lg text-gray-900">
              Factory Precision & Craftsmanship (Why Choose Us)
            </h2>
            <p className="text-xs text-gray-500">
              Manage factory cards displayed on the homepage.
            </p>
          </div>
          <button
            type="button"
            onClick={addAdvantage}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium"
          >
            + Add Advantage Card
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {advantages.map((adv, i) => (
            <div key={i} className="border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-600">Card #{i + 1}</span>
                {advantages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAdvantage(i)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              <ImageUploader
                label="Card Image"
                value={adv.image}
                onChange={(url) => updateAdvantage(i, "image", url)}
              />

              <input
                className="w-full border border-gray-300 rounded-md p-1.5 text-xs font-semibold"
                placeholder="Card Title"
                value={adv.title}
                onChange={(e) => updateAdvantage(i, "title", e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Squad / Gallery Images Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h2 className="font-medium text-lg text-gray-900">
              Squad / Gallery Images (Trusted by Athletes)
            </h2>
            <p className="text-xs text-gray-500">Upload images for the multi-grid gallery section.</p>
          </div>
          <button
            type="button"
            onClick={addSquadImage}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium"
          >
            + Add Image
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {squadImages.map((imgUrl, i) => (
            <div key={i} className="border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-600">Image #{i + 1}</span>
                {squadImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSquadImage(i)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
              <ImageUploader value={imgUrl} onChange={(url) => updateSquadImage(i, url)} />
            </div>
          ))}
        </div>
      </div>

      {/* Promo Banners Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="border-b pb-3">
          <h2 className="font-medium text-lg text-gray-900">Promo Banners</h2>
          <p className="text-xs text-gray-500">
            Desktop/Tablet par ye design code se banta hai (sirf text edit karein). Mobile ke liye image upload karein.
          </p>
        </div>

        {/* Main Banner */}
        <div className="border border-gray-200 rounded-md p-4 space-y-3 bg-gray-50">
          <span className="text-xs font-bold text-gray-700 uppercase">Top Main Banner</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Title (white)</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={promoBanners.mainBanner.title}
                onChange={(e) => updateMainBannerField("title", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Highlight Text (amber)</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={promoBanners.mainBanner.highlight}
                onChange={(e) => updateMainBannerField("highlight", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Button Text</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={promoBanners.mainBanner.buttonText}
                onChange={(e) => updateMainBannerField("buttonText", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Button Link</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={promoBanners.mainBanner.buttonLink}
                onChange={(e) => updateMainBannerField("buttonLink", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Checklist Items (6)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {promoBanners.mainBanner.features.map((f, i) => (
                <input
                  key={i}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                  value={f}
                  onChange={(e) => updateMainBannerFeature(i, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <ImageUploader
              label="Mobile Image (sirf mobile screen ke liye)"
              value={promoBanners.mainBanner.imageMobile}
              onChange={(url) =>
                setPromoBanners((prev) => ({
                  ...prev,
                  mainBanner: { ...prev.mainBanner, imageMobile: url },
                }))
              }
            />
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="border border-gray-200 rounded-md p-4 space-y-3 bg-gray-50">
          <span className="text-xs font-bold text-gray-700 uppercase">Bottom Banner</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Badge Text</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={promoBanners.bottomBanner.badge}
                onChange={(e) => updateBottomBannerField("badge", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Title</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm"
                value={promoBanners.bottomBanner.title}
                onChange={(e) => updateBottomBannerField("title", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">Tags (4)</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {promoBanners.bottomBanner.tags.map((t, i) => (
                <input
                  key={i}
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                  value={t}
                  onChange={(e) => updateBottomBannerTag(i, e.target.value)}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <ImageUploader
              label="Mobile Image (sirf mobile screen ke liye)"
              value={promoBanners.bottomBanner.imageMobile}
              onChange={(url) =>
                setPromoBanners((prev) => ({
                  ...prev,
                  bottomBanner: { ...prev.bottomBanner, imageMobile: url },
                }))
              }
            />
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-4 pt-4">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-[#0B1E3D] text-white px-6 py-2.5 rounded-md font-medium hover:opacity-90 disabled:opacity-60 cursor-pointer transition-all"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        {message && (
          <p className={`text-sm font-medium ${message.includes("Failed") ? "text-red-600" : "text-green-700"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}