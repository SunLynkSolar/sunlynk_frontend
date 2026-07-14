"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Sun, Phone, MapPin, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const POPUP_INTERVAL_MS = 60_000; // 1 minute interval
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface FormState {
  fullName: string;
  whatsappNumber: string;
  pinCode: string;
}

export default function PopupForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [form, setForm] = useState<FormState>({ fullName: "", whatsappNumber: "", pinCode: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 266,
    hours: 3,
    minutes: 37,
    seconds: 0,
  });

  useEffect(() => {
    if (!isVisible) return;
    setMounted(true);

    const targetTime = new Date("2027-03-31T23:59:59").getTime();

    const calculateTimeLeft = () => {
      const difference = targetTime - Date.now();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Set initial
    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const openPopup = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsAnimating(true), 3000); // Trigger CSS enter animation
  }, []);

  const closePopup = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300); // Wait for CSS leave animation
  }, []);

  useEffect(() => {
    if (isVisible) return;

    // Do not show the popup if the user has already successfully submitted it
    try {
      if (localStorage.getItem("sunlynk_popup_submitted") === "true") return;
    } catch (e) {
      console.error(e);
    }

    const timer = setTimeout(openPopup, POPUP_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [isVisible, openPopup]);

  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isVisible, closePopup]);

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
          type: "popup",
          fullName: form.fullName.trim(),
          whatsappNumber: form.whatsappNumber.trim(),
          pinCode: form.pinCode.trim(),
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      // Mark popup as successfully submitted in localStorage
      try {
        localStorage.setItem("sunlynk_popup_submitted", "true");
      } catch (e) {
        console.error(e);
      }

      setStatus("success");
      setTimeout(() => {
        closePopup();
      }, 2500);
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] transition-all duration-300 ${isAnimating ? "bg-black/60 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"
          }`}
        onClick={closePopup}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-form-title"
        className={`fixed z-[9999] inset-0 flex items-center justify-center p-4 pointer-events-none`}
      >
        <div
          className={`
            pointer-events-auto relative w-full max-w-[820px] rounded-2xl overflow-hidden
            shadow-[0_32px_80px_-8px_rgba(0,0,0,0.55)]
            flex flex-col md:flex-row
            transition-all duration-300 ease-out
            ${isAnimating
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-6"
            }
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ─── Left Panel: Image + headline ─── */}
          <div className="relative md:w-[42%] flex-shrink-0 min-h-[260px] md:min-h-[auto] overflow-hidden bg-emerald-900">
            <Image
              src="/new_assets/popupImage.webp"
              alt="Get a free solar quote - SunLynk Solar"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark gradient overlay for superior text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/20" />

            {/* Content on image */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6.5 z-10">
              {/* Top tag */}
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-400 shadow-md animate-pulse">
                  <Sun size={14} className="text-emerald-950 fill-emerald-950" />
                </div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-black/45 px-2 py-0.5 rounded border border-white/5">
                  Avail Government Solar Subsidy
                </span>
              </div>

              {/* Bottom text + Timer */}
              <div className="flex flex-col gap-3">
                <div>
                  <h2
                    id="popup-form-title"
                    className="text-xl md:text-2xl font-black text-white leading-tight"
                  >
                    Get up to <span className="text-amber-400 font-extrabold">₹1.8 Lakhs</span> in Government Subsidy!
                  </h2>
                  <p className="text-[11px] text-white/85 mt-1 leading-normal">
                    Avail government solar subsidy before 31 March 2027 and get benefits of ₹1.8 Lakhs today before it expires!
                  </p>
                </div>

                {/* Subsidiy Countdown Timer widget */}
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-3.5 border border-white/10 flex flex-col gap-2 shadow-inner">
                  <span className="text-[9px] font-bold text-white/50 tracking-wider uppercase block">
                    Subsidy Offer Expires In:
                  </span>

                  <div className="grid grid-cols-4 gap-1.5 text-center">
                    <div className="bg-black/35 rounded-lg py-1 px-1 flex flex-col items-center">
                      <span className="text-base font-black text-white tracking-tight tabular-nums leading-none">
                        {mounted ? String(timeLeft.days).padStart(2, "0") : "30"}
                      </span>
                      <span className="text-[8px] font-bold text-white/40 tracking-wider mt-0.5 uppercase">Days</span>
                    </div>
                    <div className="bg-black/35 rounded-lg py-1 px-1 flex flex-col items-center">
                      <span className="text-base font-black text-white tracking-tight tabular-nums leading-none">
                        {mounted ? String(timeLeft.hours).padStart(2, "0") : "00"}
                      </span>
                      <span className="text-[8px] font-bold text-white/40 tracking-wider mt-0.5 uppercase">Hrs</span>
                    </div>
                    <div className="bg-black/35 rounded-lg py-1 px-1 flex flex-col items-center">
                      <span className="text-base font-black text-white tracking-tight tabular-nums leading-none">
                        {mounted ? String(timeLeft.minutes).padStart(2, "0") : "00"}
                      </span>
                      <span className="text-[8px] font-bold text-white/40 tracking-wider mt-0.5 uppercase">Mins</span>
                    </div>
                    <div className="bg-black/35 rounded-lg py-1 px-1 flex flex-col items-center">
                      <span className="text-base font-black text-amber-400 tracking-tight tabular-nums leading-none animate-pulse">
                        {mounted ? String(timeLeft.seconds).padStart(2, "0") : "00"}
                      </span>
                      <span className="text-[8px] font-bold text-white/40 tracking-wider mt-0.5 uppercase">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="hidden flex-wrap gap-1.5 mt-1 lg:flex">
                  {["25yr Warranty", "Govt Approved", "Subsidy Support up to 1.8Lakhs"].map((badge) => (
                    <span
                      key={badge}
                      className="text-[9px] font-bold text-white/80 bg-white/10 border border-white/10 rounded px-2 py-0.5 backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Panel: Form ─── */}
          <div className="relative flex-1 bg-white flex flex-col">
            {/* Close button */}
            <button
              id="popup-close-btn"
              onClick={closePopup}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-all duration-200 z-10"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>

            <div className="p-6 md:p-8 flex flex-col h-full">
              {status === "success" ? (
                /* ── Success State ── */
                <div className="flex flex-col items-center justify-center flex-1 text-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900">Thank You! 🎉</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                      Our solar expert will contact you on WhatsApp shortly.
                    </p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-xs text-emerald-700 font-medium">
                    Expect a call within <strong>24 hours</strong>.
                  </div>
                </div>
              ) : (
                /* ── Form State ── */
                <>
                  <div className="mb-5">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
                      Quick Enquiry
                    </p>
                    <h3 className="text-xl font-extrabold text-gray-900 leading-snug">
                      Start Saving on Solar Today
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill in your details — our expert will reach out via WhatsApp.
                    </p>
                  </div>

                  <form
                    id="popup-lead-form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-4 flex-1"
                  >
                    {/* Name Field */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="popup-fullName"
                        className="text-xs font-bold text-gray-600 flex items-center gap-1.5"
                      >
                        <User size={12} className="text-emerald-600" />
                        Full Name
                      </label>
                      <input
                        id="popup-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.fullName}
                        onChange={handleChange}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200
                          focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-500
                          ${errors.fullName
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                          }
                        `}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-red-500 font-medium">{errors.fullName}</p>
                      )}
                    </div>

                    {/* WhatsApp Field */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="popup-whatsappNumber"
                        className="text-xs font-bold text-gray-600 flex items-center gap-1.5"
                      >
                        <Phone size={12} className="text-emerald-600" />
                        WhatsApp Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-sm font-semibold select-none">
                          🇮🇳 +91
                        </span>
                        <input
                          id="popup-whatsappNumber"
                          name="whatsappNumber"
                          type="tel"
                          autoComplete="tel"
                          inputMode="numeric"
                          placeholder="98765 43210"
                          value={form.whatsappNumber}
                          onChange={handleChange}
                          maxLength={10}
                          className={`flex-1 h-11 px-3.5 rounded-r-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200
                            focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-500
                            ${errors.whatsappNumber
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 bg-gray-50 hover:border-gray-300"
                            }
                          `}
                        />
                      </div>
                      {errors.whatsappNumber && (
                        <p className="text-[11px] text-red-500 font-medium">{errors.whatsappNumber}</p>
                      )}
                    </div>

                    {/* Pincode Field */}
                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="popup-pinCode"
                        className="text-xs font-bold text-gray-600 flex items-center gap-1.5"
                      >
                        <MapPin size={12} className="text-emerald-600" />
                        Pincode
                      </label>
                      <input
                        id="popup-pinCode"
                        name="pinCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        placeholder="e.g. 226001"
                        value={form.pinCode}
                        onChange={handleChange}
                        maxLength={6}
                        className={`w-full h-11 px-3.5 rounded-lg border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200
                          focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-500
                          ${errors.pinCode
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300"
                          }
                        `}
                      />
                      {errors.pinCode && (
                        <p className="text-[11px] text-red-500 font-medium">{errors.pinCode}</p>
                      )}
                    </div>

                    {/* Error Message */}
                    {status === "error" && (
                      <p className="text-xs text-red-500 font-medium bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {errorMsg}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      id="popup-submit-btn"
                      type="submit"
                      disabled={status === "loading"}
                      className={`mt-auto w-full h-12 rounded-xl font-extrabold text-sm text-white flex items-center justify-center gap-2
                        transition-all duration-200 shadow-md
                        ${status === "loading"
                          ? "bg-emerald-400 cursor-not-allowed"
                          : "bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] hover:shadow-lg hover:shadow-emerald-600/25"
                        }
                      `}
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

                    {/* Privacy note */}
                    <p className="text-center text-[10px] text-gray-400 leading-relaxed">
                      🔒 Your details are safe. No spam, ever.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
