import { LuMousePointerClick, LuFileCheck, LuPackageCheck } from "react-icons/lu";

const steps = [
  { icon: LuMousePointerClick, title: "Pick a product", desc: "Choose your product & customization type." },
  { icon: LuFileCheck, title: "Submission of requirements", desc: "Fill the form with team & design info." },
  { icon: LuPackageCheck, title: "Order the product", desc: "Confirm your design and place your order." },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 py-14 px-5">
      <h2 className="text-2xl font-bold text-center mb-10">How to get your custom goodies</h2>
      <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-8 text-center">
        {steps.map((step) => (
          <div key={step.title}>
            <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mx-auto">
              <step.icon className="text-2xl text-gray-700" />
            </div>
            <p className="font-medium mt-4 text-sm">{step.title}</p>
            <p className="text-xs text-gray-500 mt-1">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}