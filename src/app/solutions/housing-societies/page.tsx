import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { CheckCircle, ArrowRight, Sun, ShieldCheck, Zap, Sparkles, Phone, Mail, Building, Users, Award, ShieldAlert, Check, ArrowUp, Droplet, Lightbulb, Dumbbell, Car, Shield } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SocietyCalculator from "@/components/SocietyCalculator";
import FaqAccordion from "@/components/FaqAccordion";
import SocietySolutionsSelector from "@/components/SocietySolutionsSelector";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";

export const metadata: Metadata = {
  title: "Rooftop Solar Solutions for Housing Societies & RWAs | SunLynk Solar",
  description: "Reduce common-area electricity maintenance costs for elevators, pumps, clubhouses, and lights. SunLynk installs high-efficiency rooftop solar systems for housing societies and apartments.",
  keywords: [
    "housing society solar",
    "RWA solar panels",
    "apartment rooftop solar",
    "net metering housing society",
    "common area solar power",
    "housing society solar subsidy",
    "apartment solar panel installation"
  ],
};

export default function HousingSocietiesPage() {
  const benefits = [
    { title: "Reduced Common-Area Expenses", desc: "Slashing common utility electricity costs for lifts, pumps, and clubhouses by up to 90%." },
    { title: "Lower Maintenance Burden", desc: "Directly translates to a reduced monthly maintenance bill for each resident flat owner." },
    { title: "Increased Sustainability", desc: "Builds a clean, green community reducing carbon emissions and promoting green responsibility." },
    { title: "Long-Term Operational Savings", desc: "Locks in fixed, predictable energy rates shielding the society from utility tariff hikes for 25+ years." },
    { title: "Professional Project Support", desc: "End-to-end management from DISCOM approvals, financial feasibility models, to AGM consensus presentations." }
  ];

  const applications = [
    {
      title: "Lifts & Elevators",
      desc: "Ensures smooth, uninterrupted elevator lift carriage systems operations during high-load daytime hours.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="m9 10 3-3 3 3" />
          <path d="m9 14 3 3 3-3" />
          <path d="M12 7v10" />
        </svg>
      )
    },
    {
      title: "Water Pumping Networks",
      desc: "Offsets high energy consumption of borewells and overhead water distribution pumps.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-11-7-11S5 10.7 5 15a7 7 0 0 0 7 7z" />
          <path d="M12 12v4" />
          <path d="M10 14h4" />
        </svg>
      )
    },
    {
      title: "Common-Area Lighting",
      desc: "Powers lighting networks across common staircases, corridors, lobbies, and compound spaces.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .6 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2v2" />
        </svg>
      )
    },
    {
      title: "Clubhouse Facilities",
      desc: "Offsets heavy electricity loads of common air conditioning, gym gear, and clubhouse utilities.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      title: "Security & Surveillance",
      desc: "Keeps CCTV cameras, guard room hubs, alarms, and gate lighting active 24/7.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      )
    },
    {
      title: "EV Charging Infrastructure",
      desc: "Integrates direct common green charging hubs for electric vehicles in parking areas.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
          <path d="M19 18h-4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
          <path d="M16 12h4" />
          <circle cx="7" cy="16" r="2" />
          <path d="M9 10H5a2 2 0 0 0-2 2v4h6" />
        </svg>
      )
    }
  ];

  const solutions = [
    {
      title: "Society On-Grid Solar Systems",
      desc: "Connected directly to the society's common utility meter. Daytime generation offsets high daytime loads (water pumps, lifts) and credits excess output to the grid.",
      points: ["Best Return on Investment (ROI)", "Direct DISCOM credit clearances", "Lowest operational maintenance"],
      theme: "bg-emerald-50/20 border-emerald-100"
    },
    {
      title: "Society Hybrid Systems with Backup",
      desc: "Combines high-generation rooftop solar panels with emergency battery storage. Ensures that lights, CCTV cameras, elevators, and pumps remain active during power cuts.",
      points: ["Emergency power security", "Uninterrupted lifts & CCTV", "Smart load segregation"],
      theme: "bg-[#f4faf7] border-emerald-150"
    },
  ];

  const faqs = [
    {
      id: 0,
      question: "How do we get society AGM (Annual General Meeting) approval for a solar rooftop system?",
      answer: "We support Residential Welfare Associations (RWA) and committee members throughout the approval phase. Our consultants prepare detailed custom reports, technical designs, and financial projections. We can present these metrics directly to residents during the AGM, addressing all queries regarding structural safety and payback."
    },
    {
      id: 1,
      question: "How is the capital expenditure (CapEx) funded by housing societies?",
      answer: "Most societies fund the installation directly from their existing corpus or reserve fund, recovering the investment in 4 to 5 years. Alternatively, we offer credit and financing options (loans with low EMIs) so the society can transition to solar using monthly savings without depleting reserve funds."
    },
    {
      id: 2,
      question: "Does the installation affect the usability of the society rooftop?",
      answer: "No, we design structural mounts with raised column designs (typically 8 to 10 feet high). This raised structural framework preserves the rooftop surface, allowing residents to use the terrace for walks, community activities, and general leisure."
    },
    {
      id: 3,
      question: "What happens if a resident wants to install solar panels for their individual flat?",
      answer: "Common area solar is connected to the society utility meter to reduce shared expenses. If individual residents want flat-specific solar, the RWA can allocate specific roof sections. The resident can then install net-metered panels connecting directly to their flat's individual meter. SunLynk manages both setups."
    }
  ];

  return (
    <div className="bg-white text-dark min-h-screen">
      <BreadcrumbSchema
        items={[
          { name: "Home", item: "/" },
          { name: "Solutions", item: "/#solutions" },
          { name: "Housing Societies", item: "/solutions/housing-societies" }
        ]}
      />
      <FAQSchema
        items={faqs.map((faq) => ({
          question: faq.question,
          answer: faq.answer
        }))}
      />
      <section className="relative overflow-hidden bg-white">

        {/* ── Desktop-only background image (bottom-left) ── */}
        <div className="absolute left-0 bottom-0 w-[62%] h-[80%] z-0 pointer-events-none overflow-hidden hidden lg:block">
          <Image
            src="/assets/images/handle_rooftop.webp"
            alt="Housing society rooftop solar background"
            fill
            className="object-cover object-bottom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-white" />
        </div>

        {/* ── Desktop-only right panel ── */}
        <div className="absolute top-0 right-0 h-full w-[45%] bg-slate-50/50 hidden lg:block z-0" />

        {/* ── Mobile background tint (very subtle) ── */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 to-white lg:hidden z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-start min-h-[unset] lg:min-h-[600px]">

            {/* ── Left: Headline + badge ── */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 text-left pt-8 sm:pt-10 pb-2 lg:py-16">

              {/* Star badge */}
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-full py-1.5 px-3.5 self-start text-[11px] sm:text-xs font-bold text-slate-600 shadow-sm">
                <span className="text-emerald-600 text-sm leading-none">🏢</span>
                <span>Green Community Living</span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="hidden sm:inline">RWA Support Assured</span>
              </div>

              {/* Headline */}
              <h1 className="text-[2rem] sm:text-4xl lg:text-5xl font-black leading-[1.12] tracking-tight text-slate-950">
                Green Societies.{" "}
                <span className="block sm:inline">
                  <br className="hidden sm:block lg:hidden" />
                  <span className="text-primary">Shared Savings.</span>
                </span>
              </h1>

              {/* Sub-copy */}
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
                Elevate your residential society's infrastructure. Power common-area lights, elevators, pumps, and EV chargers using clean solar energy, reducing maintenance bill overheads for all residents.
              </p>

              {/* Trust pills row — mobile only */}
              <div className="flex flex-wrap gap-2 lg:hidden">
                {["Elevated Frames", "RWA Presentation Pack", "DISCOM Liaison"].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-semibold text-slate-600 bg-slate-100 rounded-full px-3 py-1"
                  >
                    ✓ {t}
                  </span>
                ))}
              </div>

              {/* Corporate Specs HUD layout — desktop only */}
              <div className="hidden lg:grid grid-cols-3 gap-4 mt-4 max-w-xl">
                <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <Building className="text-primary mb-2" size={20} />
                  <span className="block text-slate-950 font-extrabold text-sm">Elevated Frames</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">Raised Columns 8-10ft</span>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <Users className="text-primary mb-2" size={20} />
                  <span className="block text-slate-950 font-extrabold text-sm">AGM Support</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">Presentation Packs</span>
                </div>
                <div className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <ShieldCheck className="text-primary mb-2" size={20} />
                  <span className="block text-slate-950 font-extrabold text-sm">DISCOM Sync</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase mt-0.5">Net Metering clearances</span>
                </div>
              </div>

            </div>

            {/* ── Right: Form card ── */}
            <div className="lg:col-span-5 w-full pt-2 pb-8 sm:pb-10 lg:py-16">
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_32px_rgba(0,0,0,0.10)] border border-slate-200/60 overflow-hidden">
                <ContactForm hideTabs={true} defaultTab="society" />
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Creative Applications Micro-Cards */}
      <section className="relative overflow-hidden py-24 bg-slate-50 border-b border-slate-100">
        {/* Solar Image in Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-15">
          <Image
            src="/assets/images/service/solar_housing_society.webp"
            alt="Solar background layout"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#f8fafc]/85 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 rounded-full py-1 px-3.5 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">Applications</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Shared Facilities We Offset
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed mt-2 font-semibold">
              We design grids targeting primary common utility elements representing the highest share of society expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {applications.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/95 border border-slate-200/60 rounded-2xl p-6 hover:border-emerald-500/35 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-4 text-left group backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100/40 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>



      {/* Key Benefits and USPs */}
      <section className="py-24 bg-gradient-to-br from-[#065F46] via-[#054E39] to-[#033B2B] border-b border-slate-100 relative overflow-hidden">
        {/* Micro-glowing grids background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="absolute left-[-20%] bottom-[-20%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Real Solar Image */}
            <div className="lg:col-span-5 relative w-full group">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="/assets/images/service/solar_housing_society.webp"
                  alt="Housing society rooftop solar layout"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-emerald-950/90 backdrop-blur-md border border-emerald-800/40 rounded-2xl p-4 flex items-center gap-3 max-w-[240px] shadow-2xl">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
                <div>
                  <span className="text-sm font-black text-white leading-none">Elevated Frames</span>
                  <span className="block text-[9px] text-emerald-400/80 font-bold uppercase mt-1">Preserving Rooftop Space</span>
                </div>
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full py-1 px-3.5 shadow-sm self-start">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-300">Benefits</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Why RWAs and Housing Societies Choose SunLynk
                </h2>
                <p className="text-sm text-emerald-100/80 leading-relaxed text-justify">
                  We specialize in community-level solar transitions. From obtaining structural clearances to designing elevated frames and attending AGMs to address resident concerns, we handle the entire project end-to-end.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl shadow-md hover:shadow-2xl hover:border-white/20 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 text-left flex flex-col gap-2.5 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-emerald-900 group-hover:border-white transition-all duration-300">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors">{b.title}</h3>
                      <p className="text-[11px] text-emerald-100/70 group-hover:text-emerald-100 transition-colors leading-relaxed mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Society Solar Sizer Calculator */}
      {/* <SocietyCalculator /> */}

      {/* Real Society Installations */}
      {/* <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 rounded-full py-1 px-3.5 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">Society Portfolio</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Real Society Implementations
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed mt-2">
              Explore actual housing society and apartment rooftop solar installations completed by SunLynk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/60 aspect-[4/3] shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <Image
                src="/assets/images/service/solar_housing_society.webp"
                alt="50kW Society Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-emerald-600 text-white font-extrabold uppercase py-1 px-2.5 rounded-full">50kW On-Grid</span>
                <h4 className="font-extrabold text-base mt-2">Residential Society, Lucknow</h4>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/60 aspect-[4/3] shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <Image
                src="/assets/IMAGE/project/p (5).avif"
                alt="Society Hybrid Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-amber-500 text-slate-950 font-extrabold uppercase py-1 px-2.5 rounded-full">Hybrid Solar</span>
                <h4 className="font-extrabold text-base mt-2">RWA Common-Area Backup Battery</h4>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/60 aspect-[4/3] shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
              <Image
                src="/assets/images/handle_rooftop.webp"
                alt="Elevated Mounting Structure"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-sky-500 text-white font-extrabold uppercase py-1 px-2.5 rounded-full">Elevated Frame</span>
                <h4 className="font-extrabold text-base mt-2">Raised Structural Column Panels</h4>
              </div>
            </div>
          </div>
        </div>
      </section> */}


      {/* Solutions Config */}
      <section className="py-20 bg-slate-50/30 border-y border-slate-100/80" id="society-layouts-hub">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 rounded-full py-1 px-3.5 shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">Configurations</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Community Solar Layouts
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed mt-2 font-semibold">
              Tailored layout engineering integrated directly with multi-flat energy distribution networks and common meters.
            </p>
          </div>

          <SocietySolutionsSelector />

        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-5 text-left flex flex-col gap-4 sticky top-24">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 rounded-full py-1 px-3.5 shadow-sm self-start">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">FAQ</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Frequently Asked Questions</h3>
            <p className="text-sm text-slate-500 leading-relaxed text-justify">
              Critical metrics regarding multi-resident approval procedures, structural clearances, net metering billing splits, and corpus funding plans.
            </p>
            <div className="p-6 bg-slate-50/60 border border-slate-200/60 rounded-3xl flex flex-col gap-3.5 mt-4">
              <span className="font-extrabold text-sm text-slate-800 block">RWA Technical Consultation</span>
              <div className="flex flex-col gap-2">
                <a href="tel:+918573003001" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors">
                  <Phone size={14} className="text-emerald-600" />
                  <span>+91 8573003001</span>
                </a>
                <a href="mailto:info@sunlynksolar.com" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors">
                  <Mail size={14} className="text-emerald-600" />
                  <span>info@sunlynksolar.com</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <FaqAccordion faqs={faqs} />
          </div>

        </div>
      </section>
    </div>
  );
}
