"use client";

import { useState } from "react";
import { IoLogoWhatsapp, IoCloudUploadOutline } from "react-icons/io5";

const sportOptions = ["Soccer", "Basketball", "Baseball", "Winterwear", "Accessories", "Training Jacket"];
const quantityOptions = ["1", "2-5", "6-10", "11-20", "21-50", "50+"];
const customizationOptions = [
  "Personalized Jersey (Name & Number)",
  "Team Logo Only",
  "Full Team Kit",
  "Sponsor Text/Logo",
];
const teamColors = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#3b82f6", "#6366f1", "#a855f7", "#ec4899", "#78716c",
  "#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#0891b2", "#2563eb",
  "#7c3aed", "#c026d3", "#be185d", "#57534e",
];

export default function BespokeQuoteForm() {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [sports, setSports] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(quantityOptions[0]);
  const [customizationType, setCustomizationType] = useState(customizationOptions[0]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleSport = (sport: string) => {
    setSports((prev) => (prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]));
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/bespoke-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          whatsapp,
          email,
          sports,
          quantity,
          customizationType,
          teamColors: selectedColors,
          details,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setName("");
      setWhatsapp("");
      setEmail("");
      setSports([]);
      setSelectedColors([]);
      setDetails("");
      setLoading(false);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div id="quote-form" className="max-w-xl mx-auto py-16 px-5 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <h3 className="text-xl font-semibold text-green-700">Request Sent!</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Thanks for reaching out — our team will contact you within 24 hours with a free design preview and quote.
          </p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-5 text-sm underline text-gray-600"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="quote-form" className="max-w-xl mx-auto py-16 px-5">
      <p className="text-center text-sm text-gray-600 mb-2">
        Contact us on{" "}
        <span className="inline-flex items-center gap-1 text-green-600 font-medium">
          <IoLogoWhatsapp /> WhatsApp
        </span>
        , or fill out the form to claim your custom design offer today!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <input
          className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-black"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-black"
          type="tel"
          placeholder="Whatsapp/Phone (Required)"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          required
        />
        <input
          className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-black"
          type="email"
          placeholder="Email (Required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-2">Customization needed</label>
          <div className="grid grid-cols-2 gap-2">
            {sportOptions.map((sport) => (
              <label key={sport} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={sports.includes(sport)}
                  onChange={() => toggleSport(sport)}
                  className="w-4 h-4 accent-black"
                />
                {sport}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estimated Order Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-black bg-white"
          >
            {quantityOptions.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Customization Needed</label>
          <select
            value={customizationType}
            onChange={(e) => setCustomizationType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-black bg-white"
          >
            {customizationOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Team Color</label>
          <div className="flex flex-wrap gap-2">
            {teamColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => toggleColor(color)}
                style={{ backgroundColor: color }}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color) ? "border-black scale-110" : "border-gray-200"
                }`}
                aria-label={color}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">If you have design references, please share with us</label>
          <div className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400">
            <IoCloudUploadOutline className="text-xl" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Details</label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-sm outline-none focus:border-black h-[90px] resize-none"
            placeholder="Tell us a little more about (Team name, quantity, sizes, etc.)"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-full font-medium transition-colors disabled:opacity-60"
        >
          {loading ? "Sending..." : "SUBMIT"}
        </button>

        <p className="text-center text-xs text-gray-500">
          No obligation · No spam · 24h response
          <br />
          You will receive a free design preview before ordering. Your information is kept private and will
          only be used to provide your quote and support.
        </p>
      </form>
    </div>
  );
}