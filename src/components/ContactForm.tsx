"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, HelpCircle, ArrowRight, ArrowUpRight, Phone, Mail, FileSpreadsheet, FileText, Info } from "lucide-react";

type Tab = "residential" | "society" | "commercial";

type ContactFormProps = {
  hideTabs?: boolean;
  defaultTab?: Tab;
};

export default function ContactForm({ hideTabs = false, defaultTab = "residential" }: ContactFormProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hideTabs) {
      setActiveTab(defaultTab);
      return;
    }
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "residential" || tabParam === "society" || tabParam === "commercial") {
        setActiveTab(tabParam as Tab);
      } else {
        setActiveTab(defaultTab);
      }
    }
  }, [defaultTab, hideTabs]);

  // Form State: Residential
  const [resForm, setResForm] = useState({
    fullName: "",
    whatsappNumber: "",
    pinCode: "",
    monthlyBill: "",
    agreed: true,
  });

  // Form State: Housing Society
  const [socForm, setSocForm] = useState({
    fullName: "",
    societyName: "",
    whatsappNumber: "",
    pinCode: "",
    monthlyBill: "",
    agmStatus: "",
    designation: "",
    agreed: true,
  });

  // Form State: Commercial
  const [comForm, setComForm] = useState({
    fullName: "",
    companyName: "",
    city: "",
    pinCode: "",
    whatsappNumber: "",
    monthlyBill: "",
    agreed: true,
  });

  const submitLead = async (formData: any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit lead");
      }
      return true;
    } catch (error: any) {
      console.error("Lead submission error:", error);
      alert(`Submission Error: ${error.message || "Something went wrong"}`);
      return false;
    }
  };

  const handleResSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resForm.monthlyBill) {
      alert("Please select your monthly electricity bill range.");
      return;
    }

    const success = await submitLead({
      type: "residential",
      fullName: resForm.fullName,
      whatsappNumber: resForm.whatsappNumber,
      pinCode: resForm.pinCode,
      monthlyBill: resForm.monthlyBill,
    });

    if (success) {
      setSubmitted(true);
      setResForm({
        fullName: "",
        whatsappNumber: "",
        pinCode: "",
        monthlyBill: "",
        agreed: true,
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 300000);
    }
  };

  const handleSocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socForm.designation) {
      alert("Please select your designation in the society.");
      return;
    }

    const success = await submitLead({
      type: "society",
      fullName: socForm.fullName,
      societyName: socForm.societyName,
      whatsappNumber: socForm.whatsappNumber,
      pinCode: socForm.pinCode,
      monthlyBill: socForm.monthlyBill,
      agmStatus: socForm.agmStatus,
      designation: socForm.designation,
    });

    if (success) {
      setSubmitted(true);
      setSocForm({
        fullName: "",
        societyName: "",
        whatsappNumber: "",
        pinCode: "",
        monthlyBill: "",
        agmStatus: "",
        designation: "",
        agreed: true,
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 300000);
    }
  };

  const handleComSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitLead({
      type: "commercial",
      fullName: comForm.fullName,
      companyName: comForm.companyName,
      city: comForm.city,
      pinCode: comForm.pinCode,
      whatsappNumber: comForm.whatsappNumber,
      monthlyBill: comForm.monthlyBill,
    });

    if (success) {
      setSubmitted(true);
      setComForm({
        fullName: "",
        companyName: "",
        city: "",
        pinCode: "",
        whatsappNumber: "",
        monthlyBill: "",
        agreed: true,
      });
      setTimeout(() => {
        setSubmitted(false);
      }, 300000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Tabs Container */}
      {!hideTabs && (
        <div className="bg-gray-100 p-1.5 rounded-full flex w-full max-w-lg mx-auto mb-2 shadow-inner border border-gray-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab("residential");
              setSubmitted(false);
            }}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold text-center transition-all duration-300 cursor-pointer ${activeTab === "residential"
              ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
              : "text-gray-500 hover:text-gray-800"
              }`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("society");
              setSubmitted(false);
            }}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold text-center transition-all duration-300 cursor-pointer ${activeTab === "society"
              ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
              : "text-gray-500 hover:text-gray-800"
              }`}
          >
            Housing Society
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("commercial");
              setSubmitted(false);
            }}
            className={`flex-1 py-2.5 px-4 rounded-full text-sm font-bold text-center transition-all duration-300 cursor-pointer ${activeTab === "commercial"
              ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
              : "text-gray-500 hover:text-gray-800"
              }`}
          >
            Commercial
          </button>
        </div>
      )}

      {/* Main Form Content Card */}
      <div className="bg-[#F8FAFC] p-6 md:p-8 text-left text-gray-900 relative rounded-3xl">
        {submitted ? (
          <div className="py-8 md:py-12 px-4 text-center">
            {/* Header Success Section */}
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mb-5 animate-pulse shadow-md shadow-emerald-500/10">
                <Check size={40} className="stroke-[2.5]" />
              </div>
              <h4 className="font-black text-2xl md:text-3xl text-slate-900 tracking-tight">Consultation Booked!</h4>
              <p className="text-sm text-slate-500 mt-2.5 max-w-md leading-relaxed font-medium">
                Thank you for choosing SunLynk Solar. We have successfully registered your inquiry and reserved a consultation slot.
              </p>
            </div>

            {/* Next Steps Timeline
            <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 shadow-sm">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-left mb-6 flex items-center gap-1.5">
                <Info size={14} className="text-primary" />
                What Happens Next?
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left relative">
                <div className="flex gap-4 md:flex-col md:gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md shadow-emerald-500/20">
                    ✓
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-slate-900">Request Logged</h6>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Your technical parameters are logged in our secure console.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:flex-col md:gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
                    2
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-slate-900">Expert Assigned</h6>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Our system is allocating a certified technician in your region.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:flex-col md:gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                    3
                  </div>
                  <div>
                    <h6 className="font-bold text-sm text-slate-900">Expert Connect</h6>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      We will contact you via WhatsApp/Call to share custom estimates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left mb-8">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">
                Explore Respective Pages while you wait:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <Link
                  href="/solutions/homes"
                  className="group bg-white border border-slate-100 hover:border-primary/30 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.01] flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition-colors">
                      Residential Solar
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      Explore solar systems for your home
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/solutions/commercial"
                  className="group bg-white border border-slate-100 hover:border-primary/30 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.01] flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition-colors">
                      Commercial Solar
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      Explore solar solutions for businesses
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/blog"
                  className="group bg-white border border-slate-100 hover:border-primary/30 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.01] flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition-colors">
                      Read Our Blog
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      Latest solar tech insights & subsidy updates
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                </Link>

                <Link
                  href="/about"
                  className="group bg-white border border-slate-100 hover:border-primary/30 p-4 rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.01] flex justify-between items-center cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 block group-hover:text-primary transition-colors">
                      About SunLynk
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      Learn about our mission and solar footprint
                    </span>
                  </div>
                  <ArrowUpRight size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
                </Link>
              </div>
            </div> */}

            {/* Direct Contacts Footer */}
            <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-500">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-primary hover:text-primary-hover underline font-bold cursor-pointer"
              >
                Book another consultation
              </button>
              <div className="flex items-center gap-4">
                <a
                  href="mailto:info@sunlynksolar.com"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Mail size={14} className="text-primary" />
                  <span>info@sunlynksolar.com</span>
                </a>
                <a
                  href="tel:+918573003001"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Phone size={14} className="text-primary" />
                  <span>+91 8573003001</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Form Headers */}
            {activeTab === "residential" && (
              <div className="mb-6 flex flex-col gap-1.5">
                <h3 className="text-xl md:text-2xl font-black text-gray-900">
                  Book a Free Consultation
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                  Get genuine advice from our solar experts. No pressure, book only if you are satisfied!
                </p>
              </div>
            )}
            {activeTab === "society" && (
              <div className="mb-6 flex flex-col gap-1.5">
                <h3 className="text-xl md:text-2xl font-black text-gray-900">
                  Housing Society Solar
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                  Power common utilities, elevators, and streetlights with clean, high-savings solar.
                </p>
              </div>
            )}
            {activeTab === "commercial" && (
              <div className="mb-6 flex flex-col gap-1.5">
                <h3 className="text-xl md:text-2xl font-black text-gray-900">
                  Commercial Solar Solutions
                </h3>
                <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                  Reduce business operational costs and meet clean energy goals with solar.
                </p>
              </div>
            )}

            {/* RESIDENTIAL FORM */}
            {activeTab === "residential" && (
              <form onSubmit={handleResSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={resForm.fullName}
                    onChange={(e) => setResForm({ ...resForm, fullName: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                {/* WhatsApp & PIN Code Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Whatsapp Number"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit number"
                    required
                    value={resForm.whatsappNumber}
                    onChange={(e) => setResForm({ ...resForm, whatsappNumber: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pin code"
                    required
                    value={resForm.pinCode}
                    onChange={(e) => setResForm({ ...resForm, pinCode: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Monthly Bill Dropdown Select */}
                <div className="flex flex-col gap-1">
                  <select
                    required
                    value={resForm.monthlyBill}
                    onChange={(e) => setResForm({ ...resForm, monthlyBill: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm font-medium"
                  >
                    <option value="" disabled>Monthly Electricity Bill*</option>
                    <option value="Less than ₹1500">Less than ₹1,500</option>
                    <option value="₹1500 - ₹2500">₹1,500 - ₹2,500</option>
                    <option value="₹2500 - ₹4000">₹2,500 - ₹4,000</option>
                    <option value="₹4000 - ₹8000">₹4,000 - ₹8,000</option>
                    <option value="More than ₹8000">More than ₹8,000</option>
                  </select>
                </div>

                {/* Agreement */}
                <div className="flex items-start gap-2.5 mt-1">
                  <input
                    type="checkbox"
                    id="res-agreed"
                    required
                    checked={resForm.agreed}
                    onChange={(e) => setResForm({ ...resForm, agreed: e.target.checked })}
                    className=" h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="res-agreed" className="text-xs text-gray-500 leading-tight font-medium cursor-pointer">
                    I agree to SunLynk Solar <Link href="/terms" className="text-primary hover:text-primary-hover underline font-semibold">Terms of use</Link> and <Link href="/privacy" className="text-primary hover:text-primary-hover underline font-semibold">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="relative mt-2">
                  {/* <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full absolute -top-3.5 right-4 z-10 shadow-sm border border-amber-250">
                    Limited slots only!
                  </span> */}
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-6 rounded-xl text-center shadow-lg transition-all hover:scale-[1.01] active:scale-95 text-sm flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Submit Now</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}

            {/* HOUSING SOCIETY FORM */}
            {activeTab === "society" && (
              <form onSubmit={handleSocSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={socForm.fullName}
                    onChange={(e) => setSocForm({ ...socForm, fullName: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Name of the Housing Society*"
                    required
                    value={socForm.societyName}
                    onChange={(e) => setSocForm({ ...socForm, societyName: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Whatsapp Number"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit number"
                    required
                    value={socForm.whatsappNumber}
                    onChange={(e) => setSocForm({ ...socForm, whatsappNumber: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pin code"
                    required
                    value={socForm.pinCode}
                    onChange={(e) => setSocForm({ ...socForm, pinCode: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    required
                    value={socForm.monthlyBill}
                    onChange={(e) => setSocForm({ ...socForm, monthlyBill: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm font-medium"
                  >
                    <option value="" disabled>Monthly Electricity Bill*</option>
                    <option value="Less than ₹10k">Less than ₹10,000</option>
                    <option value="₹10k - ₹30k">₹10,000 - ₹30,000</option>
                    <option value="₹30k - ₹50k">₹30,000 - ₹50,000</option>
                    <option value="More than ₹50k">More than ₹50,000</option>
                  </select>

                  <select
                    required
                    value={socForm.agmStatus}
                    onChange={(e) => setSocForm({ ...socForm, agmStatus: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm font-medium"
                  >
                    <option value="" disabled>AGM Approval Status*</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending AGM">Pending AGM</option>
                    <option value="Not discussed yet">Not discussed yet</option>
                  </select>
                </div>

                {/* Society Designation Choice Buttons */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    What is your Designation in the Society?*
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {[
                      "Management committee member",
                      "Resident",
                      "Builder",
                      "Facility Manager",
                    ].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSocForm({ ...socForm, designation: role })}
                        className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${socForm.designation === role
                          ? "border-primary bg-primary/8 text-primary shadow-sm scale-[1.01]"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-1000 hover:border-gray-300"
                          }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Agreement */}
                <div className="flex items-start gap-2.5 mt-2">
                  <input
                    type="checkbox"
                    id="soc-agreed"
                    required
                    checked={socForm.agreed}
                    onChange={(e) => setSocForm({ ...socForm, agreed: e.target.checked })}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="soc-agreed" className="text-xs text-gray-500 leading-tight font-medium cursor-pointer">
                    I agree to SunLynk Solar <Link href="/terms" className="text-primary hover:text-primary-hover underline font-semibold">Terms of use</Link> and <Link href="/privacy" className="text-primary hover:text-primary-hover underline font-semibold">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="relative mt-4">
                  <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full absolute -top-3.5 right-4 z-10 shadow-sm border border-amber-250">
                    Limited slots only!
                  </span>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-6 rounded-xl text-center shadow-lg transition-all hover:scale-[1.01] active:scale-95 text-sm flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}

            {/* COMMERCIAL FORM */}
            {activeTab === "commercial" && (
              <form onSubmit={handleComSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={comForm.fullName}
                    onChange={(e) => setComForm({ ...comForm, fullName: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    placeholder="Company Name*"
                    required
                    value={comForm.companyName}
                    onChange={(e) => setComForm({ ...comForm, companyName: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={comForm.city}
                    onChange={(e) => setComForm({ ...comForm, city: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                  <input
                    type="text"
                    placeholder="PIN Code"
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pin code"
                    required
                    value={comForm.pinCode}
                    onChange={(e) => setComForm({ ...comForm, pinCode: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Whatsapp Number"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit number"
                    required
                    value={comForm.whatsappNumber}
                    onChange={(e) => setComForm({ ...comForm, whatsappNumber: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                  <input
                    type="text"
                    placeholder="Monthly Bill"
                    required
                    value={comForm.monthlyBill}
                    onChange={(e) => setComForm({ ...comForm, monthlyBill: e.target.value })}
                    className="bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full shadow-sm placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Agreement */}
                <div className="flex items-start gap-2.5 mt-2">
                  <input
                    type="checkbox"
                    id="com-agreed"
                    required
                    checked={comForm.agreed}
                    onChange={(e) => setComForm({ ...comForm, agreed: e.target.checked })}
                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="com-agreed" className="text-xs text-gray-500 leading-tight font-medium cursor-pointer">
                    I agree to SunLynk Solar <Link href="/terms" className="text-primary hover:text-primary-hover underline font-semibold">Terms of use</Link> and <Link href="/privacy" className="text-primary hover:text-primary-hover underline font-semibold">Privacy Policy</Link>.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="relative mt-4">
                  <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] font-black uppercase tracking-wider py-1 px-3 rounded-full absolute -top-3.5 right-4 z-10 shadow-sm border border-amber-250">
                    Limited slots only!
                  </span>
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-4 px-6 rounded-xl text-center shadow-lg transition-all hover:scale-[1.01] active:scale-95 text-sm flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Submit Details</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
