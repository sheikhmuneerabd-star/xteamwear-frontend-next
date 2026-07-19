import { LuTruck, LuHeart, LuAward, LuPencilLine } from "react-icons/lu";

const features = [
  { icon: LuTruck, label: "Express Delivery" },
  { icon: LuHeart, label: "Friendly Service" },
  { icon: LuAward, label: "Premium Quality" },
  { icon: LuPencilLine, label: "Fully Editable" },
];

export default function BespokeHero() {
  return (
    <div className="relative bg-black text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto text-center py-16 px-5">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">CONTACT US</h1>
        <p className="text-yellow-400 font-medium mt-3 tracking-wide">
          CUSTOMISED SPORTSWEAR FOR YOU AND YOUR TEAM
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 max-w-2xl mx-auto">
          {features.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-2">
              <f.icon className="text-2xl text-yellow-400" />
              <span className="text-xs text-gray-200">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}