const reasons = [
  "Athlete's quality and fabrics.",
  "Free custom printing for all sublimated products.",
  "Client-centered sales & support & designer.",
  "Exclusive team uniform build-up plan.",
  "Various design choices and decoration options.",
  "Standard Custom ETA: 10–14 days",
  "Bespoke Custom ETA: 15–20 days",
];

export default function WhyXteamwear() {
  return (
    <div className="bg-gray-50 py-14 px-5">
      <h2 className="text-2xl font-bold text-center mb-8">Why Xteamwear?</h2>
      <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-3">
        {reasons.map((r) => (
          <div key={r} className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-md p-3 border border-gray-100">
            <span className="text-red-500 font-bold">✓</span>
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}