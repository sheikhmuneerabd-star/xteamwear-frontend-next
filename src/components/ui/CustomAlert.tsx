"use client";

import { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";

interface CustomAlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  type?: "loading" | "warning" | "success";
}

export default function CustomAlert({
  isOpen,
  message,
  onClose,
  type = "loading",
}: CustomAlertProps) {
  useEffect(() => {
    if (isOpen && type !== "loading") {
      const timer = setTimeout(() => onClose(), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, type, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900/90 text-white border border-gray-700/60 shadow-2xl rounded-2xl px-6 py-5 max-w-sm w-full flex items-center justify-between gap-4 transition-all transform scale-100">
        <div className="flex items-center gap-3.5">
          {type === "loading" && (
            <ImSpinner2 className="animate-spin text-amber-400 text-2xl shrink-0" />
          )}
          <p className="text-sm font-medium text-gray-100">{message}</p>
        </div>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <IoCloseOutline className="text-xl" />
        </button>
      </div>
    </div>
  );
}