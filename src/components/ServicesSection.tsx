"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Users,
  ShieldCheck,
  Clock,
  Percent,
  Coins,
  Briefcase,
  Home as HomeIcon,
  TrendingUp,
  Building2,
  FileText,
  X,
  User,
  Phone,
  MapPin,
  Loader2,
  CheckCircle2,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceConfig {
  label: string;
  type: "residential" | "society" | "commercial";
  redirectUrl: string;
}

interface FormState {
  fullName: string;
  whatsappNumber: string;
  pinCode: string;
}

// ─── Quote Popup ──────────────────────────────────────────────────────────────

function QuotePopup({
  service,
  onClose,
}: {
  service: ServiceConfig;
  onClose: () => void;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    fullName: "",
    whatsappNumber: "",
    pinCode: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);

  // Trigger enter animation after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 280);
  }, [onClose]);

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Name is required";
    if (!form.whatsappNumber.trim()) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.whatsappNumber.replace(/\s/g, ""))) {
      newErrors.whatsappNumber = "Enter a valid 10-digit Indian mobile number";
    }
    if (!form.pinCode.trim()) {
      newErrors.pinCode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pinCode)) {
      newErrors.pinCode = "Enter a valid 6-digit pincode";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: service.type,
          fullName: form.fullName.trim(),
          whatsappNumber: form.whatsappNumber.trim(),
          pinCode: form.pinCode.trim(),
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
      // Redirect after showing success for 1.8 s
      setTimeout(() => {
        handleClose();
        router.push(service.redirectUrl);
      }, 1800);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  const serviceTheme = {
    residential: {
      badge: "🏠 Residential Solar",
      gradient: "from-emerald-700 to-emerald-900",
      accent: "bg-emerald-600",
    },
    society: {
      badge: "🏢 Housing Society Solar",
      gradient: "from-blue-700 to-emerald-800",
      accent: "bg-emerald-600",
    },
    commercial: {
      badge: "🏭 Commercial Solar",
      gradient: "from-slate-700 to-emerald-800",
      accent: "bg-emerald-600",
    },
  }[service.type];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9990] transition-all duration-300 ${visible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"
          }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-popup-title"
        className="fixed inset-0 z-[9991] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className={`pointer-events-auto relative w-full max-w-md rounded-2xl bg-white overflow-hidden shadow-[0_32px_80px_-8px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top gradient header */}
          <div
            className={`relative bg-gradient-to-br ${serviceTheme.gradient} px-6 pt-6 pb-8`}
          >
            {/* Close */}
            <button
              id="quote-popup-close"
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors duration-200"
              aria-label="Close"
            >
              <X size={15} />
            </button>

            {/* Badge + Title */}
            <span className="inline-block text-[10px] font-bold text-emerald-200 uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1 mb-3">
              {serviceTheme.badge}
            </span>
            <h2
              id="quote-popup-title"
              className="text-2xl font-black text-white leading-snug"
            >
              Get Your <span className="text-amber-300">Free</span>{" "}
              {service.label} Quote
            </h2>
            <p className="text-sm text-emerald-100 mt-1.5">
              Fill in your details — our expert will reach out via WhatsApp
              within 24 hours.
            </p>

            {/* Decorative sun */}
            <div className="absolute right-6 bottom-2 w-20 h-20 rounded-full bg-white/5 border border-white/10" />
            <div className="absolute right-10 bottom-6 w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/30" />
          </div>

          {/* Form area */}
          <div className="px-6 py-6">
            {status === "success" ? (
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 size={28} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900">
                    Thank You! 🎉
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Our expert will contact you shortly. Redirecting you to
                    learn more…
                  </p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                  <div className="h-full bg-emerald-500 animate-[progress_1.8s_linear_forwards]" />
                </div>
              </div>
            ) : (
              <form
                id="quote-popup-form"
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4"
              >
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="quote-fullName"
                    className="text-xs font-bold text-gray-600 flex items-center gap-1.5"
                  >
                    <User size={11} className="text-primary" />
                    Full Name
                  </label>
                  <input
                    id="quote-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Rahul Sharma"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`w-full h-11 px-3.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-500 ${errors.fullName
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="quote-whatsappNumber"
                    className="text-xs font-bold text-gray-600 flex items-center gap-1.5"
                  >
                    <Phone size={11} className="text-primary" />
                    WhatsApp Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-sm font-semibold select-none">
                      🇮🇳 +91
                    </span>
                    <input
                      id="quote-whatsappNumber"
                      name="whatsappNumber"
                      type="tel"
                      autoComplete="tel"
                      inputMode="numeric"
                      placeholder="98765 43210"
                      value={form.whatsappNumber}
                      onChange={handleChange}
                      maxLength={10}
                      className={`flex-1 h-11 px-3.5 rounded-r-xl border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-500 ${errors.whatsappNumber
                        ? "border-red-400 bg-red-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}
                    />
                  </div>
                  {errors.whatsappNumber && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="quote-pinCode"
                    className="text-xs font-bold text-gray-600 flex items-center gap-1.5"
                  >
                    <MapPin size={11} className="text-primary" />
                    Pincode
                  </label>
                  <input
                    id="quote-pinCode"
                    name="pinCode"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="e.g. 226001"
                    value={form.pinCode}
                    onChange={handleChange}
                    maxLength={6}
                    className={`w-full h-11 px-3.5 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-500 ${errors.pinCode
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                  />
                  {errors.pinCode && (
                    <p className="text-[11px] text-red-500 font-medium">
                      {errors.pinCode}
                    </p>
                  )}
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  id="quote-popup-submit"
                  type="submit"
                  disabled={status === "loading"}
                  className={`w-full h-12 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${status === "loading"
                    ? "bg-emerald-400 cursor-not-allowed"
                    : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] hover:shadow-lg hover:shadow-emerald-600/25"
                    }`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Get My Free Quote
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-gray-400">
                  🔒 Your details are safe. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar keyframe */}
      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

export default function ServicesSection() {
  const [activeService, setActiveService] = useState<ServiceConfig | null>(null);

  const open = (cfg: ServiceConfig) => setActiveService(cfg);
  const close = useCallback(() => setActiveService(null), []);

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary" />
              <span className="text-base uppercase tracking-wider font-bold text-primary">
                Our Solutions
              </span>
              <span className="h-[2px] w-6 bg-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark">
              Solar for Every Need
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed mt-2">
              From{" "}
              <strong className="text-dark font-semibold">
                Residential Solar in Lucknow
              </strong>{" "}
              to robust{" "}
              <strong className="text-dark font-semibold">
                Housing Society Solar Solutions
              </strong>{" "}
              and setups engineered by a leading{" "}
              <strong className="text-dark font-semibold">
                Commercial Solar EPC Company
              </strong>
              , we design custom systems that slash electricity bills and deliver
              long-term value.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* ── Card 1: Homes ── */}
            <div className="group relative bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden flex flex-col">
              <div className="relative h-65 overflow-hidden">
                <img
                  src="/new_assets/homes.jpeg"
                  alt="Solar panels on a modern home rooftop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 object-bottom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold py-1.5 px-4 rounded-full shadow-md z-10">
                  Save Up to 90%
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <HomeIcon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      Homes
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-primary mt-0.5">
                      Reduce Your Electricity Bill by Up to 90%
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  Perfect for independent houses looking for maximum savings and
                  government subsidies.
                </p>

                <div className="border-t border-dashed border-gray-200 my-1" />

                <div className="grid grid-cols-3 gap-1 py-1 text-left">
                  <SpecItem icon={<Clock size={13} className="stroke-[2.5]" />} top="Payback in" bottom="2-3 Years" border />
                  <SpecItem icon={<ShieldCheck size={13} className="stroke-[2.5]" />} top="25 Years" bottom="Warranty" border />
                  <SpecItem icon={<Percent size={13} className="stroke-[2.5]" />} top="Up to 90%" bottom="Savings" />
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  <button
                    id="homes-get-quote-btn"
                    onClick={() =>
                      open({ label: "Residential", type: "residential", redirectUrl: "/homes" })
                    }
                    className="flex-grow bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-lg text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight size={15} />
                  </button>
                  <Link
                    href="/solutions/homes"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-primary transition-colors duration-300 shrink-0"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="text-primary" />
                  </Link>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 mt-auto">
                  <TrendingUp size={15} className="text-primary shrink-0" />
                  <span className="text-xs font-bold text-gray-700">
                    Best for:{" "}
                    <span className="font-normal text-gray-600">
                      Independent Houses, Villas, Bungalows
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* ── Card 2: Housing Societies ── */}
            <div className="group relative bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden flex flex-col">
              <div className="relative h-auto lg:h-65 overflow-hidden">
                <img
                  src="/new_assets/housingSocities.webp"
                  alt="Housing society with rooftop solar installation"

                  className="object-cover object-bottom group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold py-1.5 px-4 rounded-full shadow-md z-10">
                  Save Lakhs Every Year
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <Building2 size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      Housing Societies
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-primary mt-0.5">
                      Reduce Common Area Costs Significantly
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  Smart solar solutions for RWAs &amp; Apartment Complexes to
                  lower electricity expenses.
                </p>

                <div className="border-t border-dashed border-gray-200 my-1" />

                <div className="grid grid-cols-3 gap-1 py-1 text-left">
                  <SpecItem icon={<Coins size={13} className="stroke-[2.5]" />} top="Save ₹10-50" bottom="Lakhs Annually" border />
                  <SpecItem icon={<Clock size={13} className="stroke-[2.5]" />} top="Payback in" bottom="3 - 5 Years" border />
                  <SpecItem icon={<ShieldCheck size={13} className="stroke-[2.5]" />} top="25 Years" bottom="Warranty" />
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  <button
                    id="society-get-quote-btn"
                    onClick={() =>
                      open({ label: "Society", type: "society", redirectUrl: "/contact" })
                    }
                    className="flex-grow bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-lg text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={15} />
                  </button>
                  <Link
                    href="/solutions/housing-societies"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-primary transition-colors duration-300 shrink-0"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="text-primary" />
                  </Link>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 mt-auto">
                  <Users size={15} className="text-primary shrink-0" />
                  <span className="text-xs font-bold text-gray-700">
                    Best for:{" "}
                    <span className="font-normal text-gray-600">
                      Apartments, RWAs, Gated Communities
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* ── Card 3: Commercial ── */}
            <div className="group relative bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden flex flex-col">
              <div className="relative h-65 overflow-hidden">
                <img
                  src="/new_assets/commercial.webp"
                  alt="Commercial building with solar panel installation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-extrabold py-1.5 px-4 rounded-full shadow-md z-10">
                  Boost Your Profits
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
                    <Briefcase size={22} />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      Commercial
                    </h3>
                    <span className="text-xs sm:text-sm font-bold text-primary mt-0.5">
                      Lower Operating Costs. Increase Profits.
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed min-h-[40px]">
                  High-performance solar systems for factories, warehouses,
                  offices &amp; commercial spaces.
                </p>

                <div className="border-t border-dashed border-gray-200 my-1" />

                <div className="grid grid-cols-3 gap-1 py-1 text-left">
                  <SpecItem icon={<TrendingUp size={13} className="stroke-[2.5]" />} top="ROI in" bottom="3 - 4 Years" border />
                  <SpecItem icon={<FileText size={13} className="stroke-[2.5]" />} top="Tax Benefits" bottom="Available" border />
                  <SpecItem icon={<ShieldCheck size={13} className="stroke-[2.5]" />} top="25 Years" bottom="Warranty" />
                </div>

                <div className="flex items-center justify-between gap-4 mt-2">
                  <button
                    id="commercial-get-quote-btn"
                    onClick={() =>
                      open({ label: "Commercial", type: "commercial", redirectUrl: "/contact" })
                    }
                    className="flex-grow bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-lg text-center text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-emerald-700 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <span>Get Free Consultation</span>
                    <ArrowRight size={15} />
                  </button>
                  <Link
                    href="/solutions/commercial"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-gray-800 hover:text-primary transition-colors duration-300 shrink-0"
                  >
                    <span>Know More</span>
                    <ArrowRight size={14} className="text-primary" />
                  </Link>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100/50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 mt-auto">
                  <Building2 size={15} className="text-primary shrink-0" />
                  <span className="text-xs font-bold text-gray-700">
                    Best for:{" "}
                    <span className="font-normal text-gray-600">
                      Factories, Warehouses, Offices, Hotels
                    </span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quote Popup (mounted outside section so it's not clipped) */}
      {activeService && (
        <QuotePopup service={activeService} onClose={close} />
      )}
    </>
  );
}

// ─── Helper: Spec item ────────────────────────────────────────────────────────

function SpecItem({
  icon,
  top,
  bottom,
  border = false,
}: {
  icon: React.ReactNode;
  top: string;
  bottom: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 pl-1.5 ${border ? "border-r border-gray-100 pr-1" : ""
        }`}
      style={border ? { paddingLeft: 0 } : {}}
    >
      <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-100 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] text-gray-400 font-bold uppercase leading-none">
          {top}
        </span>
        <span className="text-[11px] font-extrabold text-gray-800 mt-0.5 leading-none">
          {bottom}
        </span>
      </div>
    </div>
  );
}
