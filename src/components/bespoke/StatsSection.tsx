const stats = [
  { value: "130+", label: "Countries served — with a focus on American & European sports teams." },
  { value: "1.1M+", label: "Teams customized — 48.3% Soccer, 36.6% Basketball, and more." },
  { value: "5.8M+", label: "Uniforms produced — over 70% are repeat orders." },
];

export default function StatsSection() {
  return (
    <div className="py-14 px-5">
      <h2 className="text-2xl font-bold text-center mb-2">XTeamwear Team Service</h2>
      <p className="text-center text-sm text-gray-600 max-w-2xl mx-auto mb-10">
        XTeamwear produce custom design sportswear for teams all over the world. We have a professional
        design team, high-tech AI garment production process and are committed to improved research and
        development of sportswear equipment.
      </p>
      <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.value}>
            <p className="text-3xl font-bold text-red-500">{s.value}</p>
            <p className="text-sm text-gray-600 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}