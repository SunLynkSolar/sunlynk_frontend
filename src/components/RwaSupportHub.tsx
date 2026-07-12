"use client";

import React, { useState } from "react";
import {
  Sun,
  Zap,
  Sparkles,
  Building,
  Users,
  HelpCircle,
  FileText,
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  Shield,
  BookOpen,
  Check
} from "lucide-react";
import Link from "next/link";

type SubTab = "roadmap" | "objections";

export default function RwaSupportHub() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("roadmap");
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [activeObjection, setActiveObjection] = useState<number | null>(0);

  const roadmapSteps = [
    {
      title: "Rooftop Space Survey",
      subtitle: "Step 01 // Site Mapping",
      timeline: "Timeline: Day 1 - 2",
      desc: "Our structural engineering team maps your rooftop layout using high-precision spatial assessments.",
      whatWeDo: "Map shadow coordinates, analyze concrete load capacities, and measure physical areas.",
      deliverable: "Custom 3D Rooftop Shadow Model and capacity design layouts.",
      icon: Building
    },
    {
      title: "ROI & Proposal Drafting",
      subtitle: "Step 02 // Financial Modeling",
      timeline: "Timeline: Day 3 - 5",
      desc: "We build custom financial projection models tailored to Lucknow common utility electricity tariffs.",
      whatWeDo: "Draft CapEx vs. OPEX savings projection sheet and calculate exact payback timelines.",
      deliverable: "Official SunLynk RWA Financial Case Study & Sizing Proposal.",
      icon: FileText
    },
    {
      title: "Core Committee Review",
      subtitle: "Step 03 // Consensus Building",
      timeline: "Timeline: Day 6 - 8",
      desc: "We present the findings directly to the housing society's executive committee members.",
      whatWeDo: "Review raising framework specifications, clarify warranty terms, and structure bank financing details.",
      deliverable: "Standardized RWA proposal copy for circulation to all residents.",
      icon: Users
    },
    {
      title: "AGM Presentation support",
      subtitle: "Step 04 // Resident Consensus",
      timeline: "Timeline: Scheduled AGM Date",
      desc: "Our solar engineers attend your Annual General Meeting (AGM) to address resident concerns directly.",
      whatWeDo: "Conduct a live townhall presentation, explain structural durability, and bust common myths.",
      deliverable: "On-site resident clearance and formal general body approval support.",
      icon: Sparkles
    },
    {
      title: "DISCOM & Grid Sync",
      subtitle: "Step 05 // Liaison & Net Metering",
      timeline: "Timeline: Post-Approval",
      desc: "We manage the entire approvals, administrative submissions, and net metering sync end-to-end.",
      whatWeDo: "Submit DISCOM feasibility reports, coordinate with local inspectors, and install net meters.",
      deliverable: "Bidirectional net-meter sync and operational clean energy generation.",
      icon: ShieldCheck
    }
  ];

  const objections = [
    {
      question: "We use our terrace for walks and children's play. Will solar block the floor?",
      solution: "Elevated Structural Frame (8-10 Ft Raised Columns)",
      desc: "SunLynk designs raised structural framing using high-grade HDGI columns that stand 8 to 10 feet above the floor. This ensures 100% of the terrace ground area remains completely usable for residents' activities, walks, and leisure.",
      icon: Sun
    },
    {
      question: " लखनऊ faces cyclonic storm winds. Will drilling cause rooftop rain leakage?",
      solution: "Anti-Leak chemical Grouting & Wind Anchorage",
      desc: "Our mounting bases are chemically grouted to concrete pedestals. We do not disrupt rooftop waterproofing. All base boundaries are coated with high-performance waterproofing sealants to guarantee zero seepage or structural damage.",
      icon: Shield
    },
    {
      question: "Who will maintain and clean the panels in a multi-resident society?",
      solution: "Integrated RWA Cleaning Walkways & Pipe Networks",
      desc: "We construct custom safe walkways between solar arrays and install a permanent high-pressure water pipe network with local outlet valves on the roof. This permits the society's standard sweepers to wash panels safely in under an hour.",
      icon: CheckCircle
    },
    {
      question: "Our society corpus reserve funds are for emergency repairs. Why spend them?",
      solution: "Collateral-Free Bank Loans (Savings Offset EMIs)",
      desc: "Through official banking tie-ups, we offer low-interest PSU loans with terms up to 7 years. Because your common utility savings are higher than the monthly EMI, the system pays for itself without depleting your corpus reserves.",
      icon: Zap
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden" id="rwa-hub">
      {/* Structural visual accents */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute right-[-10%] top-[15%] w-[40%] h-[40%] bg-emerald-100/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/50 rounded-full py-1.5 px-4 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-extrabold text-emerald-700">RWA Committee Resource</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
            RWA Decision Support Hub
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl leading-relaxed mt-1">
            We help society executive committees align residents, manage technical audits, and obtain general body approvals with absolute transparency.
          </p>
        </div>

        {/* Action Tabs Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-slate-100 border border-slate-200/60 rounded-2xl w-full max-w-md shadow-sm">
            <button
              onClick={() => setActiveSubTab("roadmap")}
              className={`flex-1 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer outline-none ${activeSubTab === "roadmap"
                  ? "bg-white text-emerald-700 border border-emerald-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              RWA Approval Roadmap
            </button>
            <button
              onClick={() => setActiveSubTab("objections")}
              className={`flex-1 py-3.5 px-5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer outline-none ${activeSubTab === "objections"
                  ? "bg-white text-emerald-700 border border-emerald-100 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
                }`}
            >
              Resident Objection Buster
            </button>
          </div>
        </div>

        {/* Tab Content 1: Roadmap */}
        {activeSubTab === "roadmap" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left side: Timeline Steps */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {roadmapSteps.map((step, idx) => {
                const StepIcon = step.icon;
                const isSelected = selectedStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedStep(idx)}
                    className={`flex items-start gap-4 p-5 rounded-2xl text-left border transition-all duration-300 w-full cursor-pointer ${isSelected
                        ? "bg-white border-emerald-500 shadow-lg scale-[1.01]"
                        : "bg-white/80 border-slate-200/50 hover:border-slate-300 shadow-sm"
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${isSelected ? "bg-emerald-500 text-white border-emerald-600" : "bg-emerald-50 text-primary border-emerald-100/60"
                      }`}>
                      <StepIcon size={18} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-baseline gap-2">
                        <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                          {step.subtitle}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSelected ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                          }`}>
                          {step.timeline.split(": ")[1]}
                        </span>
                      </div>
                      <h4 className={`text-base font-black tracking-tight mt-1 transition-colors ${isSelected ? "text-emerald-700" : "text-slate-900"
                        }`}>
                        {step.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right side: Selected Step Details Box */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-slate-200/70 rounded-3xl p-6 sm:p-8 shadow-xl text-left relative overflow-hidden h-full min-h-[420px] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider py-1 px-3.5 rounded-full inline-block">
                    Detail Breakdown
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-6 leading-tight">
                    {roadmapSteps[selectedStep].title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-medium mt-3.5">
                    {roadmapSteps[selectedStep].desc}
                  </p>

                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-primary border border-emerald-100/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Scope of Action</span>
                        <span className="text-xs sm:text-sm text-slate-800 font-bold mt-0.5 block">
                          {roadmapSteps[selectedStep].whatWeDo}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-primary border border-emerald-100/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block">Key Deliverable</span>
                        <span className="text-xs sm:text-sm text-emerald-700 font-bold mt-0.5 block">
                          {roadmapSteps[selectedStep].deliverable}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">
                    {roadmapSteps[selectedStep].timeline}
                  </span>
                  <Link
                    href="/contact"
                    className="group bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 px-6 rounded-full transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/10 hover:shadow-lg outline-none"
                  >
                    <span>Request Assistance</span>
                    <ArrowRight size={13} className="transform group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Objections */}
        {activeSubTab === "objections" && (
          <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {objections.map((obj, idx) => {
              const ObjIcon = obj.icon;
              const isOpen = activeObjection === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/50 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveObjection(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer outline-none"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 border border-slate-200/60 flex items-center justify-center shrink-0">
                        <HelpCircle size={18} />
                      </div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                        {obj.question}
                      </h4>
                    </div>
                    <span className={`w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary border-emerald-200" : ""
                      }`}>
                      ▼
                    </span>
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                    }`}>
                    <div className="p-6 bg-slate-50/45 text-left flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-primary border border-emerald-100/40 flex items-center justify-center shrink-0 mt-0.5">
                        <ObjIcon size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] text-primary font-extrabold uppercase tracking-wider block">
                          SunLynk Solution: {obj.solution}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mt-2">
                          {obj.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
