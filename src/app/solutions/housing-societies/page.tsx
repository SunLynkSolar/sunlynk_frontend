import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { CheckCircle, ArrowRight, Sun, ShieldCheck, Zap, Sparkles, Phone, Mail, Building, Users, Award, ShieldAlert, Check } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SocietyCalculator from "@/components/SocietyCalculator";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "Rooftop Solar Solutions for Housing Societies | SunLynk Solar",
  description: "Reduce common-area electricity maintenance costs for elevators, pumps, clubhouses, and lights. SunLynk installs high-efficiency rooftop solar systems for housing societies with RWA assistance.",
  keywords: ["housing society solar", "RWA solar panels", "apartment rooftop solar", "net metering housing society", "common area solar power"],
};

export default function HousingSocietiesPage() {
  const benefits = [
    { title: "Slash RWA Expenses", desc: "Common utility bills represent up to 45% of standard maintenance budgets. Solar cuts these common costs by up to 90%." },
    { title: "Support for Committees", desc: "We assist RWAs by preparing customized financial sheets, ROI graphs, and attending AGMs to address resident concerns." },
    { title: "Eco-Friendly Footprint", desc: "Promote a sustainable green community, reducing carbon footprints while lowering maintenance bills." },
    { title: "Elevated Custom Structures", desc: "We install raised structures (up to 8-10 ft) to preserve usable roof space for residents' leisure." },
    { title: "Net Metering Clearances", desc: "Our team manages approvals, documentation, and DISCOM permissions under housing society codes." },
    { title: "Corpus Protection", desc: "Clean ROI structure ensures payback in ~4 years, preserving long-term reserve society funds." }
  ];

  const applications = [
    { title: "Passenger Lifts", desc: "Maintains uninterrupted elevator lift operations." },
    { title: "Water Pumping Networks", desc: "Powers massive high-lift pumping systems." },
    { title: "Compound Streetlights", desc: "Offsets corridor, lobby, and compound security illumination." },
    { title: "Clubhouses & Gyms", desc: "Powers heavy air-conditioning and indoor facilities." },
    { title: "EV Charging Infrastructure", desc: "Integrates direct green charging outlets for electric vehicles." },
    { title: "RWA Offices & Security", desc: "Keeps CCTV cameras, guardhouses, and gate controls active." }
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
      {/* Fresh Green Community Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-28 bg-[#f5fbf8]">
        {/* Real background image with dark overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <Image
            src="/assets/images/handle_rooftop.webp"
            alt="Housing society rooftop solar installation background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[1px]"></div>
        </div>

        {/* Glow grid waves */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25 z-1"
          style={{ 
            backgroundImage: "radial-gradient(#25a55a 1px, transparent 1px)", 
            backgroundSize: "26px 26px"
          }}
        ></div>

        {/* Diagonal mesh radial highlights */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl pointer-events-none z-1"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#fca311]/5 to-transparent rounded-full blur-3xl pointer-events-none z-1"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="inline-flex self-start bg-primary/20 rounded-full py-1.5 px-4 text-xs font-bold text-primary border border-primary/30 animate-pulse">
                🏢 Green Community Living
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight">
                Green Societies. <br />
                <span className="text-primary relative inline-block">
                  Shared Savings.
                  <span className="absolute left-0 bottom-1 h-[6px] w-full bg-[#fca311]/60 rounded-full -z-10"></span>
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-semibold max-w-xl">
                Elevate your residential society's infrastructure. Power common-area lights, elevators, pumps, and EV chargers using clean solar energy, reducing maintenance bill overheads for all residents.
              </p>

              {/* RWA Specific Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 max-w-lg">
                <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                    <Building size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">Elevated Frameworks</h3>
                    <p className="text-[11px] text-gray-300 mt-0.5 font-medium">Raised columns preserve usable terrace space.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">RWA Presentation Pack</h3>
                    <p className="text-[11px] text-gray-300 mt-0.5 font-medium">We assist RWAs during AGM approval stages.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Form Card */}
            <div className="lg:col-span-5 w-full relative">
              <div className="absolute -inset-1.5 bg-primary/20 rounded-3xl blur opacity-15 pointer-events-none"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-dark text-white px-6 py-4 flex items-center justify-between border-b border-gray-850">
                  <span className="text-xs font-black uppercase tracking-wider text-primary">RWA Inquiry Desk</span>
                  <span className="text-[10px] bg-primary/20 text-primary px-2.5 py-0.5 rounded-full font-bold">Society Division</span>
                </div>
                <div className="p-1">
                  <ContactForm hideTabs={true} defaultTab="society" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Solutions Config */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">Society Layouts</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              Community Solar Layouts
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
              Tailored layout engineering integrated directly with multi-flat energy distribution networks and common meters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {solutions.map((sol, index) => (
              <div 
                key={index} 
                className={`border rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group ${sol.theme}`}
              >
                <div className="flex flex-col gap-4 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center text-primary border border-gray-150">
                    <Sun size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-justify">
                    {sol.desc}
                  </p>
                  <ul className="flex flex-col gap-2.5 mt-2">
                    {sol.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex gap-2 items-center text-xs font-bold text-gray-700">
                        <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                          <Check size={10} className="stroke-[3]" />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-150 text-left">
                  <Link href="#solar-calculator" className="inline-flex items-center gap-2 text-xs font-black uppercase text-primary hover:underline">
                    <span>Calculate Society Sizing</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Creative Applications Micro-Cards */}
      <section className="py-20 bg-[#f4faf7] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">Applications</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              Shared Facilities We Offset
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
              We design grids targeting primary common utility elements representing the highest share of society expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {applications.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-150 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex gap-4 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Key Benefits and USPs */}
      <section className="py-20 bg-[#fafdfb] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Real Solar Image */}
            <div className="lg:col-span-5 relative w-full group">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-gray-150">
                <Image
                  src="/assets/images/service/solar_housing_society.webp"
                  alt="Housing society rooftop solar layout"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md border border-gray-150 rounded-2xl p-4 flex items-center gap-3 max-w-[240px] shadow-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <span className="text-sm font-black text-gray-900 leading-none">Elevated Frames</span>
                  <span className="block text-[9px] text-gray-500 font-bold uppercase mt-1">Preserving Rooftop Space</span>
                </div>
              </div>
            </div>

            {/* Right Column: Copy */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="h-[2px] w-6 bg-primary"></span>
                  <span className="text-xs uppercase tracking-widest font-black text-primary">Benefits</span>
                  <span className="h-[2px] w-6 bg-primary"></span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
                  Why RWAs and Housing Societies Choose SunLynk
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed text-justify">
                  We specialize in community-level solar transitions. From obtaining structural clearances to designing elevated frames and attending AGMs to address resident concerns, we handle the entire project end-to-end.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white border border-gray-150 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 text-left flex flex-col gap-2.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-xs sm:text-sm text-gray-950">{b.title}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed mt-1">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Society Solar Sizer Calculator */}
      <SocietyCalculator />

      {/* Real Society Installations */}
      <section className="py-20 bg-white border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">Society Portfolio</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              Real Society Implementations
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed">
              Explore actual housing society and apartment rooftop solar installations completed by SunLynk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-150 aspect-[4/3] shadow-sm hover:shadow-lg transition-all duration-300">
              <Image
                src="/assets/images/service/solar_housing_society.webp"
                alt="50kW Society Solar"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-primary text-white font-extrabold uppercase py-1 px-2.5 rounded-full">50kW On-Grid</span>
                <h4 className="font-extrabold text-base mt-2">Residential Society, Lucknow</h4>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-150 aspect-[4/3] shadow-sm hover:shadow-lg transition-all duration-300">
              <Image
                src="/assets/IMAGE/project/p (5).avif"
                alt="Society Microgrid Energy Storage"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-[#fca311] text-dark font-extrabold uppercase py-1 px-2.5 rounded-full">Microgrid Storage</span>
                <h4 className="font-extrabold text-base mt-2">RWA Common-Area backup BESS</h4>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group relative overflow-hidden rounded-3xl border border-gray-150 aspect-[4/3] shadow-sm hover:shadow-lg transition-all duration-300">
              <Image
                src="/assets/images/handle_rooftop.webp"
                alt="Elevated Mounting Structure"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-left text-white z-10">
                <span className="text-[10px] bg-[#38bdf8] text-dark font-extrabold uppercase py-1 px-2.5 rounded-full">Elevated Frame</span>
                <h4 className="font-extrabold text-base mt-2">Raised Structural Column Panels</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 text-left flex flex-col gap-4 sticky top-24">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary"></span>
              <span className="text-xs uppercase tracking-widest font-black text-primary">FAQ</span>
              <span className="h-[2px] w-6 bg-primary"></span>
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">Frequently Asked Questions</h3>
            <p className="text-sm text-gray-500 leading-relaxed text-justify">
              Critical metrics regarding multi-resident approval procedures, structural clearances, net metering billing splits, and corpus funding plans.
            </p>
            <div className="p-6 bg-[#f4faf7] border border-emerald-100 rounded-3xl flex flex-col gap-3.5 mt-4">
              <span className="font-extrabold text-sm text-gray-800 block">RWA Technical Consultation</span>
              <div className="flex flex-col gap-2">
                <a href="tel:+918922036792" className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-primary transition-colors">
                  <Phone size={14} className="text-primary" />
                  <span>+91 8922036792</span>
                </a>
                <a href="mailto:info@SunLynkSolar.com" className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-primary transition-colors">
                  <Mail size={14} className="text-primary" />
                  <span>info@SunLynkSolar.com</span>
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
