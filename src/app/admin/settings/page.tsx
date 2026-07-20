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

const emptySlide: HeroSlide = { imageDesktop: "", imageMobile: "" };
const emptyAdvantage: Advantage = { image: "", title: "" };

export default function SiteSettingsPage() {
  const [logo, setLogo] = useState("");
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [squadImages, setSquadImages] = useState<string[]>([]);
  const [advantages, setAdvantages] = useState<Advantage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/settings");
      const data = await res.json();
      setLogo(data.settings.logo || "");
      setSlides(data.settings.heroSlides?.length ? data.settings.heroSlides : [emptySlide]);
      setSquadImages(data.settings.squadImages?.length ? data.settings.squadImages : [""]);
      setAdvantages(data.settings.advantages?.length ? data.settings.advantages : [emptyAdvantage]);
      setLoading(false);
    }
    load();
  }, []);

  // --- Hero slides ---
  const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const addSlide = () => setSlides((prev) => [...prev, { ...emptySlide }]);
  const removeSlide = (index: number) => setSlides((prev) => prev.filter((_, i) => i !== index));

  // --- Squad images ---
  const updateSquadImage = (index: number, url: string) => {
    setSquadImages((prev) => {
      const updated = [...prev];
      updated[index] = url;
      return updated;
    });
  };
  const addSquadImage = () => setSquadImages((prev) => [...prev, ""]);
  const removeSquadImage = (index: number) => setSquadImages((prev) => prev.filter((_, i) => i !== index));

  // --- Advantages ---
  const updateAdvantage = (index: number, field: keyof Advantage, value: string) => {
    setAdvantages((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };
  const addAdvantage = () => setAdvantages((prev) => [...prev, { ...emptyAdvantage }]);
  const removeAdvantage = (index: number) => setAdvantages((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logo,
        heroSlides: slides,
        squadImages: squadImages.filter(Boolean),
        advantages,
      }),
    });

    setMessage(res.ok ? "Saved successfully!" : "Failed to save.");
    setSaving(false);
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl space-y-8">
      <h1 className="text-2xl font-semibold">Site Settings</h1>

      {/* Logo */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="font-medium mb-3">Navbar Logo</h2>
        <ImageUploader label="Logo" value={logo} onChange={setLogo} />
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

      {/* Global Squad Images */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Global Squad Images ({squadImages.length})</h2>
          <button
            type="button"
            onClick={addSquadImage}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium"
          >
            + Add Image
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {squadImages.map((img, i) => (
            <div key={i} className="relative">
              <ImageUploader value={img} onChange={(url) => updateSquadImage(i, url)} />
              <button
                type="button"
                onClick={() => removeSquadImage(i)}
                className="text-xs text-red-600 mt-1 block"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Factory Card Advantages */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Advantages / Factory Cards ({advantages.length})</h2>
          <button
            type="button"
            onClick={addAdvantage}
            className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1.5 rounded-md font-medium"
          >
            + Add Card
          </button>
        </div>

        {advantages.map((adv, i) => (
          <div key={i} className="border border-gray-200 rounded-md p-4 flex gap-4 items-start">
            <ImageUploader value={adv.image} onChange={(url) => updateAdvantage(i, "image", url)} />
            <div className="flex-1 space-y-2">
              <input
                className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-black"
                placeholder="Title (e.g. Rapid Delivery)"
                value={adv.title}
                onChange={(e) => updateAdvantage(i, "title", e.target.value)}
              />
              {advantages.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAdvantage(i)}
                  className="text-xs text-red-600"
                >
                  Remove Card
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {message && <p className="text-sm text-gray-700">{message}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="bg-[#0B1E3D] text-white px-6 py-2.5 rounded-md font-medium disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}