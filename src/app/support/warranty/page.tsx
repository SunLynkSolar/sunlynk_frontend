"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ShieldAlert, Send, Loader2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Warranty() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    productSerial: "",
    purchaseDate: "",
    issueDescription: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/warranty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit warranty claim");
      }
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        productSerial: "",
        purchaseDate: "",
        issueDescription: "",
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Customer Support</span>
          <h1 className="text-3xl md:text-5xl font-black">Warranty Claims</h1>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-400">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span>Support</span>
            <span>/</span>
            <span className="text-white">Warranty Claims</span>
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-1000 border border-gray-100 p-8 rounded-2xl shadow-lg text-left">
            <div className="flex items-center gap-3 text-red-600 mb-6">
              <ShieldAlert size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Register a Warranty Claim</h2>
            </div>

            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              If your solar module, inverter, or weather station sensor is showing defects or performance drop under the warranty period, please fill out this claim form. Our service engineers will verify the claim criteria and contact you for replacement or repair service.
            </p>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm py-3.5 px-4 rounded-xl">
                {error}
              </div>
            )}

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary border border-primary/25 rounded-full flex items-center justify-center mb-3">
                  <Check size={24} />
                </div>
                <h4 className="font-bold text-lg text-gray-800">Claim Registered Successfully!</h4>
                <p className="text-sm text-gray-500 mt-1">Our support staff will get in touch with you within 24 to 48 business hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs font-bold text-primary hover:underline"
                >
                  Submit another claim
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Contact Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter contact name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-primary text-gray-800 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-primary text-gray-800 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-primary text-gray-800 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="productSerial" className="text-sm font-semibold text-gray-700">Product Model / Serial Number</label>
                    <input
                      type="text"
                      id="productSerial"
                      placeholder="e.g. DMEGC DM610 / S/N: 29384729"
                      value={formData.productSerial}
                      onChange={handleChange}
                      required
                      className="border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-primary text-gray-800 bg-white"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="purchaseDate" className="text-sm font-semibold text-gray-700">Purchase / Installation Date</label>
                  <input
                    type="date"
                    id="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:border-primary text-gray-800 bg-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="issueDescription" className="text-sm font-semibold text-gray-700">Detailed Defect / Issue Description</label>
                  <textarea
                    id="issueDescription"
                    rows={4}
                    placeholder="Describe the issue, degradation, or defect in detail..."
                    value={formData.issueDescription}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:border-primary text-gray-800 resize-none bg-white"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  <span>{loading ? "Submitting..." : "Register Claim"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
