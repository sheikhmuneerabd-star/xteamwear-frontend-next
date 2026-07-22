"use client";

import { useState } from "react";
import { Range, getTrackBackground } from "react-range";

export default function PriceCals() {
  const [values, setValues] = useState<[number, number]>([0, 180]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = Number(e.target.value);
    if (val >= 180) val = 180;
    if (val < 0) val = 0;
    if (val <= values[1]) setValues([val, values[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      setValues([values[0], 180]);
      return;
    }
    let val = Number(raw);
    if (val > 180) val = 180;
    if (val < 0) val = 0;
    if (val >= values[0]) setValues([values[0], val]);
  };

  return (
    <div className="w-full pt-4 border-t border-gray-100">
      <h2 className="font-bold text-xs tracking-wider text-gray-900 uppercase mb-4">Price Range</h2>
      
      <div className="px-2">
        <Range
          step={1}
          min={0}
          max={180}
          values={values}
          onChange={(vals) => setValues([vals[0], vals[1]])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-1.5 w-full rounded-full"
              style={{
                ...props.style,
                background: getTrackBackground({
                  values,
                  colors: ["#e5e7eb", "#f59e0b", "#e5e7eb"],
                  min: 0,
                  max: 180,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => {
            const { key, ...rest } = props;
            return <div key={key} {...rest} className="h-4 w-4 bg-white border-2 border-amber-500 shadow rounded-full focus:outline-none" />;
          }}
        />
      </div>

      <div className="flex items-center gap-2 mt-5">
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-2 text-xs text-gray-400">$</span>
          <input
            type="number"
            value={values[0]}
            onChange={handleMinChange}
            className="w-full pl-6 pr-2 py-1.5 text-xs rounded-md border border-gray-200 outline-none focus:border-black"
          />
        </div>
        <span className="text-xs text-gray-400">to</span>
        <div className="relative flex-1">
          <span className="absolute left-2.5 top-2 text-xs text-gray-400">$</span>
          <input
            type="number"
            value={values[1]}
            onChange={handleMaxChange}
            className="w-full pl-6 pr-2 py-1.5 text-xs rounded-md border border-gray-200 outline-none focus:border-black"
          />
        </div>
      </div>

      <button
        type="button"
        className="w-full mt-3 py-2 bg-gray-900 text-white rounded-md text-xs font-semibold hover:bg-black transition-colors"
      >
        Apply Filter
      </button>
    </div>
  );
}