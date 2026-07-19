import Link from "next/link";

const collections = [
  { name: "Soccer", desc: "Custom soccer jerseys for teams" },
  { name: "Baseball", desc: "Custom baseball uniforms for teams" },
  { name: "Basketball", desc: "Custom basketball jerseys for teams" },
  { name: "Football", desc: "Trending fits for teams" },
  { name: "Accessories", desc: "Quality bags for teams" },
  { name: "Winter Wear", desc: "Warmth for teams" },
];

export default function MoreCollections() {
  return (
    <div className="py-14 px-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-10">More Collections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {collections.map((c) => (
          <Link
            key={c.name}
            href={`/category/${encodeURIComponent(c.name)}`}
            className="border border-gray-200 rounded-lg p-5 hover:border-black transition-colors"
          >
            <p className="font-medium text-sm">{c.name}</p>
            <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}