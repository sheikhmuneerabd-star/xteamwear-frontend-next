"use client";

import { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

interface FormData {
  name: string;
  phone: string;
  email: string;
  comment: string;
}

export default function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated submission logic (Replace with your backend endpoint)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", comment: "" });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Got a question, feedback, or need custom designs? We&apos;d love to hear from you! Fill out the form below and our support team will respond within 24 hours.
        </p>
      </div>

      {submitted ? (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
          Thank you for getting in touch! We have received your message and will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+92 300 0000000"
              className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full h-11 rounded-lg border border-gray-300 px-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="comment" className="text-sm font-semibold text-gray-700">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={5}
              value={formData.comment}
              onChange={handleChange}
              placeholder="How can we help you?"
              className="w-full rounded-lg border border-gray-300 p-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 h-12 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 font-bold text-gray-900 text-sm rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin text-base" />
                <span>Sending...</span>
              </>
            ) : (
              "SUBMIT CONTACT"
            )}
          </button>
        </form>
      )}
    </div>
  );
}