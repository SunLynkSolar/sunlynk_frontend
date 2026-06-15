"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import Image from "next/image";

const plans = [
  {
    name: "Lynk Lite",
    tag: "Start with solar",
    tagline: "Best value entry plan",
    popular: false,
    features: [
      { text: "TopCon panels", included: true },
      { text: "Havelles inverter", included: true },
      { text: "Professional installation", included: true },
      { text: "Corrective maintenance", included: true },
      { text: "Zero repair cost — 5 years", included: false },
      { text: "Zero replacement cost — 5 years", included: false },
      { text: "Guaranteed generation", included: false },
      { text: "₹8/unit deficit return", included: false },
    ],
  },
  {
    name: "Lynk Sure",
    tag: "Solar with guarantee",
    tagline: "Lynk Lite + ₹20,000 — complete peace of mind",
    popular: true,
    features: [
      { text: "TopCon panels", included: true },
      { text: "Havelles inverter", included: true },
      { text: "Professional installation", included: true },
      { text: "Corrective maintenance", included: true },
      { text: "Zero repair cost — 5 years", included: true },
      { text: "Zero replacement cost — 5 years", included: true },
      { text: "Guaranteed generation", included: true },
      { text: "₹8/unit deficit return", included: true },
    ],
  },
];

export default function ProductsPreview() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-20">
        <iframe
          src="https://www.youtube.com/embed/TzfnlPxCZv0?autoplay=1&mute=1&loop=1&playlist=TzfnlPxCZv0&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
          className="absolute w-[300%] h-[300%] min-w-full min-h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Solar Video Background"
        />
        {/* Subtle overlay to soften the video and keep text highly readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="h-[2px] w-6 bg-primary" />
            <span className="text-base uppercase tracking-[0.15em] font-bold text-primary">Our Plans</span>
            <span className="h-[2px] w-6 bg-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-dark leading-tight mb-3">
            Choose your Solar Plan          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Two plans. One goal — complete peace of mind for your solar investment.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-xl transition-all duration-300 hover:shadow-xl ${plan.popular
                ? "border-2 border-primary shadow-lg"
                : "border border-gray-200 shadow-sm hover:border-gray-300"
                }`}
            >
              {/* Popular badge floating above card */}
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-10 w-full text-center justify-center">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Tag */}
                <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5 ${plan.popular ? "bg-primary/8 text-primary" : "bg-gray-100 text-gray-500"
                  }`}>
                  {plan.tag}
                </span>

                {/* Name & tagline */}
                <h3 className="text-2xl font-extrabold text-dark mb-1.5">{plan.name}</h3>
                <p className="text-[13px] text-gray-400 mb-7 leading-relaxed">{plan.tagline}</p>

                {/* Divider */}
                <div className="h-px bg-gray-100 mb-7" />

                {/* Features */}
                <ul className="space-y-3.5 mb-9">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      {feat.included ? (
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-primary" strokeWidth={3} />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-gray-1000 border border-gray-150 bg-gray-1000 text-gray-300 flex items-center justify-center shrink-0">
                          <X size={10} className="text-gray-300" strokeWidth={3} />
                        </div>
                      )}
                      <span className={`text-[13px] ${feat.included ? "text-gray-700 font-medium" : "text-gray-400"
                        }`}>
                        {feat.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  className={`group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${plan.popular
                    ? "bg-primary hover:bg-primary-hover text-white shadow-sm hover:shadow-md"
                    : "bg-gray-900 hover:bg-black text-white"
                    }`}
                >
                  <span>Get Quote</span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-400 mt-10 leading-relaxed">
          Both plans include professional site survey, custom 3D design, and full installation.{" "}
          <Link href="/contact" className="text-primary font-semibold hover:underline">
            Talk to an expert →
          </Link>
        </p>
      </div>

      {/* Decorative Solar Panel in Bottom Right */}
      <div className="absolute -bottom-12 -right-12 w-[450px] h-[200px] pointer-events-none z-0 select-none opacity-30 hidden lg:block">
        <Image
          src="/assets/images/bg (1).jpg"
          alt="Solar Panel Decoration"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}

// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, Check, X, Sun, Zap, ShieldCheck, Layers } from "lucide-react";

// const plans = [
//   {
//     name: "Lynk Lite",
//     tag: "Start with solar",
//     tagline: "Best value entry plan",
//     popular: false,
//     features: [
//       { text: "TopCon panels", included: true },
//       { text: "Polycab inverter", included: true },
//       { text: "Professional installation", included: true },
//       { text: "Corrective maintenance", included: true },
//       { text: "Zero repair cost — 5 years", included: false },
//       { text: "Zero replacement cost — 5 years", included: false },
//       { text: "Guaranteed generation", included: false },
//       { text: "₹8/unit deficit return", included: false },
//     ],
//   },
//   {
//     name: "Lynk Sure",
//     tag: "Solar with guarantee",
//     tagline: "Lynk Lite + ₹20,000 — complete peace of mind",
//     popular: true,
//     features: [
//       { text: "TopCon panels", included: true },
//       { text: "Polycab inverter", included: true },
//       { text: "Professional installation", included: true },
//       { text: "Corrective maintenance", included: true },
//       { text: "Zero repair cost — 5 years", included: true },
//       { text: "Zero replacement cost — 5 years", included: true },
//       { text: "Guaranteed generation", included: true },
//       { text: "₹8/unit deficit return", included: true },
//     ],
//   },
// ];

// export default function ProductsPreview() {
//   return (
//     <section className="relative py-24 bg-slate-50/50 overflow-hidden border-y border-slate-100" id="our-plans">
//       {/* Background image pattern */}
//       <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-20">
//         <Image
//           src="/assets/images/bg (2).jpg"
//           alt="Solar background pattern"
//           fill
//           className="object-cover opacity-35"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-slate-50/95 via-white/80 to-slate-50/95" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

//         {/* Split Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

//           {/* Left Column: Context & Hardware Showcase (Col 5) */}
//           <div className="lg:col-span-5 flex flex-col gap-8 text-left lg:sticky lg:top-24">
//             <div className="flex flex-col gap-4">
//               <div className="inline-flex self-start items-center gap-2 bg-primary/10 rounded-full py-1.5 px-4 text-xs font-bold text-primary tracking-wide border border-primary/20">
//                 <Sun size={13} className="text-primary animate-pulse" />
//                 <span>Choose Your Plan</span>
//               </div>

//               <h2 className="text-3xl sm:text-4xl font-extrabold text-dark leading-tight">
//                 Two plans. One goal — complete peace of mind.
//               </h2>

//               <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
//                 Whether you select our high-value entry plan or our complete guarantee package, you get premium engineering and tier-1 solar components.
//               </p>
//             </div>

//             {/* Hardware Showcase Box */}
//             <div className="bg-white/80 backdrop-blur border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col gap-5">
//               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
//                 <Layers size={14} className="text-primary" />
//                 Standard Hardware Included
//               </h4>

//               <div className="flex flex-col gap-4">
//                 {/* Tech Item 1 */}
//                 <div className="flex gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
//                     <Sun size={18} />
//                   </div>
//                   <div>
//                     <h5 className="text-xs font-bold text-gray-800">TopCon N-Type Solar Panels</h5>
//                     <p className="text-[11px] text-gray-500 mt-0.5">High-efficiency bifacial technology that harvests sunlight from both sides, yielding up to 22.5% conversion rates.</p>
//                   </div>
//                 </div>

//                 {/* Tech Item 2 */}
//                 <div className="flex gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
//                     <Zap size={18} />
//                   </div>
//                   <div>
//                     <h5 className="text-xs font-bold text-gray-800">Polycab Grid-Tied Inverter</h5>
//                     <p className="text-[11px] text-gray-500 mt-0.5">Smart solar inverters featuring dual MPPT trackers and seamless cloud-connected mobile app monitoring.</p>
//                   </div>
//                 </div>

//                 {/* Tech Item 3 */}
//                 <div className="flex gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
//                     <ShieldCheck size={18} />
//                   </div>
//                   <div>
//                     <h5 className="text-xs font-bold text-gray-800">Premium Wind-Resistant Structures</h5>
//                     <p className="text-[11px] text-gray-500 mt-0.5">Hot-dip galvanized steel mounting structures engineered to withstand up to 150 km/h wind speeds.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>

//           {/* Right Column: Pricing Cards (Col 7) */}
//           <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
//             {plans.map((plan, idx) => (
//               <div
//                 key={idx}
//                 className={`group relative rounded-2xl transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${plan.popular
//                   ? "bg-white/95 backdrop-blur-md text-gray-800 border-2 border-primary shadow-md hover:-translate-y-1"
//                   : "bg-white/90 backdrop-blur-md text-gray-800 border border-slate-200/80 shadow-sm hover:border-slate-300 hover:-translate-y-1"
//                   }`}
//               >
//                 {/* Popular Badge floating above card */}
//                 {plan.popular ? (
//                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5 z-25 whitespace-nowrap">
//                     <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                     Most Popular
//                   </div>
//                 ) : (
//                   <div className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200">
//                     Standard
//                   </div>
//                 )}

//                 <div className="p-6 sm:p-8 flex-grow flex flex-col gap-6">
//                   <div>
//                     {/* Tag */}
//                     <span className={`inline-block text-[9px] font-extrabold uppercase tracking-widest mb-3 ${plan.popular ? "text-primary" : "text-gray-400"}`}>
//                       {plan.tag}
//                     </span>

//                     {/* Name & tagline */}
//                     <h3 className="text-2xl font-black mb-1 leading-tight text-gray-900">{plan.name}</h3>
//                     <p className="text-[12px] leading-relaxed text-gray-400">{plan.tagline}</p>
//                   </div>

//                   {/* Divider */}
//                   <div className="h-px bg-slate-100" />

//                   {/* Features */}
//                   <ul className="space-y-3.5 flex-grow">
//                     {plan.features.map((feat, fIdx) => (
//                       <li key={fIdx} className="flex items-center gap-3">
//                         {feat.included ? (
//                           <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-primary/10 text-primary">
//                             <Check size={11} strokeWidth={3} />
//                           </div>
//                         ) : (
//                           <div className="w-5 h-5 rounded-full border border-gray-150 bg-gray-1000 text-gray-300 flex items-center justify-center shrink-0">
//                             <X size={9} strokeWidth={3} />
//                           </div>
//                         )}
//                         <span className={`text-[12.5px] ${feat.included ? "text-gray-700 font-medium" : "text-gray-400"}`}>
//                           {feat.text}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* CTA Button at bottom */}
//                 <div className="p-6 sm:p-8 pt-0">
//                   <Link
//                     href="/contact"
//                     className={`group flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${plan.popular
//                       ? "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-primary/35"
//                       : "bg-slate-900 hover:bg-black text-white"
//                       }`}
//                   >
//                     <span>Get Quote</span>
//                     <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
//                   </Link>
//                 </div>

//               </div>
//             ))}
//           </div>

//         </div>

//         {/* Bottom note */}
//         <p className="text-center text-xs text-gray-400 mt-16 leading-relaxed border-t border-slate-100 pt-6">
//           Both plans include professional site survey, custom 3D design, and full installation.{" "}
//           <Link href="/contact" className="text-primary font-semibold hover:underline">
//             Talk to an expert →
//           </Link>
//         </p>

//       </div>

//       {/* Decorative Solar Panel in Bottom Right */}
//       <div className="absolute -bottom-12 -right-12 w-200 h-96 pointer-events-none z-0 select-none opacity-10 hidden lg:block">
//         <Image
//           src="/assets/images/bg (1).jpg"
//           alt="Solar Panel Decoration"
//           fill
//           className="object-contain"
//         />
//       </div>
//     </section>
//   );
// }


