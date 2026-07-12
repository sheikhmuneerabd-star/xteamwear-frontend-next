"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { IoCloudUploadOutline, IoCloseCircle } from "react-icons/io5";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed");
        setUploading(false);
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith("/") && !trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setError('URL "/" ya "http(s)://" se shuru honi chahiye');
      return;
    }

    setError("");
    onChange(trimmed);
    setUrlInput("");
  };

  if (value) {
    return (
      <div>
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <div className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-300">
          <Image src={value} alt="Uploaded" fill sizes="96px" className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-white rounded-full"
          >
            <IoCloseCircle className="text-red-600 text-xl" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <div className="flex gap-1 mb-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`text-xs px-2 py-1 rounded ${mode === "upload" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`text-xs px-2 py-1 rounded ${mode === "url" ? "bg-black text-white" : "bg-gray-100 text-gray-600"}`}
        >
          Paste URL
        </button>
      </div>

      {mode === "upload" ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-black transition-colors"
        >
          {uploading ? (
            <span className="text-xs text-gray-500">Uploading...</span>
          ) : (
            <>
              <IoCloudUploadOutline className="text-2xl text-gray-500" />
              <span className="text-xs text-gray-500 mt-1">Upload</span>
            </>
          )}
        </div>
      ) : (
        <div className="w-56 space-y-1">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onBlur={handleUrlSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
            placeholder="Paste URL, then click outside or press Enter"
            className="w-full border border-gray-300 rounded-md px-2 py-1.5 text-xs outline-none focus:border-black"
          />
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
      {error && <p className="text-red-600 text-xs mt-1 max-w-[200px]">{error}</p>}
    </div>
  );
}