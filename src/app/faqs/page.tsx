"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ChevronUp, Search, Info, ShieldCheck, HelpCircle as HelpIcon, Sparkles } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  cat: "general" | "safety" | "subsidies" | "technical";
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const faqs: FAQItem[] = [
    {
      q: "What is Sunlynk?",
      a: "Sunlynk is an end-to-end solar project execution company. We design, install, and look after all the government paperwork for both residential, commercial, and housing societies, ensuring a seamless energy transition.",
      cat: "general"
    },
    {
      q: "Why solar and is it safe?",
      a: "Solar energy is a clean, renewable, and sustainable power source that reduces your grid electricity dependencies, saving you up to 90% on monthly utility bills. Yes, solar is extremely safe. We use high-quality, certified Tier-1 equipment, fire-resistant DC cabling, professional dual-earthing protection, and surge protection devices (SPDs) to ensure maximum safety.",
      cat: "safety"
    },
    {
      q: "Why choose SunLynk?",
      a: "We handle everything for you end-to-end: customized solar design engineering, precision installation, government subsidy paperwork, financing assistance, and even offer you a comprehensive 5-year free maintenance package for complete peace of mind.",
      cat: "general"
    },
    {
      q: "How does the solar subsidy scheme work in India?",
      a: "Under the PM Surya Ghar Muft Bijli Yojana, residential homeowners are eligible for significant government subsidies. For systems up to 2kW, the subsidy is ₹30,000 per kW. For 3kW, the subsidy is ₹1,08,000. For commercial and housing societies, other rules and accelerated depreciation benefits apply. SunLynk handles all the registration, documentation, and Discom inspection paperwork to ensure the subsidy is directly credited to your account.",
      cat: "subsidies"
    },
    {
      q: "What is net metering and how does it save money?",
      a: "Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid. When your solar panels generate more electricity than you consume, the excess power is exported back to the state electricity grid. Your utility bill is then calculated based on the 'net' energy consumed (Import minus Export).",
      cat: "technical"
    },
    {
      q: "What is the expected lifespan of solar panels?",
      a: "Standard Tier-1 monocrystalline solar modules have an operational lifespan of 25 to 30 years. Most panels come with a linear performance warranty guaranteeing at least 80% of original power output at the 25-year mark.",
      cat: "technical"
    },
    {
      q: "Do solar panels generate electricity on cloudy or rainy days?",
      a: "Yes, solar panels still generate electricity on cloudy, overcast, or rainy days, but at a reduced capacity (typically 10% to 25% of their peak output). The panels absorb daylight, not just direct sunlight, so power generation continues throughout the daytime.",
      cat: "safety"
    },

  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "safety", name: "Safety & Reliability" },
    { id: "subsidies", name: "Subsidies & Billing" },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.cat === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Page Header */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: "url(/assets/images/backgrounds/page-header-bg-1-1.webp)" }}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center max-w-3xl">
          <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2 font-mono">
            Support Center
          </span>
          <h1 className="text-4xl md:text-5xl font-black">Frequently Asked Questions</h1>
          <p className="mt-3 text-sm text-gray-400">
            Find answers to common questions about solar panel installation, safety, net metering and government subsidies.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">FAQs</span>
          </div>
        </div>
      </section>

      {/* Main content section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Search bar row */}
          <div className="max-w-2xl mx-auto mb-12 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search solar questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Category Filters */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Categories
              </h3>
              <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenIndex(0); // Reset accordion to first item in new list
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left whitespace-nowrap lg:whitespace-normal shrink-0 ${activeCategory === cat.id
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                      }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Accordions */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-50/50 transition-colors"
                      >
                        <h4 className="font-extrabold text-slate-900 text-sm md:text-base leading-snug flex items-start gap-2.5">
                          <HelpIcon className="text-primary shrink-0 mt-0.5" size={16} />
                          {faq.q}
                        </h4>
                        {isOpen ? (
                          <ChevronUp className="text-primary shrink-0 ml-4" size={18} />
                        ) : (
                          <ChevronDown className="text-slate-400 shrink-0 ml-4" size={18} />
                        )}
                      </button>
                      <div
                        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0 pointer-events-none"
                          } overflow-hidden`}
                      >
                        <div className="p-6 text-sm text-slate-600 leading-relaxed text-justify">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400">
                  <Info className="mx-auto text-slate-300 mb-3" size={36} />
                  <p className="text-sm font-semibold">No questions found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                    className="text-primary font-bold text-xs hover:underline mt-2"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* SEO Trust Features */}
      <section className="py-16 bg-white border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Certified Equipment</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  We use Tier-1 solar modules and smart micro-inverters complying with IEC/BIS safety certifications in India.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">End-to-End Handling</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  From rooftop shadow modeling to structural installation and Discom liaisoning, we handle the entire process.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <HelpCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm">5-Year Free Maintenance</h4>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Our service support includes free module washing guidance, regular inverter calibrations, and electrical checks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
