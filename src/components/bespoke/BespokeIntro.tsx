import Link from "next/link";
import { LuCheck } from "react-icons/lu";

const points = [
  "Fully custom design: logos, names & numbers",
  "High-quality materials & professional workmanship",
  "Fast production & reliable worldwide shipping",
  "Suitable for teams, organizations & individuals",
];

export default function BespokeIntro() {
  return (
    <div className="max-w-2xl mx-auto text-center py-14 px-5">
      <h2 className="text-2xl md:text-3xl font-bold">Custom Soccer Jerseys – Fully Custom for Any Order</h2>
      <p className="text-gray-600 mt-3 text-sm">
        From individual custom jerseys to full team orders. Perfect for matches, events, or personal use.
      </p>
      <div className="mt-6 space-y-2 text-left max-w-md mx-auto">
        {points.map((p) => (
          <div key={p} className="flex items-start gap-2 text-sm">
            <LuCheck className="text-green-600 mt-0.5 shrink-0" />
            <span>{p}</span>
          </div>
        ))}
      </div>
      <Link
        href="#quote-form"
        className="inline-block mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transition-colors"
      >
        Get a Free Design & Price Quote
      </Link>
      <p className="text-xs text-gray-400 mt-4">
        Trusted by teams, organizations and soccer lovers worldwide. Serving customers across the United
        States, Canada, and beyond.
      </p>
    </div>
  );
}