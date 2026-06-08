import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { CheckCircle, ArrowRight, Sun, ShieldCheck, Zap, Sparkles, Phone, Mail, Building2, Factory, Shield, Cpu, BarChart3, TrendingUp, Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CommercialCalculator from "@/components/CommercialCalculator";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Commercial & Industrial (C&I) Solar Solutions | SunLynk Solar",
  description: "Reduce company operational costs and hit clean energy goals with SunLynk. We design and install high-performance commercial rooftop solar systems with quick ROI and Accelerated Depreciation benefits.",
  keywords: ["commercial solar Lucknow", "industrial rooftop solar", "C&I solar EPC company", "solar SCADA systems", "accelerated depreciation solar"],
};

export default function CommercialPage() {
  const benefits = [
    { title: "Reduce Operating Costs", desc: "Cut commercial utility bills instantly, turning operational electricity expenses into direct cash flow savings." },
    { title: "Accelerated Payback", desc: "Average system ROI achieved in 3 to 4 years, followed by 20+ years of free energy generation." },
    { title: "Tax Depreciation Benefits", desc: "Leverage 40% Accelerated Depreciation in Year 1 to write off assets and offset corporate income taxes." },
    { title: "ESG & Carbon Compliance", desc: "Fulfill green mandates and enhance carbon offset parameters for corporate sustainability metrics." },
    { title: "Scalable Engineering", desc: "Custom structures designed to scale and support future additions like battery storage or EV points." },
    { title: "SCADA Integrated Control", desc: "Real-time generation dashboards and meteorological calibration standard on all C&I installations." }
  ];

  const suitableFor = [
    { name: "Manufacturing Units", desc: "Offsets high daytime inductive motor loads." },
    { name: "Cold Storage & Warehouses", desc: "Saves high cooling utility charges during peak sun." },
    { name: "Hospitals & Clinics", desc: "Maintains critical load efficiency with hybrid backup options." },
    { name: "Schools & Universities", desc: "Reduces high institutional utility charges." },
    { name: "Offices & Retail Parks", desc: "Reduces lighting & air conditioning overheads." },
    { name: "Gated Logistics Hubs", desc: "Optimizes large unused roof surfaces." }
  ];

  const solutions = [
    {
      title: "Commercial On-Grid Solar Systems",
      desc: "Designed for industrial setups with steady daytime loads. Direct DISCOM utility connection allows exporting surplus capacity under industrial net metering.",
      points: ["Maximized tariff offsets", "Near-zero maintenance overheads", "Accelerated depreciation eligible"],
      theme: "border-[#1E293B] bg-[#0E1524]/60"
    },
    {
      title: "Commercial Hybrid Systems with BESS",
      desc: "Integrates solar panels with smart Battery Energy Storage Systems (BESS). Rest assured that critical machinery, laboratory tools, and servers remain live during grid drops.",
      points: ["Seamless backup switchovers", "Peak load shaving features", "Zero voltage dip protection"],
      theme: "border-[#1E293B] bg-[#0E1524]/60"
    },
  ];

  const faqs = [
    {
      id: 0,
      question: "How does Accelerated Depreciation (AD) save taxes for my business?",
      answer: "Under the Income Tax Act section 32, businesses installing commercial rooftop solar systems are eligible for 40% Accelerated Depreciation in the first year. This write-off reduces the corporate taxable income, yielding direct cash-flow savings that effectively offset up to 10% of the initial solar system investment in Year 1."
    },
    {
      id: 1,
      question: "What is the typical lifespan and maintenance cost of commercial solar installations?",
      answer: "A Tier-1 solar panel has an operational life of 25+ years with a performance guarantee. Maintenance is extremely minimal, consisting primarily of regular cleaning of panels to ensure high irradiance absorption, and electrical inspections. We provide automated SCADA diagnostics to flag when cleaning is required."
    },
    {
      id: 2,
      question: "Can we install solar panels if our roof structure is metallic or has high elevations?",
      answer: "Yes, our engineers specialize in multiple structural configurations. We install custom non-penetrative mounting clamps on metal roofs (preventing water leaks) and construct raised structural columns for flat concrete roofs, preserving the space below for operational tasks or recreation."
    },
    {
      id: 3,
      question: "How do we monitor generation efficiency across large multi-site installations?",
      answer: "SunLynk integrates standard SCADA architectures, weather monitoring stations (WMS), and cloud-based analytics with all commercial systems. Managers can check generation parameters, performance ratios (PR), and receive alert notifications on their smartphones or office screens."
    }
  ];

  return (
    <div className="bg-[#070b12] text-gray-200 min-h-screen">
      
      {/* Tech-Dark Corporate Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 border-b border-gray-900">
        {/* Real background image with dark overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/assets/IMAGE/solar.webp"
            alt="Commercial solar installation background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#070b12]/80 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Technical grid dots */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 z-1"
          style={{ 
            backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1.2px, transparent 1.2px)", 
            backgroundSize: "28px 28px"
          }}
        ></div>

        {/* Technical abstract grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-10 z-1">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Neon green & steel blue glow mesh */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#2ecc71]/5 to-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none z-1"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#2ecc71]/10 to-transparent rounded-full blur-3xl pointer-events-none z-1"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex self-start bg-[#2ecc71]/20 rounded-full py-1.5 px-4 text-xs font-bold text-primary border border-primary/30">
                ⚡ Industrial Grid Engineering
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black leading-none text-white tracking-tight">
                Turn Rooftop <br />
                <span className="text-primary relative inline-block">
                  Assets Into Profit
                  <span className="absolute left-0 bottom-1.5 h-[6px] w-full bg-primary/20 rounded-full -z-10"></span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-semibold max-w-xl">
                Utility costs represent a major chunk of operational overhead. Stabilize your business expenses with a custom engineered commercial solar network featuring quick payback structures and premium SCADA controls.
              </p>

              {/* Corporate Specs HUD layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 max-w-2xl">
                <div className="p-4 bg-[#0E1524]/80 border border-gray-800 rounded-2xl backdrop-blur-md">
                  <Cpu className="text-primary mb-2" size={20} />
                  <span className="block text-white font-extrabold text-sm">SCADA Ready</span>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase mt-0.5">Real-time control</span>
                </div>
                <div className="p-4 bg-[#0E1524]/80 border border-gray-800 rounded-2xl backdrop-blur-md">
                  <BarChart3 className="text-primary mb-2" size={20} />
                  <span className="block text-white font-extrabold text-sm">~3.5 Yrs Payback</span>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase mt-0.5">High IRR Yield</span>
                </div>
                <div className="p-4 bg-[#0E1524]/80 border border-gray-800 rounded-2xl backdrop-blur-md">
                  <TrendingUp className="text-primary mb-2" size={20} />
                  <span className="block text-white font-extrabold text-sm">40% Year 1 AD</span>
                  <span className="block text-[10px] text-gray-400 font-bold uppercase mt-0.5">Tax write-off asset</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphic Dark Form */}
            <div className="lg:col-span-5 w-full relative">
              <div className="absolute -inset-1.5 bg-[#2ecc71]/20 rounded-3xl blur opacity-20 pointer-events-none"></div>
              <div className="relative bg-[#0E1524] rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
                <div className="bg-[#070b12] text-white px-6 py-4 flex items-center justify-between border-b border-gray-850">
                  <span className="text-xs font-black uppercase tracking-wider text-primary">Inquiry Console</span>
                  <span className="text-[10px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold">C&I Division</span>
                </div>
                <div className="p-1">
                  <ContactForm hideTabs={true} defaultTab="commercial" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Available */}
      <section className="py-20 bg-[#090e18] border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">C&I Systems</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Commercial Engineering Setups
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
              We design and construct systems matching the utility parameters, factory layouts, and compliance requirements of Indian industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((sol, index) => (
              <div 
                key={index} 
                className={`border border-gray-850 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-primary/30 transition-all duration-300 group ${sol.theme}`}
              >
                <div className="flex flex-col gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Sun size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-justify">
                    {sol.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {sol.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex gap-2 items-center text-xs font-bold text-gray-300">
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-850 text-left">
                  <Link href="#solar-calculator" className="inline-flex items-center gap-2 text-xs font-black uppercase text-primary hover:underline">
                    <span>Calculate Payback</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Creative Interactive Suitability Grid */}
      <section className="py-20 bg-[#070b12] border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">Suitability Profile</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Sectors and Adaptability
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
              Our engineering systems are custom configured according to specific sector utility consumption footprints.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {suitableFor.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#0E1524]/40 border border-gray-850 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 flex gap-4 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0 group-hover:bg-primary group-hover:text-dark transition-all duration-300">
                  0{idx + 1}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white group-hover:text-primary transition-colors">{item.name}</h4>
                  <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Benefits and Technical Details */}
      <section className="py-20 bg-[#090e18] border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Side: Technical benefits */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-primary"></span>
                  <span className="text-xs uppercase tracking-widest font-black text-primary">Benefits</span>
                  <span className="h-[2px] w-6 bg-primary"></span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  High-Performance Engineering Advantages
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#0E1524]/60 border border-gray-850 p-6 rounded-3xl shadow-sm hover:border-primary/25 transition-all duration-300 text-left flex flex-col gap-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <CheckCircle size={16} />
                    </div>
                    <h3 className="font-extrabold text-sm text-white mt-1">{b.title}</h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Showcase Image */}
            <div className="lg:col-span-5 relative w-full group">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
                <Image
                  src="/assets/images/service/solar_commercial.webp"
                  alt="Industrial commercial building solar array setup"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#0E1524]/95 backdrop-blur-md border border-gray-800 rounded-2xl p-4 flex items-center gap-3 max-w-[240px] shadow-xl">
                <div className="w-10 h-10 bg-[#2ecc71]/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-black text-white leading-none block">SCADA Smart Grid</span>
                  <span className="block text-[9px] text-[#2ecc71] font-extrabold uppercase mt-1">● Active Monitoring</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Commercial Solar ROI Calculator */}
      <CommercialCalculator />

      {/* Real Projects Portfolio */}
      <section className="py-20 bg-[#090e18] border-t border-gray-850">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">C&I Portfolio</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Real Commercial Implementations
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed">
              Explore actual industrial and commercial solar installations engineered by SunLynk, driving significant energy bill offsets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 aspect-[4/3] shadow-md hover:border-primary/20 transition-all duration-300">
              <Image
                src="/assets/IMAGE/project/p (2).avif"
                alt="150kW Industrial Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-primary text-white font-extrabold uppercase py-1 px-2.5 rounded-full">150kW On-Grid</span>
                <h4 className="font-extrabold text-base mt-2">Industrial Rooftop, Factory</h4>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 aspect-[4/3] shadow-md hover:border-primary/20 transition-all duration-300">
              <Image
                src="/assets/IMAGE/solar.webp"
                alt="500kW Commercial Rooftop Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-primary text-white font-extrabold uppercase py-1 px-2.5 rounded-full">500kW Grid-Tied</span>
                <h4 className="font-extrabold text-base mt-2">Commercial Office Hub</h4>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-800 aspect-[4/3] shadow-md hover:border-primary/20 transition-all duration-300">
              <Image
                src="/assets/IMAGE/project/p (3).avif"
                alt="Solar SCADA Automation Console"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-[#38bdf8] text-dark font-extrabold uppercase py-1 px-2.5 rounded-full">SCADA Control</span>
                <h4 className="font-extrabold text-base mt-2">Smart Grid SCADA Panel</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#070b12]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 text-left flex flex-col gap-4 sticky top-24">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">FAQ</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white leading-tight">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-400 leading-relaxed text-justify">
              Critical parameters related to corporate asset capitalization, project funding options, structural wind loads, and net-metering clear codes.
            </p>
            <div className="p-6 bg-[#0E1524] border border-gray-800 rounded-3xl flex flex-col gap-3.5 mt-4">
              <span className="font-extrabold text-sm text-white block">Consult Our C&I Engineers</span>
              <div className="flex flex-col gap-2">
                <a href="tel:+918922036792" className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary" />
                  <span>+91 8922036792</span>
                </a>
                <a href="mailto:info@SunLynkSolar.com" className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-primary transition-colors">
                  <Mail size={14} className="text-primary" />
                  <span>info@SunLynkSolar.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Accordion list with customized dark styles */}
          <div className="lg:col-span-7 w-full text-left bg-[#0E1524] border border-gray-850 rounded-3xl p-2">
            <FaqAccordion faqs={faqs} />
          </div>

        </div>
      </section>
    </div>
  );
}
