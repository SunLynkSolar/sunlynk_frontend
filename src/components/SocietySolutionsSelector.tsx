"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sun, 
  Zap, 
  Battery, 
  Check, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Coins, 
  Info,
  Layers,
  Activity,
  CheckCircle2,
  XCircle
} from "lucide-react";

type Tab = "on-grid" | "hybrid";

interface Hotspot {
  id: number;
  x: string; // percentage left
  y: string; // percentage top
  title: string;
  desc: string;
  showOn: Tab[];
}

export default function SocietySolutionsSelector() {
  const [activeTab, setActiveTab] = useState<Tab>("on-grid");
  const [hoveredHotspot, setHoveredHotspot] = useState<number | null>(null);
  const [activeMobileHotspot, setActiveMobileHotspot] = useState<number | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 1,
      x: "35%",
      y: "25%",
      title: "Tier-1 Mono PERC Modules",
      desc: "550W+ high-efficiency half-cut panels optimized for maximum output in tropical weather conditions.",
      showOn: ["on-grid", "hybrid"]
    },
    {
      id: 2,
      x: "55%",
      y: "45%",
      title: "Elevated Structural Frame",
      desc: "8-10 Ft raised hot-dip galvanized columns that preserve 100% of your society's terrace floor space.",
      showOn: ["on-grid", "hybrid"]
    },
    {
      id: 3,
      x: "70%",
      y: "75%",
      title: "Bidirectional Smart Sync",
      desc: "Liaisons with DISCOM for net-metering clearances, sending excess daylight generation back to the grid.",
      showOn: ["on-grid", "hybrid"]
    },
    {
      id: 4,
      x: "82%",
      y: "60%",
      title: "Lithium Ferro Phosphate (LFP) Bank",
      desc: "High-capacity smart battery bank with 10,000+ cycle lifespan to backup heavy loads like lifts and pumps.",
      showOn: ["hybrid"]
    }
  ];

  const specs = {
    "on-grid": [
      { label: "Payback Period", value: "3.5 - 4 Years", icon: Coins, detail: "Fastest return on investment" },
      { label: "DISCOM Approvals", value: "Net-Metering Clearances", icon: ShieldCheck, detail: "All clearances handled by SunLynk" },
      { label: "Common Loads Offset", value: "Lifts, Pumps, Area Lights", icon: Sun, detail: "Covers high daytime utilities" },
      { label: "Average Bill Offset", value: "Up to 90% Savings", icon: Zap, detail: "Drastically lowers RWA maintenance bills" }
    ],
    "hybrid": [
      { label: "Backup Autonomy", value: "8+ Hours Protection", icon: Clock, detail: "Powers critical systems continuously" },
      { label: "Battery Chemistry", value: "Smart LFP Battery Cells", icon: Battery, detail: "Safest lithium chemistry (10+ year life)" },
      { label: "Emergency Coverage", value: "Lifts, CCTV, Water Pumps", icon: Layers, detail: "Seamless switchover under 15ms" },
      { label: "Operational Mode", value: "Solar + Storage Integration", icon: Activity, detail: "Runs off solar + battery during cuts" }
    ]
  };

  const points = {
    "on-grid": [
      "Zero battery maintenance overheads - lowest cost setup.",
      "Automatically credits surplus electricity generated on holidays directly to your grid account.",
      "Fully compatible with DISCOM subsidies for housing society common meters."
    ],
    "hybrid": [
      "Keep elevators, water pumps, and security guards fully active during grid failures.",
      "Integrated Smart BMS (Battery Management System) for safe thermal limits.",
      "Intelligent load segregation to prioritize essential corridors over luxury common utilities."
    ]
  };

  return (
    <div className="w-full">
      {/* ── Tabs Header Selector ── */}
      <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4 max-w-4xl mx-auto mb-12 px-2">
        {/* On-Grid Tab Button */}
        <button
          onClick={() => {
            setActiveTab("on-grid");
            setActiveMobileHotspot(null);
          }}
          className={`flex-1 text-left p-5 rounded-3xl border transition-all duration-300 flex items-start gap-4 outline-none cursor-pointer hover:shadow-md ${
            activeTab === "on-grid"
              ? "bg-white border-emerald-500/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-2 ring-emerald-500/20"
              : "bg-white/50 border-slate-200/80 hover:bg-white hover:border-slate-300"
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
            activeTab === "on-grid" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
          }`}>
            <Sun size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">On-Grid Solar Layout</span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Max Savings</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-semibold">
              Export excess energy to grid. Best suited for societies seeking fastest ROI & lowest maintenance bills.
            </p>
          </div>
        </button>

        {/* Hybrid Tab Button */}
        <button
          onClick={() => {
            setActiveTab("hybrid");
            setActiveMobileHotspot(null);
          }}
          className={`flex-1 text-left p-5 rounded-3xl border transition-all duration-300 flex items-start gap-4 outline-none cursor-pointer hover:shadow-md ${
            activeTab === "hybrid"
              ? "bg-white border-amber-500/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-2 ring-amber-500/20"
              : "bg-white/50 border-slate-200/80 hover:bg-white hover:border-slate-300"
          }`}
        >
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
            activeTab === "hybrid" ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"
          }`}>
            <Battery size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">Hybrid Solar Layout</span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-100">Backup Sourcing</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-semibold">
              Power grid + lithium storage backup. Best for societies facing load shedding that require emergency utility power.
            </p>
          </div>
        </button>
      </div>

      {/* ── Main Layout Column Split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-6xl mx-auto mb-20">
        
        {/* Left Panel: Image Showcase with Hotspots */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-lg group">
            
            {/* Base Image */}
            <Image
              src={activeTab === "on-grid" ? "/assets/images/handle_rooftop.webp" : "/assets/IMAGE/project/p (5).avif"}
              alt={activeTab === "on-grid" ? "On-Grid Community Solar" : "Hybrid Society Battery Backup Setup"}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-102"
              sizes="(max-w-7xl) 100vw, 50vw"
            />
            
            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/20 to-transparent pointer-events-none" />
            
            {/* Interactive Pulse Hotspot Markers */}
            {hotspots
              .filter(h => h.showOn.includes(activeTab))
              .map((spot) => {
                const isHovered = hoveredHotspot === spot.id;
                const isMobileActive = activeMobileHotspot === spot.id;
                const showTooltip = isHovered || isMobileActive;

                return (
                  <div
                    key={spot.id}
                    className="absolute"
                    style={{ left: spot.x, top: spot.y }}
                  >
                    {/* Pulsing Trigger Button */}
                    <button
                      onMouseEnter={() => setHoveredHotspot(spot.id)}
                      onMouseLeave={() => setHoveredHotspot(null)}
                      onClick={() => setActiveMobileHotspot(isMobileActive ? null : spot.id)}
                      className={`relative z-25 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 outline-none hover:scale-110 focus:outline-none ${
                        activeTab === "on-grid" 
                          ? "bg-emerald-500/90 text-white shadow-emerald-500/55" 
                          : "bg-amber-500/90 text-white shadow-amber-500/55"
                      } shadow-lg`}
                      aria-label={`Hotspot details: ${spot.title}`}
                    >
                      <span className={`absolute inline-flex h-full w-full rounded-full opacity-65 animate-ping ${
                        activeTab === "on-grid" ? "bg-emerald-400" : "bg-amber-400"
                      }`} />
                      <Info size={14} className="stroke-[2.5]" />
                    </button>

                    {/* Floating Tooltip Box */}
                    <div
                      className={`absolute z-30 bottom-10 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] bg-slate-950/95 backdrop-blur-md border rounded-2xl p-4 text-left shadow-2xl transition-all duration-300 pointer-events-none ${
                        showTooltip
                          ? "opacity-100 translate-y-0 scale-100 visible"
                          : "opacity-0 translate-y-2 scale-95 invisible"
                      } ${activeTab === "on-grid" ? "border-emerald-500/30" : "border-amber-500/30"}`}
                    >
                      <h5 className={`font-black text-xs ${activeTab === "on-grid" ? "text-emerald-400" : "text-amber-400"}`}>
                        {spot.title}
                      </h5>
                      <p className="text-[10px] text-slate-300 mt-1 leading-relaxed font-semibold">
                        {spot.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            {/* Float HUD Banner at the bottom */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 flex items-center justify-between shadow-lg pointer-events-none">
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Engineering Layout</span>
                <h4 className="font-extrabold text-sm text-slate-800">
                  {activeTab === "on-grid" ? "Net-Metered Common Core" : "Off-grid Battery Resilient Frame"}
                </h4>
              </div>
              <div className={`py-1 px-3 rounded-full text-[10px] font-black uppercase tracking-wider ${
                activeTab === "on-grid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
              }`}>
                {activeTab === "on-grid" ? "Payback Mode" : "Backup Sourced"}
              </div>
            </div>

            {/* Overlay hint helper */}
            <div className="absolute top-4 left-4 bg-slate-950/70 backdrop-blur-sm rounded-full py-1.5 px-3 border border-white/10 flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-white/90 font-black uppercase tracking-wider">Hover pins for specifications</span>
            </div>
          </div>
        </div>

        {/* Right Panel: Specifications Summary Grid */}
        <div className="lg:col-span-6 flex flex-col justify-between text-left p-2">
          
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div>
              <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
                activeTab === "on-grid" 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200/40" 
                  : "bg-amber-50 text-amber-800 border-amber-200/40"
              }`}>
                {activeTab === "on-grid" ? "Layout Option 01" : "Layout Option 02"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 leading-tight tracking-tight">
                {activeTab === "on-grid" 
                  ? "Society On-Grid Solar Systems" 
                  : "Society Hybrid Backup Systems"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2.5 leading-relaxed font-semibold text-justify">
                {activeTab === "on-grid"
                  ? "Directly connected to the society's common utility meter, daytime generation powers continuous-load machinery (elevators, overhead pumps) and feeds excess energy back to the grid for energy offsets."
                  : "Combines high-generation solar panel clusters with containerized Lithium Ferro Phosphate battery storage systems to safeguard high-priority assets from grid blackout interruptions."}
              </p>
            </div>

            {/* Specs 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              {specs[activeTab].map((spec, sIdx) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={sIdx}
                    className="p-4 bg-slate-50/50 border border-slate-200/60 rounded-2xl flex gap-3 text-left hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      activeTab === "on-grid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      <IconComponent size={16} />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        {spec.label}
                      </span>
                      <span className="block text-xs font-black text-slate-900 mt-0.5">
                        {spec.value}
                      </span>
                      <span className="block text-[9px] text-slate-500 font-semibold mt-0.5 leading-tight">
                        {spec.detail}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bullet List */}
            <ul className="flex flex-col gap-2.5 mt-2">
              {points[activeTab].map((point, pIdx) => (
                <li key={pIdx} className="flex gap-2.5 items-start text-xs font-semibold text-slate-700">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    activeTab === "on-grid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-700"
                  }`}>
                    <Check size={10} className="stroke-[3.5]" />
                  </span>
                  <span className="leading-relaxed text-justify">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Call */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="#contact-form-section"
              onClick={(e) => {
                e.preventDefault();
                const formSection = document.getElementById("contact-form-section");
                if (formSection) {
                  formSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-black uppercase text-white shadow-md transition-all duration-300 hover:shadow-lg ${
                activeTab === "on-grid" 
                  ? "bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/20" 
                  : "bg-amber-600 hover:bg-amber-700 hover:shadow-amber-500/20"
              }`}
            >
              <span>Request Custom Sizing Proposal</span>
              <ArrowRight size={14} />
            </Link>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Free Site Assessment & RWA Presentations
            </span>
          </div>

        </div>
      </div>

      {/* ── RWA Layout Comparison Matrix ── */}
      <div className="max-w-5xl mx-auto mt-24 px-2">
        {/* Table Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-1.5">
          <span className="text-[9px] font-black uppercase text-emerald-600 tracking-wider bg-emerald-50 border border-emerald-100 py-0.5 px-2.5 rounded-full">
            Decision Framework
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            Society layouts comparison matrix
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-relaxed">
            Direct parameter comparison designed to assist management committees during general body meetings.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="w-full overflow-x-auto rounded-3xl border border-slate-200/60 shadow-xl bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                <th className="p-4 sm:p-5 text-[10px] font-black uppercase tracking-wider w-1/4">Key Parameter</th>
                <th className="p-4 sm:p-5 text-[10px] font-black uppercase tracking-wider w-3/8 border-l border-white/10">Society On-Grid Layout</th>
                <th className="p-4 sm:p-5 text-[10px] font-black uppercase tracking-wider w-3/8 border-l border-white/10">Society Hybrid Layout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[11px] sm:text-xs">
              
              {/* Row 1: Objective */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-black text-slate-900">Primary Objective</td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Maximum cost offset, reducing common electricity expenses by up to 90%.
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Continuous backup security for key shared assets during grid blackouts.
                </td>
              </tr>

              {/* Row 2: Blackouts */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-black text-slate-900">Power During Outages</td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  <div className="flex items-center gap-2">
                    <XCircle size={14} className="text-rose-500 shrink-0" />
                    <span>Automatically shuts off (Grid Anti-Islanding Safety standard).</span>
                  </div>
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Instantly switches to batteries (&lt;15ms) to run lifts, CCTV, & pumps.</span>
                  </div>
                </td>
              </tr>

              {/* Row 3: Battery Storage */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-black text-slate-900">Battery Storage</td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Not required. Excess generation is exported straight to the power grid.
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100 font-bold text-slate-800">
                  Custom Lithium Ferro Phosphate (LFP) banks with smart automated BMS.
                </td>
              </tr>

              {/* Row 4: Payback */}
              <tr className="hover:bg-slate-50/50 transition-colors bg-emerald-50/10">
                <td className="p-4 sm:p-5 font-black text-emerald-800">Est. ROI Payback</td>
                <td className="p-4 sm:p-5 text-slate-900 font-black border-l border-slate-100 bg-emerald-50/20">
                  3.5 - 4 Years (Fastest Capital Recovery)
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  5.5 - 6 Years (Higher CapEx for battery bank addition)
                </td>
              </tr>

              {/* Row 5: Subsidy */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-black text-slate-900">Subsidy Clearance</td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Fully eligible under government common meter housing society guidelines.
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Eligible on solar arrays; batteries are excluded from subsidy calculations.
                </td>
              </tr>

              {/* Row 6: Lifetime */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-black text-slate-900">Component Lifespan</td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Solar Panels: 25+ Years. Solar Inverters: 10 Years (expandable).
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Solar Panels: 25+ Years. Batteries: 10+ Years (Lithium LFP cycle rating).
                </td>
              </tr>

              {/* Row 7: Maintenance */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 sm:p-5 font-black text-slate-900">Maintenance Scope</td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Extremely low. Standard scheduled water washing of panel frames.
                </td>
                <td className="p-4 sm:p-5 text-slate-600 font-semibold border-l border-slate-100">
                  Low. Periodic checks on battery cell balances & charge management cycles.
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
