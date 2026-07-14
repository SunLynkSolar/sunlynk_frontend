"use client";

import { useState } from "react";
import {
  Sun,
  BatteryCharging,
  Coins,
  Zap,
  ShieldCheck,
  Clock,
  Layers,
  Activity,
  Check,
  X,
  ArrowRight,
  ChevronRight,
  Building2,
  Cpu,
  Frame,
  RefreshCcw,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const DATA = {
  "on-grid": {
    label: "On-grid layout",
    badge: "Max savings",
    eyebrow: "",
    title: "Society on-grid solar systems",
    sub: "Directly connected to your society's common utility meter. Daytime generation powers elevators, pumps and area lighting — surplus flows back to the grid as bill credits.",
    foot: "Net-metered core",
    pill: "Payback mode",
    tags: ["Net metering", "DISCOM approved", "Zero battery cost"],
    accent: "#2ecc71",
    accentHover: "#25a55a",
    accentLight: "#e6faf1",
    accentText: "#0d6e35",
    metrics: [
      { icon: Coins, label: "Payback period", value: "3.5 – 4 yrs", detail: "Fastest capital recovery" },
      { icon: Zap, label: "Bill savings", value: "Up to 90%", detail: "Common area cost offset" },
      { icon: ShieldCheck, label: "DISCOM status", value: "Net-metering ready", detail: "All filings by SunLynk" },
      { icon: Sun, label: "Loads covered", value: "Lifts · Pumps · Lights", detail: "High-draw daytime assets" },
    ],
    points: [
      "Zero battery maintenance — lowest total cost of ownership for RWAs.",
      "Surplus energy on holidays credited automatically to the grid account.",
      "Fully eligible for DISCOM subsidies on housing society common meters.",
    ],
    components: [
      { n: "01", title: "Tier-1 Mono PERC modules", desc: "550W+ half-cut panels — optimised for high tropical irradiance." },
      { n: "02", title: "Elevated structural frame", desc: "8–10 ft hot-dip galvanised columns. 100% terrace floor intact." },
      { n: "03", title: "Bidirectional smart sync", desc: "DISCOM net-metering integration with live export management." },
    ],
  },
  hybrid: {
    label: "Hybrid layout",
    badge: "Backup power",
    eyebrow: "",
    title: "Society hybrid backup systems",
    sub: "Combines high-generation solar panels with containerised LFP battery storage. Critical shared assets stay fully operational even during prolonged grid blackouts.",
    foot: "Battery-resilient frame",
    pill: "Backup mode",
    tags: ["LFP battery bank", "8 hr+ backup", "<15 ms switchover"],
    accent: "#fca311",
    accentHover: "#e8920a",
    accentLight: "#fff4e0",
    accentText: "#7a4e00",
    metrics: [
      { icon: Clock, label: "Backup autonomy", value: "8+ hours", detail: "Continuous critical coverage" },
      { icon: BatteryCharging, label: "Battery chemistry", value: "Smart LFP cells", detail: "10+ yr life, safest lithium" },
      { icon: Layers, label: "Emergency loads", value: "Lifts · CCTV · Pumps", detail: "Switchover in under 15 ms" },
      { icon: Activity, label: "Operation mode", value: "Solar + storage", detail: "Runs off panels + battery" },
    ],
    points: [
      "Elevators, water pumps and security stay live throughout grid failures.",
      "Integrated smart BMS maintains thermal safety and maximises cell life.",
      "Intelligent load segregation prioritises essential over non-critical loads.",
    ],
    components: [
      { n: "01", title: "Tier-1 Mono PERC modules", desc: "550W+ half-cut panels — optimised for high tropical irradiance." },
      { n: "02", title: "Elevated structural frame", desc: "8–10 ft hot-dip galvanised columns. 100% terrace floor intact." },
      { n: "03", title: "Bidirectional smart sync", desc: "DISCOM net-metering integration with live export management." },
      { n: "04", title: "LFP battery bank", desc: "Smart bank — 10,000+ cycle lifespan for lifts and pumps." },
    ],
  },
};

const MATRIX = [
  {
    param: "Primary objective",
    ongrid: "Maximum cost offset — reduces common area bills by up to 90%.",
    hybrid: "Continuous backup security for shared assets during blackouts.",
    highlight: false,
  },
  {
    param: "Power during outages",
    ongrid: { icon: "x", text: "Shuts off — anti-islanding safety standard." },
    hybrid: { icon: "check", text: "Battery kicks in <15 ms. Lifts, CCTV & pumps stay live." },
    highlight: false,
  },
  {
    param: "Battery storage",
    ongrid: "Not required. Surplus exported to the grid.",
    hybrid: "Custom LFP banks with smart automated BMS.",
    highlight: false,
  },
  {
    param: "Est. ROI payback",
    ongrid: "3.5 – 4 years (fastest capital recovery)",
    hybrid: "5.5 – 6 years (higher CapEx for battery addition)",
    highlight: true,
  },
  {
    param: "Subsidy eligibility",
    ongrid: "Fully eligible under govt common meter guidelines.",
    hybrid: "Eligible on solar arrays only — batteries excluded.",
    highlight: false,
  },
  {
    param: "Component lifespan",
    ongrid: "Panels: 25+ yrs · Inverters: 10 yrs",
    hybrid: "Panels: 25+ yrs · LFP batteries: 10+ yrs",
    highlight: false,
  },
  {
    param: "Maintenance",
    ongrid: "Very low — scheduled panel washing only.",
    hybrid: "Low — periodic battery cell balance checks.",
    highlight: false,
  },
];

interface MatrixCellProps {
  cell: string | { icon: string; text: string };
  isOnGrid: boolean;
}

function MatrixCell({ cell, isOnGrid }: MatrixCellProps) {
  if (typeof cell === "string") return <span>{cell}</span>;
  return (
    <span className="flex items-start gap-2">
      {cell.icon === "check" ? (
        <Check size={14} className="mt-0.5 shrink-0 text-[#2ecc71]" />
      ) : (
        <X size={14} className="mt-0.5 shrink-0 text-red-400" />
      )}
      <span>{cell.text}</span>
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SocietySolutionsSelector() {
  const [tab, setTab] = useState<"on-grid" | "hybrid">("on-grid");
  const d = DATA[tab];

  const isGreen = tab === "on-grid";

  return (
    <section className="w-full py-10 font-sans">

      {/* ── Toggle ── */}
      <div className="flex gap-2 p-1.5 bg-zinc-100 rounded-2xl mb-8 max-w-lg mx-auto">
        {((["on-grid", "hybrid"] as const)).map((t) => {
          const active = tab === t;
          const td = DATA[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${active
                ? "bg-[#065F46] text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-800"
                }`}
            >
              {t === "on-grid" ? <Sun size={15} /> : <BatteryCharging size={15} />}
              {td.label}
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full transition-all"
                style={
                  active
                    ? { background: td.accent, color: "#fff" }
                    : { background: "#e5e7eb", color: "#6b7280" }
                }
              >
                {td.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Hero Band ── */}
      <div className="rounded-2xl overflow-hidden border border-zinc-200 mb-6">
        <div className="bg-[#065F46] p-7 flex gap-6 items-stretch">

          {/* Left */}
          <div className="flex-1 flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: d.accent }}
                />
                <span className="text-[11px] font-bold tracking-widest uppercase text-zinc-500">
                  {d.eyebrow}
                </span>
              </div>
              <h2 className="text-[22px] font-bold text-white leading-snug tracking-tight">
                {d.title}
              </h2>
              <p className="mt-3 text-[13px] text-zinc-400 leading-relaxed max-w-md">
                {d.sub}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {d.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold px-3 py-1 rounded-full"
                  style={{ background: d.accentLight, color: d.accentText }}
                  dangerouslySetInnerHTML={{ __html: tag }}
                />
              ))}
            </div>
          </div>

          {/* Right – image placeholder */}
          {/* <div className="w-52 shrink-0 rounded-xl border border-white/10 bg-zinc-800 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center p-5 gap-2 border-b border-white/10">
              <Building2 size={36} className="text-zinc-600" />
              <span className="text-[11px] text-zinc-600 text-center leading-tight">
                Drop your<br />rooftop photo here
              </span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-medium">{d.foot}</span>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                style={{ background: d.accent }}
              >
                {d.pill}
              </span>
            </div>
          </div> */}

        </div>
      </div>

      {/* ── Metrics Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {d.metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-xl border border-zinc-200 bg-white p-4 flex flex-col gap-2.5"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: d.accentLight, color: d.accentText }}
              >
                <Icon size={16} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  {m.label}
                </div>
                <div className="text-[13px] font-bold text-zinc-900 leading-tight">
                  {m.value}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-tight">
                  {m.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Points + Components ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

        {/* Advantages */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-0.5 rounded-full"
              style={{ background: d.accent }}
            />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              Key advantages
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {d.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: d.accentLight, color: d.accentText }}
                >
                  <Check size={11} strokeWidth={3} />
                </div>
                <p className="text-[12.5px] text-zinc-500 leading-relaxed">{pt}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span
              className="w-4 h-0.5 rounded-full"
              style={{ background: d.accent }}
            />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              System components
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            {d.components.map((c) => (
              <div
                key={c.n}
                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100"
              >
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0 mt-0.5"
                  style={{ background: d.accentLight, color: d.accentText }}
                >
                  {c.n}
                </span>
                <div>
                  <div className="text-[12px] font-semibold text-zinc-800">{c.title}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── CTA Strip ── */}
      {/* <div className="rounded-2xl bg-[#1c1c1c] px-7 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10">
        <div>
          <div className="text-[15px] font-bold text-white">
            Get a custom sizing proposal for your society
          </div>
          <div className="text-[12px] text-zinc-500 mt-1">
            Free rooftop assessment · RWA presentation · DISCOM filing support
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="text-[12px] font-semibold text-zinc-400 px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200 transition-all">
            View case studies
          </button>
          <button
            className="flex items-center gap-2 text-[13px] font-bold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: d.accent }}
          >
            Request proposal
            <ArrowRight size={14} />
          </button>
        </div>
      </div> */}

      {/* ── Comparison Matrix ── */}
      <div className="mb-2">
        <div className="mb-5">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2"
            style={{ background: "#e6faf1", color: "#0d6e35" }}
          >
            Decision framework
          </span>
          <h3 className="text-[17px] font-bold text-zinc-900">
            Society layouts comparison matrix
          </h3>
          <p className="text-[12px] text-zinc-400 mt-1">
            Direct parameter comparison for management committee general body meetings.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 overflow-hidden">
          <table className="w-full border-collapse text-left table-fixed">
            <thead>
              <tr className="bg-[#1c1c1c]">
                <th className="w-[22%] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Parameter
                </th>
                <th className="w-[39%] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-[#2ecc71]">
                  On-grid layout
                </th>
                <th className="w-[39%] px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-[#fca311]">
                  Hybrid layout
                </th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-zinc-100 transition-colors hover:bg-zinc-50 ${row.highlight ? "bg-[#f0fdf6]" : ""
                    }`}
                >
                  <td
                    className={`px-5 py-3.5 text-[12px] font-semibold align-top ${row.highlight ? "text-[#0d6e35]" : "text-zinc-800"
                      }`}
                  >
                    {row.param}
                  </td>
                  <td
                    className={`px-5 py-3.5 text-[12px] align-top leading-relaxed ${row.highlight
                      ? "text-[#0d6e35] font-semibold"
                      : "text-zinc-500"
                      }`}
                  >
                    <MatrixCell cell={row.ongrid} isOnGrid={true} />
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-zinc-500 align-top leading-relaxed">
                    <MatrixCell cell={row.hybrid} isOnGrid={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
}