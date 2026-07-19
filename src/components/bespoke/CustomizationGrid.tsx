import {
  LuImageOff, LuMaximize, LuSparkles, LuPalette, LuHash, LuMapPin,
  LuType, LuLetterText, LuUpload, LuPaintbrush, LuFootprints, LuFileText,
} from "react-icons/lu";

const items = [
  { icon: LuImageOff, title: "Remove Logo Background" },
  { icon: LuMaximize, title: "Adjust Logo Size" },
  { icon: LuSparkles, title: "Enhance Logo Quality" },
  { icon: LuPalette, title: "Color Change" },
  { icon: LuHash, title: "Number Position Change" },
  { icon: LuMapPin, title: "Name Position Change" },
  { icon: LuType, title: "Name or Number Color Change" },
  { icon: LuLetterText, title: "Name or Number Font Change" },
  { icon: LuUpload, title: "Add a Logo" },
  { icon: LuPaintbrush, title: "Adjust Design Colors" },
  { icon: LuFootprints, title: "Design for Socks" },
  { icon: LuFileText, title: "Update Design Files" },
];

export default function CustomizationGrid() {
  return (
    <div className="py-14 px-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-10">Cooperate with XTeamwear</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="border border-gray-200 rounded-lg p-5 text-center hover:border-black transition-colors cursor-pointer"
          >
            <item.icon className="text-2xl mx-auto text-gray-700" />
            <p className="text-xs font-medium mt-3">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}