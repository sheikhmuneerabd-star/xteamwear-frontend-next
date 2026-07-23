"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface HeroSlide {
  imageDesktop: string;
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

interface CardItem {
  badge?: string;
  category: string;
  title: string;
  image: string;
  link: string;
}

interface BespokeBanner {
  badge: string;
  heading: string;
  description: string;
  mainImage: string;
  buttonText: string;
  buttonLink: string;
  cards: CardItem[];
}

interface CategoryShowcaseItem {
  id: string;
  title: string;
  itemCount: string;
  image: string;
  link: string;
  tag?: string;
}

const emptySlide: HeroSlide = { imageDesktop: "", imageMobile: "" };
const emptyAdvantage: Advantage = { image: "", title: "" };
const emptyPost: SocialPost = { image: "", caption: "", link: "" };

const initialCategories: CategoryShowcaseItem[] = [
  { id: "football", title: "Football Kits", itemCount: "48+ Products", image: "", link: "/category/football", tag: "Popular" },
  { id: "basketball", title: "Basketball Wear", itemCount: "32+ Products", image: "", link: "/category/basketball", tag: "" },
  { id: "baseball", title: "Baseball Jerseys", itemCount: "24+ Products", image: "", link: "/category/baseball", tag: "" },
  { id: "winterwear", title: "Outerwear & Vests", itemCount: "18+ Products", image: "", link: "/category/Winter Wear", tag: "" },
  { id: "training", title: "Athletic Training", itemCount: "50+ Products", image: "", link: "/category/training", tag: "New" },
];

const defaultBespokeBanner: BespokeBanner = {
  badge: "BESPOKE WEAR • 2026 RELEASE",
  heading: "2026 ELITE PERFORMANCE COLLECTION",
  description:
    "Engineered with advanced moisture-wicking technology and ergonomic fit. Designed exclusively for professional athletes and modern teams.",
  mainImage: "",
  buttonText: "EXPLORE FULL COLLECTION",
  buttonLink: "/category/all",
  cards: [
    { badge: "BEST SELLER", category: "PRO FOOTBALL", title: "Sublimated Pro Match Jersey", image: "", link: "/category/Football" },
    { badge: "NEW", category: "TRAINING WEAR", title: "Ergonomic Training Zip Top", image: "", link: "/category/Training" },
    { badge: "", category: "ATHLETIC WEAR", title: "Elite Performance Track Suit", image: "", link: "/category/Winter Wear" },
  ],
};

export default function SiteSettingsPage() {
  const [logo, setLogo] = useState("");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [squadImages, setSquadImages] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);

  const [bespokeBanner, setBespokeBanner] = useState<BespokeBanner>(defaultBespokeBanner);
  const [categoriesShowcase, setCategoriesShowcase] = useState<CategoryShowcaseItem[]>(initialCategories);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: "no-store" });
        const data = await res.json();
        
        const settings = data.settings || data;

        setLogo(settings?.logo || "");
        setSlides(settings?.heroSlides?.length ? settings.heroSlides : [emptySlide]);
        setSquadImages(settings?.squadImages?.length ? settings.squadImages : ["", "", "", ""]);
        setAdvantages(settings?.advantages?.length ? settings.advantages : [emptyAdvantage]);
        setSocialPosts(settings?.socialPosts?.length ? settings.socialPosts : [emptyPost]);

        if (settings?.bespokeBanner) {
          setBespokeBanner(settings.bespokeBanner);
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

  const updateAdvantage = (index: number, field: keyof Advantage, value: string) => {
    setAdvantages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const updateBespokeField = (field: keyof BespokeBanner, value: any) => {
    setBespokeBanner((prev) => ({ ...prev, [field]: value }));
  };

  const updateBespokeCard = (index: number, field: keyof CardItem, value: string) => {
    setBespokeBanner((prev) => {
      const updatedCards = [...prev.cards];
      updatedCards[index] = { ...updatedCards[index], [field]: value };
      return { ...prev, cards: updatedCards };
    });
  };

  const updateCategoryShowcase = (index: number, field: keyof CategoryShowcaseItem, value: string) => {
    setCategoriesShowcase((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
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
          bespokeBanner,
          categoriesShowcase,
        }),
      });

      if (res.ok) {
        setMessage("Saved successfully! Page will refresh data.");
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
    <div className="p-6 max-w-4xl space-y-8 font-sans">
      <h1 className="text-2xl font-semibold">Site Settings</h1>

      {/* Logo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-medium mb-3">Navbar Logo</h2>
        <ImageUploader label="Logo" value={logo} onChange={setLogo} />
      </div>

      {/* Curated Category Cards */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="border-b pb-3">
          <h2 className="font-medium text-lg text-gray-900">
            Curated Category Cards (Explore by Sport)
          </h2>
          <p className="text-xs text-gray-500">
            Upload images and text for the 5 category banner cards.
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

      {/* Featured Collection Banner */}
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="border-b pb-3">
          <h2 className="font-medium text-lg text-gray-900">
            Featured Collection Banner (Bespoke Wear)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Top Badge Tag
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              value={bespokeBanner.badge}
              onChange={(e) => updateBespokeField("badge", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Heading Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2 text-sm font-semibold"
              value={bespokeBanner.heading}
              onChange={(e) => updateBespokeField("heading", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1">
            Description Text
          </label>
          <textarea
            rows={2}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={bespokeBanner.description}
            onChange={(e) => updateBespokeField("description", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Button Text
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              value={bespokeBanner.buttonText}
              onChange={(e) => updateBespokeField("buttonText", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1">
              Button Link
            </label>
            <input
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              value={bespokeBanner.buttonLink}
              onChange={(e) => updateBespokeField("buttonLink", e.target.value)}
            />
          </div>
        </div>

        <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
          <p className="text-xs font-semibold text-gray-700 mb-2">
            Main Featured Image
          </p>
          <ImageUploader
            value={bespokeBanner.mainImage}
            onChange={(url) => updateBespokeField("mainImage", url)}
          />
        </div>

        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold text-gray-800">
            Bottom 3 Collection Cards
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bespokeBanner.cards.map((card, idx) => (
              <div key={idx} className="border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50">
                <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-100 px-2 py-0.5 rounded">
                  Card #{idx + 1}
                </span>

                <ImageUploader
                  label="Card Image"
                  value={card.image}
                  onChange={(url) => updateBespokeCard(idx, "image", url)}
                />

                <input
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                  placeholder="Badge"
                  value={card.badge || ""}
                  onChange={(e) => updateBespokeCard(idx, "badge", e.target.value)}
                />

                <input
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs font-semibold"
                  placeholder="Category"
                  value={card.category}
                  onChange={(e) => updateBespokeCard(idx, "category", e.target.value)}
                />

                <input
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                  placeholder="Title"
                  value={card.title}
                  onChange={(e) => updateBespokeCard(idx, "title", e.target.value)}
                />

                <input
                  className="w-full border border-gray-300 rounded-md p-1.5 text-xs"
                  placeholder="Link"
                  value={card.link}
                  onChange={(e) => updateBespokeCard(idx, "link", e.target.value)}
                />
              </div>
            ))}
          </div>
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
                label="Mobile Image"
                value={slide.imageMobile}
                onChange={(url) => updateSlide(i, "imageMobile", url)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Squad / Gallery Images Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div>
            <h2 className="font-medium text-lg text-gray-900">
              Squad / Gallery Images (Trusted by Athletes)
            </h2>
            <p className="text-xs text-gray-500">
              Upload images for the multi-grid gallery section.
            </p>
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
              <ImageUploader
                value={imgUrl}
                onChange={(url) => updateSquadImage(i, url)}
              />
            </div>
          ))}
        </div>
      </div>

      {message && <p className="text-sm text-green-700 font-medium">{message}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="bg-[#0B1E3D] text-white px-6 py-2.5 rounded-md font-medium disabled:opacity-60 cursor-pointer"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}